import { Position } from './position';

export interface PlayerTokenProps {
  givenChangedPos?: (position: Position) => void;
}
