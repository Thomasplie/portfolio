import {useEffect, useRef, useState} from "react";
import ProjectCard from "./ProjectCard";
import projects from "../../data/projects.js";

// ─── Carousel ────────────────────────────────────────────────────────────────
// Generic infinite scroll carousel.
//
// Props:
//   items      — array of data objects to render (defaults to projects)
//   renderCard — function(item, handlers, className) → JSX
//                Called for each item. If not provided, renders ProjectCard.
//
// This keeps the Homepage carousel working with zero changes while allowing
// the About page to pass tools + ToolCard.

const BASE_SPEED = 80;
const EASE = 0.06;

function Carousel({items, renderCard}) {
    // Fall back to projects data if nothing is passed
    const data = items ?? projects;

    const [isPlaying, setIsPlaying] = useState(true);
    const [hoveredCardId, setHoveredCardId] = useState(null);
    const [copyCount, setCopyCount] = useState(2);

    const viewportRef = useRef(null);
    const groupRef = useRef(null);
    const trackRef = useRef(null);
    const offsetRef = useRef(0);
    const speedRef = useRef(0);
    const targetSpeedRef = useRef(BASE_SPEED);
    const groupWidthRef = useRef(0);
    const lastTimeRef = useRef(null);
    const rafRef = useRef(null);

    const hoveredItem = data.find((p) => p.id === hoveredCardId) ?? null;

    // Copy count
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

    // Animation loop
    useEffect(() => {
        const tick = (time) => {
            if (!lastTimeRef.current) lastTimeRef.current = time;
            const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05);
            lastTimeRef.current = time;
            speedRef.current += (targetSpeedRef.current - speedRef.current) * EASE;

            // Re-measure every frame — SVG cards report 0 on first frame,
            // continuous measurement guarantees the loop point is always correct
            if (groupRef.current) {
                const measured = groupRef.current.offsetWidth;
                if (measured > 0) groupWidthRef.current = measured;
            }

            const gw = groupWidthRef.current;
            if (gw > 0 && trackRef.current) {
                offsetRef.current += speedRef.current * dt;
                if (offsetRef.current >= gw) offsetRef.current -= gw;
                trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
            }
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    // Speed control
    useEffect(() => {
        if (!isPlaying) {
            targetSpeedRef.current = 0;
            speedRef.current = 0;
            return;
        }
        targetSpeedRef.current = hoveredCardId !== null ? 0 : BASE_SPEED;
    }, [isPlaying, hoveredCardId]);

    // Default card renderer — ProjectCard
    function defaultRenderCard(item, {onMouseEnter, onMouseLeave}, className) {
        return (
            <ProjectCard
                type={item.type}
                title={item.title}
                description={item.description}
                tags={item.tags}
                link={`/my-projects/${item.slug}`}
                image={item.image}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className={className}
            />
        );
    }

    const cardRenderer = renderCard ?? defaultRenderCard;

    return (
        <section className="py-6">

            {/* Play / Pause button */}
            <div className="mb-4 flex justify-center">
                <button
                    type="button"
                    onClick={() => setIsPlaying((prev) => !prev)}
                    className="rounded-md bg-[#09BC8A] px-4 py-2 font-semibold text-black transition-transform duration-200 hover:scale-105"
                >
                    {isPlaying ? "Pause Animation" : "Play Animation"}
                </button>
            </div>

            {/* Viewport */}
            <div
                ref={viewportRef}
                className="carousel-viewport py-4"
                style={{
                    maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                }}
            >
                <div ref={trackRef} className="carousel-track">
                    {Array.from({length: copyCount}, (_, groupIndex) => (
                        <div
                            key={groupIndex}
                            ref={groupIndex === 0 ? groupRef : null}
                            className="carousel-group"
                            aria-hidden={groupIndex > 0}
                        >
                            {data.map((item) => {
                                const isActive = hoveredCardId === item.id;
                                const isAnotherHovered = hoveredCardId !== null && !isActive;

                                return (
                                    <div key={`${groupIndex}-${item.id}`} className="flex-[0_0_auto]">
                                        {cardRenderer(
                                            item,
                                            {
                                                onMouseEnter: () => setHoveredCardId(item.id),
                                                onMouseLeave: () => setHoveredCardId(null),
                                            },
                                            `transform-gpu transition-all duration-300
                                            ${isAnotherHovered ? "opacity-40" : "opacity-100"}
                                            ${isActive ? "z-30 -translate-y-2 scale-110" : ""}`
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            {/* Hovered item info card  */}
            {!renderCard && (
                <div
                    className="absolute left-0 right-0 top-full mt-8 mx-auto min-h-[140px] max-w-2xl rounded-2xl bg-[#0e2d33]/90 p-6 shadow-sm transition-all duration-300">
                    {hoveredItem ? (
                        <>
                            <h3 className="text-2xl font-semibold text-[#e2f0ee]">{hoveredItem.title}</h3>
                            <p className="mt-2 text-sm leading-6 text-[#e2f0ee]">{hoveredItem.description}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {hoveredItem.tags.map((tag) => (
                                    <span key={tag}
                                          className="min-w-12 rounded-full bg-[#09BC8A] px-4 py-1 text-center text-sm font-medium text-black">
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
            )}

        </section>
    );
}

export default Carousel;