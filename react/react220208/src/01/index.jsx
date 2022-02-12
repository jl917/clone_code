const createElement = (type, props, ...children) => {
  return {
    type,
    props: {
      ...props,
      children: children.map(
        child => typeof child === 'object' ? child : createTextElement(child)
      ),
    }
  }
}

const createTextElement = (text) => {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    }
  }
}

const createDom = (fiber) => {
  const dom = fiber.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(fiber.type);
  const isProperty = key => key !== "children";
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = fiber.props[name]
    });
  return dom;
}

// 一旦我们开始渲染，我们不会停止，直到我们渲染了完整的元素树。
let nextUnitOfWork = null;
// stack render
// const render = (element, container) => {
//   const dom = element.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(element.type);
//   const isProperty = key => key !== "children";
//   Object.keys(element.props)
//     .filter(isProperty)
//     .forEach(name => {
//       dom[name] = element.props[name]
//     });
//   element.props.children.forEach(child => render(child, dom))
//   container.appendChild(dom);
// }

// fiber render
const render = (element, container) => {
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element],
    },
  };
}

// 我们要把工作分解成小单元，在我们完成每个单元之后，如果还有其他需要做的事情，我们会让浏览器中断渲染。
const workLoop = (deadline) => {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  };
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

// 我们将为每个光纤做三件事：
// - 将元素添加到 DOM
// - 为元素的子元素创建纤维
// - 选择下一个工作单元
const performUnitOfWork = (nextUnitOfWork) => {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom)
  }

  // create new fibers
  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null;

  while (index < elements.length) {
    const element = elements[index];

    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    }

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
  }

  // return next unit of work
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent;
  }
}

console.log(createElement('div', null, 'hello'));

render(createElement('div', null, 'hello'), document.getElementById('root'));