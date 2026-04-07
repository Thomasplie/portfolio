import HeaderBanner from "../Components/HeaderBanner.jsx";
import Transition from "../Components/Transition.jsx";
import Carousel from "../Components/Carousels/Carousel.jsx";
function Homepage() {
    return (
        <>
            <HeaderBanner>
            </HeaderBanner>

            <Transition minHeight="min-h-[500px]" bgClass="bg-[#124559]">

                <div className="py-16">
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
                                        This Color card represents a website project.
                                    </p>

                                    <svg className="shrink-0 mr-8" width="20" height="20" stroke="#000000"
                                         strokeWidth="3" viewBox="0 0 40 40">
                                        <circle cx="20" cy="20" r="18" fill="#F17F29"/>
                                    </svg>
                                </div>

                                <div className="flex items-center justify-between">
                                    <p className="font-medium">
                                        This Color card represents a Game project.
                                    </p>

                                    <svg className="shrink-0 mr-8" width="20" height="20" stroke="#000000"
                                         strokeWidth="3" viewBox="0 0 40 40">
                                        <circle cx="20" cy="20" r="18" fill="#004346"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Carousel></Carousel>

                </div>
            </Transition>

            <h1>TitleCard :D</h1>
            <p>
                Interesting Information of who i am and what my goal is.
            </p>

            <Transition minHeight="min-h-[20px]" bgClass="bg-[#124559]" className="text-white">
                This is not going to be a transition,
                instead this will be a infinite slider with my projects and my tools that i can use.
            </Transition>

            <p>
                And here is the optional form, this is probably not gonna make it to the first version gonna be honest
            </p>
        </>
    )
}

export default Homepage