import React from "react"
import {MainPageGuest} from "../pages/MainPageGuest"
import {MainPageAuthtorized} from "../pages/MainPageAuthtorized"

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
    title?: string;
}

export enum RouteNames {
    MAIN = "/",
    LOGIN = "/"
}

export const publicRoute: IRoute[] = [
    {
        path: RouteNames.MAIN,
        exact: true,
        component: MainPageGuest,
        title: "Main Page"
    }
]

export const privateRoute: IRoute[] = [
    {
        path: RouteNames.MAIN,
        exact: true,
        component: MainPageAuthtorized,
        title: "Main Page"
    }
]

