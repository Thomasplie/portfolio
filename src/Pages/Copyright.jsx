import {Link} from "react-router";
import BlockEdgeDecoration from "../Components/BlockEdgeDecoration.jsx";

function Copyright() {
    return (
        <div className="bg-[#0e2d33] min-h-screen">

            <section className="relative w-full py-16 sm:py-24 md:py-32">

                <BlockEdgeDecoration
                    color="#124559"
                    position="top"
                    flipX="true"
                    height="clamp(70px, 13vw, 200px)"
                />

                <div className="mx-auto max-w-3xl px-6">

                    <h1 className="text-2xl sm:text-3xl font-bold text-[#e2f0ee] mb-2">
                        Copyright & Terms of Use
                    </h1>
                    <p className="text-[#e2f0ee]/50 text-sm mb-8 sm:mb-12">
                        Last updated: {new Date().getFullYear()}
                    </p>

                    <div className="mb-8 sm:mb-10">
                        <h2 className="text-lg sm:text-xl font-semibold text-[#e2f0ee] mb-3">
                            Copyright
                        </h2>
                        <p className="text-[#e2f0ee]/70 leading-relaxed">
                            All content on this website — including but not limited to design, code, text, and
                            original artwork — is the property of Thomas de Korte unless stated otherwise.
                            You're welcome to look around and get inspired, but please don't copy or reuse
                            this content without permission.
                        </p>
                        <p className="text-[#e2f0ee]/70 leading-relaxed mt-3">
                            -The error page image is from Nintendo's game pokopia.- <br></br>Thought i might give them
                            their own little section JUST
                            in case.
                        </p>
                    </div>

                    <div className="mb-8 sm:mb-10">
                        <h2 className="text-lg sm:text-xl font-semibold text-[#e2f0ee] mb-3">
                            Project Work
                        </h2>
                        <p className="text-[#e2f0ee]/70 leading-relaxed">
                            Several projects shown on this site were built as part of a team. Where that's the
                            case, it's noted on the individual project page along with a description of my
                            specific contribution. Team projects remain the shared property of all contributors
                            unless otherwise licensed.
                        </p>
                        <p className="text-[#e2f0ee]/70 leading-relaxed mt-3">
                            Some projects also include assets, code, or contributions that are not my own. Such
                            as music, artwork, or code written by teammates. Where applicable, this is noted
                            directly under a "Credits & Attribution" section on the individual project page.
                        </p>
                    </div>

                    <div className="mb-8 sm:mb-10">
                        <h2 className="text-lg sm:text-xl font-semibold text-[#e2f0ee] mb-3">
                            Third-Party Content
                        </h2>
                        <p className="text-[#e2f0ee]/70 leading-relaxed">
                            This site uses icons, fonts, and open-source libraries that are not my own work.
                            Credit belongs to their respective creators. Tools and technologies used include
                            (but are not limited to) React, Tailwind CSS, and the icon assets shown in the
                            "My Tools" section on the About page.
                        </p>
                    </div>

                    <div className="mb-8 sm:mb-10">
                        <h2 className="text-lg sm:text-xl font-semibold text-[#e2f0ee] mb-3">
                            No Warranty
                        </h2>
                        <p className="text-[#e2f0ee]/70 leading-relaxed">
                            This website is provided as-is. While I've done my best to make sure everything
                            works correctly, I can't guarantee it will be error-free or available at all times.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-lg sm:text-xl font-semibold text-[#e2f0ee] mb-3">
                            Questions or Concerns
                        </h2>
                        <p className="text-[#e2f0ee]/70 leading-relaxed">
                            If you have any questions about this page, or believe something on this site
                            infringes on your rights, please reach out via the contact button in the navigation
                            or footer.
                        </p>
                    </div>

                </div>

                <div className="flex justify-center mt-10 sm:mt-16 px-4">
                    <Link to="/" className="text-[#09BC8A] hover:underline text-base font-medium">
                        ← Back to home
                    </Link>
                </div>

                <BlockEdgeDecoration
                    color="#124559"
                    position="bottom"
                    height="clamp(70px, 12vw, 200px)"
                />

            </section>

        </div>
    );
}

export default Copyright;