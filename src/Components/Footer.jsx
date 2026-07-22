import Logo from "../assets/TnoBG.png";
import {NavLink} from "react-router";

function Footer() {

    const navLinkClass = ({isActive}) =>
        `transition-colors duration-200 ${isActive ? "text-[#09BC8A] font-bold" : "text-white hover:text-[#09BC8A]"}`;

    const externalLinkClass = "text-white transition-colors duration-200 hover:text-[#09BC8A]";

    return (
        <footer className="bg-[#004346] border-t-2 border-[#09BC8A] w-full">
            <div
                className="mx-auto max-w-5xl flex flex-row items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-3 sm:py-4">

                <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 sm:gap-x-6 text-[11px] sm:text-sm md:text-base">
                    <li>
                        <a href="mailto:yourname@email.com?subject=Interesse in samenwerking"
                           className={externalLinkClass}>
                            Contact
                        </a>
                    </li>
                    <li>
                        <NavLink to="/copyright" className={navLinkClass}>
                            Copyright & Terms
                        </NavLink>
                    </li>
                    <li>
                        <a
                            href="https://www.linkedin.com/in/thomas-de-korte-290132312/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={externalLinkClass}
                        >
                            LinkedIn
                        </a>
                    </li>
                </ul>

                <img
                    src={Logo}
                    alt="Logo of Thomas Portfolio"
                    className="h-[36px] sm:h-[44px] md:h-[52px] w-auto flex-shrink-0"
                />

            </div>

            <div className="text-center text-gray-300 text-[10px] sm:text-xs pb-2 sm:pb-3 px-4">
                © {new Date().getFullYear()} TdK. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;