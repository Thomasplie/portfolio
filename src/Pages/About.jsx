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
                            Developer. Designer. Gamer.
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
                            Hey there 👋
                        </h2>
                        <p className="text-[#e2f0ee]/70 leading-relaxed mb-4">
                            Hi, I'm Thomas! A developer with a soft spot for games, good design, and of course good
                            vibes.
                            I spend most of my time looking at a screen, as developers do. Whether it's a web app or a
                            game project,
                            I'm always up for the challenge.

                            I take my work seriously, but not myself. If something isn't good enough, I'll happily tear
                            it down and start over.
                        </p>
                        <p className="text-[#e2f0ee]/70 leading-relaxed">
                            Whether it's a website or a game in the making, I always look at my work with a
                            critical perspective. If I don't think it's good enough, I go back to the drawing board.
                        </p>
                    </div>

                    {/* Right  photo */}
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

            {/* My Tools carousel */}
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

            {/* About me sections */}
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
                            I bring a lot of drive to the projects I work on.
                            If something isn't good enough, I'd rather go back to the drawing board than push through
                            with a half-baked idea.
                            Quality over speed. I am, however, also very flexible about what is and isn't a good idea.
                            <br>
                            </br>
                            I work closely with feedback.
                            Not just from teammates, but from the people who actually use what we build.
                            Getting input from the target audience early and often is something I genuinely believe in.
                            <br>
                            </br>
                            I'm comfortable both in a team and working independently.
                            In a team setting, I value clear ownership.
                            If I'm responsible for the user experience, that's where my full energy goes.
                            If it's keeping the codebase clean and structured, I commit to that just as deeply.
                            I think projects run best when everyone has the final say in their own domain.
                        </p>
                    </div>

                    {/* Personal hobbies */}
                    <div>
                        <h2 className="text-2xl font-semibold text-[#e2f0ee] mb-4">
                            A couple personal hobbies.
                        </h2>
                        <p className="text-[#e2f0ee]/70 leading-relaxed">
                            Gaming has always been a big part of my life, strategy games in particular.
                            It's where my patience comes from, and patience turns out to be surprisingly useful when
                            debugging at 11pm.
                            <br></br>
                            Outside of screens, I enjoy social outings and spending time with people,
                            though I'm equally happy working on personal projects at home. I don't really separate the
                            two. A good evening can be either.
                            <br></br>
                            Lately I've been on a pixel art journey.
                            Learning to create sprites that feel charming and alive is something I'm genuinely excited
                            about.
                            I'm trying to get better so that I can reuse the sprites in my 2D games.
                        </p>
                    </div>

                    {/* Current focus */}
                    <div>
                        <h2 className="text-2xl font-semibold text-[#e2f0ee] mb-4">
                            My current focus.
                        </h2>
                        <p className="text-[#e2f0ee]/70 leading-relaxed">
                            Right now, I'm deepening my knowledge of Unity and pushing myself further into 2D game
                            development.
                            I want to get to a point where I can take a game from concept to becoming something I can be
                            proud of.

                            On the web side of things, I'm continuing to refine my frontend skills and looking for new
                            ideas for design.
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