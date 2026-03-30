import {NavLink} from "react-router";
import Logo from "../assets/T.png";

function Nav() {
    const navLinkClass = ({isActive}) => `h-full inline-flex items-center px-4 border-b-4 transition-colors duration-200 
    ${isActive ? "text-[#09BC8A] font-bold border-[#F17F29]" : "text-white border-transparent hover:text-[#09BC8A] hover:border-[#F17F29]"}`;

    return (
        <nav>
            <div className="flex w-full bg-[#004346] h-[8vh] px-4 text-white items-stretch">

                {/* Logo */}
                <div className="flex-1 flex justify-center items-center">
                    <img src={Logo} alt="Logo of Thomas Portfolio" className="h-[60px] md:h-[70px] lg:h-[80px] w-auto"/>
                </div>

                {/* Links */}
                <div className="flex-[2] flex justify-center gap-6 h-full">
                    <NavLink to="/" className={navLinkClass}>
                        Home
                    </NavLink>

                    <NavLink to="/about-me" className={navLinkClass}>
                        About
                    </NavLink>

                    <NavLink to="/my-projects" className={navLinkClass}>
                        Projects
                    </NavLink>

                    <NavLink to="/future-plans" className={navLinkClass}>
                        Future
                    </NavLink>
                </div>

                {/* Right side */}
                <div className="flex-1 flex items-center justify-center">
                    Am I??
                </div>
            </div>
        </nav>
    );
}

export default Nav;