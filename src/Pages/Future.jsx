import HeaderBanner from "../Components/HeaderBanner.jsx";
import BlockEdgeDecoration from "../Components/BlockEdgeDecoration.jsx";
import SkillTree from "../Components/SkillTree.jsx";

function Future() {
    return (
        <div className="bg-[#0e2d33]">

            {/* ── Hero ── */}
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
                            Where I've been — and where I'm going.
                        </p>
                    </div>
                }
            />

            {/*
                ── Skill tree section ───────────────────────────────────────────
                The BlockEdgeDecorations sit INSIDE this relative wrapper so
                they overlap the SkillTree canvas from above and below —
                exactly like every other page. No separate sections needed.
            ── */}
            <section className="relative w-full">

                {/* Bites down from top — page bg color blends into the dark canvas */}
                <BlockEdgeDecoration
                    color="#124559"
                    position="top"
                    flipX="true"
                    height="clamp(70px, 12vw, 200px)"
                />

                <SkillTree/>

                {/* Bites up from bottom — same color so exit is seamless */}
                <BlockEdgeDecoration
                    color="#124559"
                    position="bottom"
                    height="clamp(70px, 12vw, 200px)"
                />

            </section>

            {/* ── Closing text section — same pattern as Homepage ── */}
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
                        This skill tree is a living document — it grows as I do.
                        The nodes you see marked with a <span className="text-[#7F77DD] font-semibold">?</span> aren't
                        empty spaces, they're open doors. I don't know exactly where they lead yet,
                        and honestly that's the most exciting part.
                    </article>

                    <article className="mt-6 text-left leading-relaxed text-[#e2f0ee]/80 break-words">
                        If you want to be part of where this goes next — whether that's an internship,
                        a collaboration, or just a conversation — feel free to reach out.
                    </article>

                </div>

            </section>

        </div>
    );
}

export default Future;