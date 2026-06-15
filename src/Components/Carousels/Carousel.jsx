import {useEffect, useRef, useState} from "react";
import ProjectCard from "./ProjectCard";
import projects from "../../data/projects.js";

const BASE_SPEED = 80; // px per second at full speed
const EASE = 0.06; // how quickly speed changes (lower = more gradual)

function Carousel() {
    const [isPlaying, setIsPlaying] = useState(true);
    const [hoveredCardId, setHoveredCardId] = useState(null);
    const [copyCount, setCopyCount] = useState(2);

    const viewportRef = useRef(null);
    const groupRef = useRef(null);
    const trackRef = useRef(null);

    // Animation state — all in refs so the rAF loop never causes re-renders
    // Render stutter issue solution
    const offsetRef = useRef(0);      // current px offset
    const speedRef = useRef(0);      // current px/s (eased)
    const targetSpeedRef = useRef(BASE_SPEED); // what we're easing toward
    const groupWidthRef = useRef(0);
    const lastTimeRef = useRef(null);
    const rafRef = useRef(null);
    const modeRef = useRef("js");   // "js" = we control transform, "css" = CSS animation controls it

    const hoveredProject = projects.find((p) => p.id === hoveredCardId) ?? null;

    // ── Copy count: enough to always fill the viewport with no gaps ──────────
    useEffect(() => {
        const calculate = () => {
            if (!groupRef.current || !viewportRef.current) return;
            const gw = groupRef.current.offsetWidth;
            const vw = viewportRef.current.offsetWidth;
            if (gw === 0) return;
            groupWidthRef.current = gw;
            const needed = Math.ceil((vw * 2) / gw) + 1;
            setCopyCount(Math.max(2, needed));
        };
        const raf = requestAnimationFrame(calculate);
        window.addEventListener("resize", calculate);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", calculate);
        };
    }, []);

    // ── Main animation loop ───────────────────────────────────────────────────
    useEffect(() => {
        const tick = (time) => {
            if (!lastTimeRef.current) lastTimeRef.current = time;
            const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05); // cap dt to avoid jumps after tab switch
            lastTimeRef.current = time;

            // Ease speed toward target
            speedRef.current += (targetSpeedRef.current - speedRef.current) * EASE;

            const gw = groupWidthRef.current;

            if (gw > 0 && trackRef.current) {
                offsetRef.current += speedRef.current * dt;

                // Seamless loop — subtract one group width when we've scrolled that far
                if (offsetRef.current >= gw) offsetRef.current -= gw;

                trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
            }

            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    // ── React to pause button and hover state ─────────────────────────────────
    useEffect(() => {
        // Pause button → instant stop, no easing
        if (!isPlaying) {
            targetSpeedRef.current = 0;
            speedRef.current = 0;
            return;
        }
        // Hover → ease to stop, ease back to full speed
        targetSpeedRef.current = hoveredCardId !== null ? 0 : BASE_SPEED;
    }, [isPlaying, hoveredCardId]);

    return (
        <section className="py-6">

            {/* ── Play / Pause button ── */}
            <div className="mb-4 flex justify-center">
                <button
                    type="button"
                    onClick={() => setIsPlaying((prev) => !prev)}
                    className="rounded-md bg-[#09BC8A] px-4 py-2 font-semibold text-black transition-transform duration-200 hover:scale-105"
                >
                    {isPlaying ? "Pause Animation" : "Play Animation"}
                </button>
            </div>

            {/* ── Carousel viewport ── */}
            <div
                ref={viewportRef}
                className="carousel-viewport py-4"
                style={{
                    maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                }}
            >
                {/*
                    JS controls transform directly via offsetRef.
                    No CSS animation needed — the rAF loop handles everything.
                */}
                <div
                    ref={trackRef}
                    className="carousel-track"
                >
                    {Array.from({length: copyCount}, (_, groupIndex) => (
                        <div
                            key={groupIndex}
                            ref={groupIndex === 0 ? groupRef : null}
                            className="carousel-group"
                            aria-hidden={groupIndex > 0}
                        >
                            {projects.map((project) => {
                                const isActive = hoveredCardId === project.id;
                                const isAnotherHovered = hoveredCardId !== null && !isActive;

                                return (
                                    <div
                                        key={`${groupIndex}-${project.id}`}
                                        className="flex-[0_0_240px]"
                                    >
                                        <ProjectCard
                                            type={project.type}
                                            title={project.title}
                                            description={project.description}
                                            tags={project.tags}
                                            link={project.link}
                                            image={project.image}
                                            onMouseEnter={() => setHoveredCardId(project.id)}
                                            onMouseLeave={() => setHoveredCardId(null)}
                                            className={`
                                                transform-gpu transition-all duration-300
                                                ${isAnotherHovered ? "opacity-40" : "opacity-100"}
                                                ${isActive ? "z-30 -translate-y-2 scale-110" : ""}
                                            `}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Hovered project info card ── */}
            <div
                className="absolute left-0 right-0 top-full mt-8 mx-auto min-h-[140px] max-w-2xl rounded-2xl bg-[#0e2d33]/90 p-6 shadow-sm transition-all duration-300">
                {hoveredProject ? (
                    <>
                        <h3 className="text-2xl font-semibold text-[#e2f0ee]">
                            {hoveredProject.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-[#e2f0ee]">
                            {hoveredProject.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {hoveredProject.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="min-w-12 rounded-full bg-[#09BC8A] px-4 py-1 text-center text-sm font-medium text-black"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-[#e2f0ee]/70">
                        Hover over a project card to view its details.
                    </div>
                )}
            </div>

        </section>
    );
}

export default Carousel;