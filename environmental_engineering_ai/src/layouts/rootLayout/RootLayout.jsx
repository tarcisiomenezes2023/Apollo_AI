import { Outlet } from "react-router-dom"
import "./RootLayout.css"
import { Link } from "react-router-dom"

const RootLayout = () => {
    return (
        <div className="rootlayout">
            <header>
                <Link to="/">
                    <img src="/Logo2.png" alt="Logo" />
                    <span>Apollo</span>
                </Link>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default RootLayout