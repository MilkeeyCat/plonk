import {Route, Switch} from "react-router-dom"
import {privateRoute, publicRoute} from "./router"
import {useTypedSelector} from "../utils/hooks/useTypedSelector"
import {useDispatch} from "react-redux"

export const AppRouter = () => {
    const dispatch = useDispatch()
    let {isAuth} = useTypedSelector(state => state.authReducer)
    const id = localStorage.getItem("id")

    return (
        isAuth ?
            <Switch>
                {privateRoute.map(route => <Route key={route.path} path={route.path} exact={route.exact}
                                                  component={route.component}/>)}
            </Switch>
            :
            <Switch>
                {publicRoute.map(route => <Route key={route.path} path={route.path} exact={route.exact}
                                                 component={route.component}/>)}
            </Switch>

    )
}
