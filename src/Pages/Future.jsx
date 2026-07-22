import HeaderBanner from "../Components/HeaderBanner.jsx";
import BlockEdgeDecoration from "../Components/BlockEdgeDecoration.jsx";
import SkillTree from "../Components/SkillTree.jsx";

function Future() {
    return (
        <div className="bg-[#0e2d33]">

            {/* Hero */}
            <HeaderBanner
                overrideText={
                    <div>
                        <p className="mb-4 text-sm md:text-base font-medium text-[#09BC8A]">
                            What's next
                        </p>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                            Future Plans.
                        </h1>
                        <p className="mt-4 text-lg md:text-2xl text-white/70">
                            Where I've been, and where I'm going.
                        </p>
                    </div>
                }
            />

            <section className="relative w-full">

                <BlockEdgeDecoration
                    color="#124559"
                    position="top"
                    flipX="true"
                    height="clamp(70px, 12vw, 200px)"
                />

                <SkillTree/>

                <BlockEdgeDecoration
                    color="#124559"
                    position="bottom"
                    height="clamp(70px, 12vw, 200px)"
                />

            </section>

            <section className="relative w-full py-40">

                <BlockEdgeDecoration
                    color="#124559"
                    position="top"
                    flipX="true"
                    height="clamp(70px, 13vw, 200px)"
                />

                <div className="mx-auto px-96 text-center">

                    <h2 className="text-center text-3xl font-semibold tracking-wide text-[#e2f0ee]">
                        The journey continues.
                    </h2>

                    <article className="mt-6 text-left leading-relaxed text-[#e2f0ee]/80 break-words">
                        This skill tree represents the most important steps I have taken during my journey as a
                        developer.
                        The nodes you see marked with a <span className="text-[#7F77DD] font-semibold">?</span> aren't
                        empty spaces, they're opportunities I just haven't explored yet. I have a lot of plans for the
                        future, like
                        creating games, learning new coding languages, exploring other game engines, and of course
                        updating and improving
                        this portfolio, you name it.
                    </article>

                    <article className="mt-6 text-left leading-relaxed text-[#e2f0ee]/80 break-words">
                        If you want to be part of where this goes next, whether that's an internship,
                        a collaboration, or just a conversation, feel free to reach out.
                    </article>

                </div>

            </section>

        </div>
    );
}

export default Future;