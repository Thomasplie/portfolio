import {Outlet} from "react-router";
import Footer from "./Footer.jsx";
import Nav from "./Nav.jsx";
import ScrollToTop from "./ScrolltoTop.jsx";

function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-[#F0F7F4] overflow-x-hidden w-full">
            <ScrollToTop/>

            <Nav></Nav>

            <main className="flex-1 overflow-x-hidden w-full">
                <Outlet/>
            </main>

            <Footer></Footer>
        </div>
    );
}

export default Layout;