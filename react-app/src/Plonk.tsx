import "./App.scss"
import {AppRouter} from "./router/AppRouter"
import {Header} from "./common/components/Header"
import {useEffect} from "react"
import {useSelector} from "react-redux"
import {RootState} from "./store/state"

export const Plonk = () => {
    const isInitialized = useSelector((state: RootState) =>state.appReducer.isInitialized)
    useEffect(() => {

    }, [])

    return (
        <div className="container">
            <Header />
            <AppRouter/>
        </div>
    )
}

