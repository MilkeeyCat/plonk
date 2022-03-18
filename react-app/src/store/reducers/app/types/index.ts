export enum AppActionEnum {
    SET_IS_INITIALIZED = "SET_IS_INITIALIZED",
}

export interface IAppState {
    isInitialized: boolean
}

export type setIsInitialized = {
    type: AppActionEnum.SET_IS_INITIALIZED,
    payload: boolean
}

export type IAppAction = setIsInitialized