import {Route, Switch} from "react-router-dom"
import {privateRoute, publicRoute} from "./router"
import {useTypedSelector} from "../utils/hooks/useTypedSelector"
import {useDispatch} from "react-redux"
import {Sidebar} from "../common/components/Sidebar"

export const AppRouter = () => {
    const dispatch = useDispatch()
    let {isAuthed} = useTypedSelector(state => state.userReducer)

    return (
        isAuthed ?
            <div className="container__inner">
                <div className="container__left">
                    <Switch>
                        {privateRoute.map(route => <Route key={route.path} path={route.path} exact={route.exact}
                                                          component={route.component}/>)}
                    </Switch>
                </div>
                <Sidebar/>
            </div>
            :
            <Switch>
                {publicRoute.map(route => <Route key={route.path} path={route.path} exact={route.exact}
                                                 component={route.component}/>)}
            </Switch>

    )
}
