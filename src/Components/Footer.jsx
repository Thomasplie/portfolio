import Logo from "../assets/TnoBG.png";
import {NavLink} from "react-router";

function Footer() {

    const navLinkClass = ({isActive}) => `h-full inline-flex items-center px-4 border-b-4 transition-colors duration-200 
    ${isActive ? "text-[#09BC8A] font-bold border-[#F17F29]" : "text-white underline border-transparent hover:text-[#09BC8A] hover:border-[#F17F29]"}`;

    return (
        <footer className="bg-[#004346] pt-8 flex flex-col">
            <div className="flex justify-evenly items-center">
                <div className="flex flex-col">
                    <ul className="list-disc space-y-4 pl-4 marker:text-[#09BC8A] text-white text text-[1.25rem]">
                        <li>
                            <NavLink to="/contact" className={navLinkClass}>
                                Contact
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Bada" className={navLinkClass}>
                                Copyright & Terms of use
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about-me" className={navLinkClass}>
                                LinkedIn
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <img src={Logo} alt="Logo of Thomas Portfolio"
                         className="h-[100px] md:h-[70px] lg:h-[150px] w-auto"/>
                </div>
            </div>

            <div className="flex justify-center text-gray-200">
                © {new Date().getFullYear()} TdK. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer