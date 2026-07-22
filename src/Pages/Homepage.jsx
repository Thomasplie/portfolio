import HeaderBanner from "../Components/HeaderBanner.jsx";
import Transition from "../Components/Transition.jsx";
import Carousel from "../Components/Carousels/Carousel.jsx";
import BlockEdgeDecoration from "../Components/BlockEdgeDecoration.jsx";
function Homepage() {
    return (
        <div className="bg-[#0e2d33]">
            <HeaderBanner>
            </HeaderBanner>


            <section className="relative w-full py-48">

                <BlockEdgeDecoration color="#124559" position="top" flipX="true" height="clamp(70px, 13vw, 200px)"/>

                <div className="mx-auto px-96 text-center">

                    <h2 className="text-center text-3xl font-semibold tracking-wide text-[#e2f0ee]">
                        Hi there, great to see you!
                    </h2>

                    <article className="mt-4 text-left italic font-medium break-words text-[#e2f0ee]">
                        I build interactive digital experiences, from creative web apps to game design projects.
                    </article>

                    <article className="mt-6 text-left leading-relaxed text-[#e2f0ee] break-words">
                        Since you're here, you're probably curious about what I can actually do. <br/>

                        My focus lies completely on creating the best possible experience for the user, that's the
                        simple
                        part of it. Whether it's a website
                        or a game in the making, I will always look at my work with a critical perspective, and if I
                        don't
                        think it's good enough, I will have to go back to the
                        drawing board. Now that does sound very intense, but there's a lot of flexibility that goes into
                        this way of thinking. <br/>
                    </article>

                    <article className="mt-6 text-left leading-relaxed text-[#e2f0ee] break-words">
                        But more about this on the About Me page. Take a look around, at my work, about me, or to see
                        where I am heading next. See ya!
                    </article>

                </div>

                <BlockEdgeDecoration color="#124559" position="bottom" flipX="true" height="clamp(70px, 12vw, 200px)"/>

            </section>

            <Transition
                minHeight="min-h-[500px]"
                bgClass="bg-[#071a1e]"
                contentClassName="!max-w-[1400px]"
                topSvg={
                    <svg viewBox="0 0 1 80" preserveAspectRatio="none" className="block w-full"
                         style={{height: "80px"}}>
                        <defs>
                            <linearGradient id="fadeIn" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#0e2d33"/>
                                <stop offset="100%" stopColor="#071a1e"/>
                            </linearGradient>
                        </defs>
                        <rect width="1" height="80" fill="url(#fadeIn)"/>
                    </svg>
                }
                bottomSvg={
                    <svg viewBox="0 0 1 80" preserveAspectRatio="none" className="block w-full"
                         style={{height: "80px"}}>
                        <defs>
                            <linearGradient id="fadeOut" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#071a1e"/>
                                <stop offset="100%" stopColor="#0e2d33"/>
                            </linearGradient>
                        </defs>
                        <rect width="1" height="80" fill="url(#fadeOut)"/>
                    </svg>
                }
            >

                <div className="my-16">
                    <div className="flex">
                        <div className="flex-2">
                            <h2 className="font-bold text-white text-2xl">Some of my work.</h2>
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

            <section className="relative w-full py-40">

                <BlockEdgeDecoration color="#124559" position="top" flipX="true" height="clamp(70px, 13vw, 200px)"/>

                <div className="mx-auto px-96 text-center">

                    <h2 className="text-center text-3xl font-semibold tracking-wide text-[#e2f0ee]">
                        Further Information.
                    </h2>

                    <article className="mt-4 text-left text-[#e2f0ee]/80 wrap-break-word">
                        Despite having a lot of fun making this portfolio, and putting in a lot of effort, I am
                        afraid I will leave this version as it is. I have many plans for further upgrades, or should I
                        say "level ups," for this website, and I hope to improve the overall experience of visitors by
                        making more things dynamic and storing data in an actual database. You can see more information
                        about this website at -portfolio project link- for more detailed plans.
                        But for now, I want to thank you for your time exploring my portfolio website. I hope you find
                        what you are looking for!
                    </article>

                    <h3 className="mt-10 text-center text-2xl font-semibold tracking-wide text-[#e2f0ee]">
                        Stay tuned for future updates!
                    </h3>

                </div>
            </section>

        </div>
    )
}

export default Homepage