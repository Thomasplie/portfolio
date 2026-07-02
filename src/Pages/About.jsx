import HeaderBanner from "../Components/HeaderBanner.jsx";
import BlockEdgeDecoration from "../Components/BlockEdgeDecoration.jsx";
import Transition from "../Components/Transition.jsx";
import Carousel from "../Components/Carousels/Carousel.jsx";
import ToolCard from "../Components/Carousels/ToolCard.jsx";
import {aboutPhotos, introPhoto, tools} from "../data/about.js";

function About() {
    return (
        <div className="bg-[#0e2d33]">

            {/* ── Hero — cubes with photos of me ── */}
            <HeaderBanner
                images={aboutPhotos}
                overrideText={
                    <div>
                        <p className="mb-4 text-sm md:text-base font-medium text-[#09BC8A]">
                            About Me
                        </p>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                            Hi, I'm Thomas.
                        </h1>
                        <p className="mt-4 text-lg md:text-2xl text-white/70">
                            Developer. Designer. Builder.
                        </p>
                    </div>
                }
            />

            {/* ── Intro section ── */}
            <section className="relative w-full py-48">

                <BlockEdgeDecoration
                    color="#124559"
                    position="top"
                    flipX="true"
                    height="clamp(70px, 13vw, 200px)"
                />

                <div className="mx-auto max-w-5xl px-6 flex items-center gap-16">

                    {/* Left — text */}
                    <div className="flex-1">
                        <h2 className="text-2xl font-semibold text-[#e2f0ee] mb-4">
                            Little introduction
                        </h2>
                        <p className="text-[#e2f0ee]/70 leading-relaxed mb-4">
                            I build interactive digital experiences. From creative web apps to game design projects.
                            My focus lies completely on creating the best possible experience for the user.
                        </p>
                        <p className="text-[#e2f0ee]/70 leading-relaxed">
                            Whether it's a website or a game in the making, I always look at my work with a
                            critical perspective. If I don't think it's good enough, I go back to the drawing board.
                        </p>
                    </div>

                    {/* Right — photo */}
                    <div className="flex-shrink-0 w-[260px] h-[320px] relative">
                        <div
                            className="absolute inset-0 bg-neutral-900"
                            style={{
                                clipPath: `polygon(
                                    0% 8%,    3.9% 8%,  3.9% 0%,  12.1% 0%,  12.1% 5%,
                                    27.9% 5%, 27.9% 0%, 43.9% 0%, 43.9% 8%,
                                    56.1% 8%, 56.1% 0%, 71.9% 0%, 71.9% 5%,
                                    87.9% 5%, 87.9% 0%, 96.1% 0%, 96.1% 8%, 100% 8%,
                                    100% 92%, 96.1% 92%, 96.1% 100%, 87.9% 100%, 87.9% 95%,
                                    71.9% 95%, 71.9% 100%, 56.1% 100%, 56.1% 92%,
                                    43.9% 92%, 43.9% 100%, 27.9% 100%, 27.9% 95%,
                                    12.1% 95%, 12.1% 100%, 3.9% 100%, 3.9% 92%,
                                    0% 92%
                                )`
                            }}
                        />
                        <img
                            src={introPhoto}
                            alt="Photo of me"
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{
                                clipPath: `polygon(
                                    0% 8%,    3.9% 8%,  3.9% 0%,  12.1% 0%,  12.1% 5%,
                                    27.9% 5%, 27.9% 0%, 43.9% 0%, 43.9% 8%,
                                    56.1% 8%, 56.1% 0%, 71.9% 0%, 71.9% 5%,
                                    87.9% 5%, 87.9% 0%, 96.1% 0%, 96.1% 8%, 100% 8%,
                                    100% 92%, 96.1% 92%, 96.1% 100%, 87.9% 100%, 87.9% 95%,
                                    71.9% 95%, 71.9% 100%, 56.1% 100%, 56.1% 92%,
                                    43.9% 92%, 43.9% 100%, 27.9% 100%, 27.9% 95%,
                                    12.1% 95%, 12.1% 100%, 3.9% 100%, 3.9% 92%,
                                    0% 92%
                                )`
                            }}
                        />
                    </div>
                </div>

                <BlockEdgeDecoration
                    color="#124559"
                    position="bottom"
                    height="clamp(70px, 12vw, 200px)"
                />

            </section>

            {/* ── My Tools carousel ── */}
            <Transition
                minHeight="min-h-[400px]"
                bgClass="bg-[#071a1e]"
                topSvg={
                    <svg viewBox="0 0 1 80" preserveAspectRatio="none" className="block w-full"
                         style={{height: "80px"}}>
                        <defs>
                            <linearGradient id="toolsFadeIn" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#0e2d33"/>
                                <stop offset="100%" stopColor="#071a1e"/>
                            </linearGradient>
                        </defs>
                        <rect width="1" height="80" fill="url(#toolsFadeIn)"/>
                    </svg>
                }
                bottomSvg={
                    <svg viewBox="0 0 1 80" preserveAspectRatio="none" className="block w-full"
                         style={{height: "80px"}}>
                        <defs>
                            <linearGradient id="toolsFadeOut" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#071a1e"/>
                                <stop offset="100%" stopColor="#0e2d33"/>
                            </linearGradient>
                        </defs>
                        <rect width="1" height="80" fill="url(#toolsFadeOut)"/>
                    </svg>
                }
            >
                <div className="my-16">
                    <h2 className="text-center text-2xl font-bold text-[#e2f0ee] mb-2">
                        My Tools
                    </h2>
                    <p className="text-center text-[#e2f0ee]/50 text-sm mb-8">
                        Languages, frameworks and tools I work with
                    </p>

                    <div className="relative">
                        <Carousel
                            items={tools}
                            renderCard={(tool, handlers, className) => (
                                <ToolCard
                                    name={tool.name}
                                    icon={tool.icon}
                                    category={tool.category}
                                    url={tool.url}
                                    onMouseEnter={handlers.onMouseEnter}
                                    onMouseLeave={handlers.onMouseLeave}
                                    className={className}
                                />
                            )}
                        />
                    </div>
                </div>
            </Transition>

            {/* ── About me sections ── */}
            <section className="relative w-full py-24">

                <BlockEdgeDecoration
                    color="#124559"
                    position="top"
                    flipX="true"
                    height="clamp(70px, 13vw, 200px)"
                />

                <div className="mx-auto max-w-3xl px-6 flex flex-col gap-16 pt-8">

                    {/* What makes me unique */}
                    <div>
                        <h2 className="text-2xl font-semibold text-[#e2f0ee] mb-4">
                            What makes me unique?
                        </h2>
                        <p className="text-[#e2f0ee]/70 leading-relaxed">
                            Placeholder — tell visitors what sets you apart, your approach, your mindset.
                        </p>
                    </div>

                    {/* Personal hobbies */}
                    <div>
                        <h2 className="text-2xl font-semibold text-[#e2f0ee] mb-4">
                            A couple personal hobbies
                        </h2>
                        <p className="text-[#e2f0ee]/70 leading-relaxed">
                            Placeholder — share what you do outside of work/school.
                        </p>
                    </div>

                    {/* Current focus */}
                    <div>
                        <h2 className="text-2xl font-semibold text-[#e2f0ee] mb-4">
                            My current focus
                        </h2>
                        <p className="text-[#e2f0ee]/70 leading-relaxed">
                            My current focus is on developing myself through new engines and projects,
                            and finding out what way of working works best for me.
                        </p>
                    </div>

                </div>

                <BlockEdgeDecoration
                    color="#124559"
                    position="bottom"
                    flipX="true"
                    height="clamp(70px, 12vw, 200px)"
                />

            </section>

        </div>
    );
}

export default About;