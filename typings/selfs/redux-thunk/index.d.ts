declare namespace Redux {
  type ThunkAction<R, S, E> = (dispatch: Dispatch<S>, getState: () => S, extraArgument: E) => R;

  interface Dispatch<S> {
    <R, E>(asyncAction: ThunkAction<R, S, E>): R;
  }
}

declare module "redux-thunk" {
  import { Middleware } from "redux";

  const thunk: Middleware & {
    withExtraArgument(extraArgument: any): Middleware;
  };

  export default thunk;
}