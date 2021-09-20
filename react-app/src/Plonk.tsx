import "./App.scss"
import {AppRouter} from "./router/AppRouter"
import {Header} from "./common/components/Header"

export const Plonk = () => {
    return (
        <div className="container">
            <Header />
            <AppRouter/>
        </div>
    )
}

