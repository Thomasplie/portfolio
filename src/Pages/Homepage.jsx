import HeaderBanner from "../Components/HeaderBanner.jsx";
import Transition from "../Components/Transition.jsx";
import Carousel from "../Components/Carousels/Carousel.jsx";
function Homepage() {
    return (
        <div className="bg-[#598392]">
            <HeaderBanner>
            </HeaderBanner>

            <Transition minHeight="min-h-[500px]" bgClass="bg-[#124559]">

                <div className="my-16">
                    <div className="flex">
                        <div className="flex-2">
                            <h2 className="font-bold text-white text-2xl">Some of my work</h2>
                            <article className="text-white">
                                These are some projects I was a part of. We did these projects in teams. <br/>
                                My contribution will be elaborated on, on their dedicated page.
                            </article>
                        </div>
                        <div className="flex-1 p-2 bg-[#09BC8A] rounded-2xl overflow-x-auto">
                            <div className="flex h-full flex-col justify-evenly">

                                <div className="flex items-center justify-between">
                                    <p className="font-medium">
                                        This Color card represents a WEBSITE project.
                                    </p>

                                    <svg className="shrink-0 mr-8" width="20" height="20" stroke="#000000"
                                         strokeWidth="3" viewBox="0 0 40 40">
                                        <circle cx="20" cy="20" r="18" fill="#F17F29"/>
                                    </svg>
                                </div>

                                <div className="flex items-center justify-between">
                                    <p className="font-medium">
                                        This Color card represents a GAME project.
                                    </p>

                                    <svg className="shrink-0 mr-8" width="20" height="20" stroke="#000000"
                                         strokeWidth="3" viewBox="0 0 40 40">
                                        <circle cx="20" cy="20" r="18" fill="#004346"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative mb-[250px]">
                        <Carousel/>
                    </div>

                </div>
            </Transition>

            <section className="w-full py-16">
                <div className="mx-auto px-96 text-center">

                    <h2 className="text-center text-3xl font-semibold tracking-wide text-black">
                        TITLE OF SECTION
                    </h2>

                    <article className="mt-4 text-left text-sm text-black/80 break-words">
                        Interesting information of who i am and what my goal is
                    </article>

                    <article className="mt-6 text-left text-sm leading-relaxed text-black break-words">
                        Interesting information of who i am and what my goal is Interesting information of who i am and
                        what my goal is Interesting information of who i am and what my goal is Interesting information
                        of who i am and what my goal is
                    </article>

                </div>
            </section>

            <Transition minHeight="min-h-[20px]" bgClass="bg-[#124559]" className="text-white">
                This is not going to be a transition,
                instead this will be a infinite slider with my projects and my tools that i can use.
            </Transition>

            <section className="w-full py-16">
                <div className="mx-auto px-96 text-center">

                    <h2 className="text-center text-3xl font-semibold tracking-wide text-black">
                        Further Information
                    </h2>

                    <article className="mt-4 text-left text-sm text-black/80 break-words">
                        Despite me having a lot of fun making this portfolio, and putting in a lot of effort. I am
                        afraid i will leave this version as it is. I have many plans for further upgrades or should i
                        say “level ups” for this website and i hope to improve the overall experience of visitors by
                        making more things dynamic and storing data in an actual database. You can see more information
                        about this website at -portfolio project link- for more detailed plans.
                        But for now i want to thank you for your time to explore my portfolio website. I hope you find
                        what you are looking for!
                    </article>

                    <h3 className="mt-10 text-center text-2xl font-semibold tracking-wide text-black">
                        Stay tuned for future updates!
                    </h3>

                </div>
            </section>
        </div>
    )
}

export default Homepage