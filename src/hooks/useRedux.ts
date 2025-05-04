import { RootState, AppDispatch } from "@/redux";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export const useRedux = () => {
  const dispatch: AppDispatch = useDispatch();
  const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;
  const getState = <K extends keyof RootState>(reducer: K): RootState[K] =>
    useStateSelector((state) => state[reducer]);
  return { dispatch, useStateSelector, getState };
};
