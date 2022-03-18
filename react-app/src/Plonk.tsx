import "./Plonk.scss"
import {AppRouter} from "./router/AppRouter"
import {Header} from "./common/components/Header"
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "./store/state"
import {initialize} from "./store/thunk/app"

export const Plonk = () => {
    const isInitialized = useSelector((state: RootState) => state.appReducer.isInitialized)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initialize)
    }, [])

    if(!isInitialized) return <>Loading</>

    return (
        <div className="container">
            <Header/>
            <AppRouter/>
        </div>
    )
}

