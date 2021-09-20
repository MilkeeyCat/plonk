import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../../store/state";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;