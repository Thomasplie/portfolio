import {Outlet} from "react-router";
import Footer from "./Footer.jsx";
import Nav from "./Nav.jsx";

function Layout() {
    return (
        <>
            <Nav>

            </Nav>

            <Outlet/>

            <Footer>

            </Footer>
        </>
    )
}

export default Layout