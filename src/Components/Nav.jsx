import {useState} from "react";
import {NavLink} from "react-router";
import Logo from "../assets/TnoBG.png";

function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinkClass = ({isActive}) => `h-full inline-flex items-center px-4 border-b-4 transition-colors duration-200 
    ${isActive ? "text-[#09BC8A] font-bold border-[#F17F29]" : "text-white border-transparent hover:text-[#09BC8A] hover:border-[#F17F29]"}`;

    const mobileNavLinkClass = ({isActive}) => `w-full inline-flex items-center px-4 py-3 border-l-4 transition-colors duration-200 
    ${isActive ? "text-[#09BC8A] font-bold border-[#F17F29] bg-white/5" : "text-white border-transparent hover:text-[#09BC8A] hover:border-[#F17F29]"}`;

    return (
        <nav className="relative border-b-2 border-[#09BC8A]">
            <div className="flex w-full bg-[#004346] h-[10vh] min-h-[64px] px-4 text-white items-stretch">

                <div className="flex-1 lg:flex-1 flex justify-start lg:justify-center items-center">
                    <img src={Logo} alt="Logo of Thomas Portfolio" className="h-[50px] md:h-[60px] lg:h-[80px] w-auto"/>
                </div>

                <div className="hidden lg:flex flex-[2] justify-center gap-6 h-full">
                    <NavLink to="/" className={navLinkClass}>Home</NavLink>
                    <NavLink to="/about-me" className={navLinkClass}>About</NavLink>
                    <NavLink to="/my-projects" className={navLinkClass}>Projects</NavLink>
                    <NavLink to="/future-plans" className={navLinkClass}>Future</NavLink>
                </div>

                <div className="hidden lg:flex flex-1 items-center justify-center">
                    <a href="mailto:thomasdekorte77@gmail.com?subject=Interesse in samenwerking!"
                       className="contact-btn">
                        <span>Contact Me</span>
                    </a>
                </div>

                <button
                    type="button"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="flex lg:hidden items-center justify-center px-2"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                >
                    <div className="relative w-6 h-5">
                        <span
                            className={`absolute left-0 top-0 w-6 h-0.5 bg-white transition-all duration-200
                                ${menuOpen ? "rotate-45 top-2" : ""}`}
                        />
                        <span
                            className={`absolute left-0 top-2 w-6 h-0.5 bg-white transition-all duration-200
                                ${menuOpen ? "opacity-0" : ""}`}
                        />
                        <span
                            className={`absolute left-0 top-4 w-6 h-0.5 bg-white transition-all duration-200
                                ${menuOpen ? "-rotate-45 top-2" : ""}`}
                        />
                    </div>
                </button>
            </div>

            <div
                className={`lg:hidden grid transition-all duration-300 ease-in-out
                    ${menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
                <div className="overflow-hidden bg-[#004346]">
                    <div className="flex flex-col">
                        <NavLink to="/" className={mobileNavLinkClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
                        <NavLink to="/about-me" className={mobileNavLinkClass}
                                 onClick={() => setMenuOpen(false)}>About</NavLink>
                        <NavLink to="/my-projects" className={mobileNavLinkClass}
                                 onClick={() => setMenuOpen(false)}>Projects</NavLink>
                        <NavLink to="/future-plans" className={mobileNavLinkClass}
                                 onClick={() => setMenuOpen(false)}>Future</NavLink>

                        <div className="p-4 flex justify-center">
                            <a
                                href="mailto:thomasdekorte77@gmail.com?subject=Interesse in samenwerking!"
                                className="contact-btn"
                                onClick={() => setMenuOpen(false)}
                            >
                                <span>Contact Me</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;