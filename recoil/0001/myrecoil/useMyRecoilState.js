import useMyRecoilValue from './useMyRecoilValue';
import useMySetRecoilState from './useMySetRecoilState';

export default function useMyRecoilState (atom) {
  return [useMyRecoilValue(atom), useMySetRecoilState(atom)]
}