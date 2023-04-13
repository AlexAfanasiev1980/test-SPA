import { ADD_DOGS, LIKE } from "../actions/actions";

export type TDog = {
  id: string;
  img: string;
  like: boolean;
  name: string;
};

const initialState: TDog[] = [];

export const reducer = (
  state: TDog[] = initialState,
  action: { type: string; payload: TDog[] }
): TDog[] => {
  switch (action.type) {
    case ADD_DOGS: {
      return [
        ...action.payload
      ];
    }
    case LIKE: {
      return [
        ...action.payload,
      ];
    }
    default: {
      return state;
    }
  }
};
