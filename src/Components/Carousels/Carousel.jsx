import {useEffect, useMemo, useRef, useState} from "react";
import ProjectCard from "./ProjectCard";

const projects = [
    {
        id: 1,
        type: "website",
        title: "Netna",
        description: "A modern website project focused on visual clarity, responsiveness, and a polished user experience.",
        tags: ["React", "Tailwind", "UI"],
        link: "/future-plans",
        image: "/src/assets/Projects/Netna.png",
    },
    {
        id: 2,
        type: "game",
        title: "Esports Guessing Game",
        description: "An interactive game project built around esports knowledge, score tracking, and engaging UI feedback.",
        tags: ["Game", "JavaScript", "UX"],
        link: "/projects/esports-game",
        image: "/src/assets/Projects/Netna.png",
    },
    {
        id: 3,
        type: "website",
        title: "Portfolio Redesign",
        description: "A portfolio concept that combines branding, motion, and structured content presentation.",
        tags: ["Portfolio", "Design", "Frontend"],
        link: "/projects/portfolio-redesign",
        image: "/src/assets/Projects/Netna.png",
    },
    {
        id: 4,
        type: "website",
        title: "Workout Tracker",
        description: "A treadmill workout app with real-time metrics, animation updates, and a strong themed presentation.",
        tags: ["Fitness", "React", "Realtime"],
        link: "/projects/workout-tracker",
        image: "/src/assets/Projects/Netna.png",
    },
    {
        id: 5,
        type: "game",
        title: "Minecraft Remix",
        description: "A creative remix concept exploring redstone systems, maze logic, and playful interaction design.",
        tags: ["Minecraft", "Redstone", "Creative"],
        link: "/projects/minecraft-remix",
        image: "/src/assets/Projects/Netna.png",
    },
    {
        id: 6,
        type: "website",
        title: "Sponsorship Analysis",
        description: "A research-focused project presenting partnership quality through structure, clarity, and visual hierarchy.",
        tags: ["Research", "Analysis", "Content"],
        link: "/projects/sponsorship-analysis",
        image: "/src/assets/Projects/Netna.png",
    },
    {
        id: 7,
        type: "game",
        title: "Pokédex App",
        description: "A Pokédex interface using APIs and dynamic rendering to present Pokémon data in a clean way.",
        tags: ["API", "JavaScript", "Pokédex"],
        link: "/projects/pokedex",
        image: "/src/assets/Projects/Netna.png",
    },
];

function Carousel() {
    const trackRef = useRef(null);
    const groupRef = useRef(null);
    const animationRef = useRef(null);
    const lastTimeRef = useRef(0);
    const offsetRef = useRef(0);
    const currentSpeedRef = useRef(0);
    const targetSpeedRef = useRef(0);
    const groupWidthRef = useRef(0);

    const [isPlaying, setIsPlaying] = useState(true);
    const [hoveredCardId, setHoveredCardId] = useState(null);

    const baseSpeed = 80;
    const ease = 0.08;

    const duplicatedProjects = useMemo(() => [...projects, ...projects], []);

    const hoveredProject =
        projects.find((project) => project.id === hoveredCardId) ?? null;

    useEffect(() => {
        const updateWidth = () => {
            if (groupRef.current) {
                groupWidthRef.current = groupRef.current.offsetWidth;
            }
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);

        return () => {
            window.removeEventListener("resize", updateWidth);
        };
    }, []);

    useEffect(() => {
        targetSpeedRef.current = isPlaying && hoveredCardId === null ? baseSpeed : 0;
    }, [isPlaying, hoveredCardId]);

    useEffect(() => {
        const animate = (time) => {
            if (!lastTimeRef.current) {
                lastTimeRef.current = time;
            }

            const deltaTime = (time - lastTimeRef.current) / 1000;
            lastTimeRef.current = time;

            currentSpeedRef.current +=
                (targetSpeedRef.current - currentSpeedRef.current) * ease;

            offsetRef.current += currentSpeedRef.current * deltaTime;

            const groupWidth = groupWidthRef.current;

            if (groupWidth > 0) {
                offsetRef.current = offsetRef.current % groupWidth;

                if (trackRef.current) {
                    trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <section className="py-6">
            <div className="mb-4 flex justify-center">
                <button
                    type="button"
                    onClick={() => setIsPlaying((prev) => !prev)}
                    className="rounded-md bg-cyan-400 px-4 py-2 font-semibold text-black transition-transform duration-200 hover:scale-105"
                >
                    {isPlaying ? "Pause Animation" : "Play Animation"}
                </button>
            </div>

            <div className="carousel-viewport py-4">
                <div
                    ref={trackRef}
                    className="flex w-max gap-4 will-change-transform"
                >
                    {[0, 1].map((groupIndex) => (
                        <div
                            key={groupIndex}
                            ref={groupIndex === 0 ? groupRef : null}
                            className="flex shrink-0 items-center gap-4"
                            aria-hidden={groupIndex === 1}
                        >
                            {projects.map((project) => {
                                const uniqueRenderId = `${groupIndex}-${project.id}`;
                                const isActive = hoveredCardId === project.id;
                                const isAnotherCardHovered =
                                    hoveredCardId !== null && hoveredCardId !== project.id;

                                return (
                                    <div key={uniqueRenderId} className="flex-[0_0_240px]">
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
                                                ${isAnotherCardHovered ? "opacity-40" : "opacity-100"}
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

            <div
                className="absolute left-0 right-0 top-full mt-8 mx-auto min-h-[140px] max-w-2xl rounded-2xl bg-white/70 p-6 shadow-sm transition-all duration-300">
                {hoveredProject ? (
                    <>
                        <h3 className="text-2xl font-semibold text-black">
                            {hoveredProject.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-black">
                            {hoveredProject.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {hoveredProject.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="min-w-12 rounded-full bg-emerald-400 px-4 py-1 text-center text-sm font-medium text-black"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-black/70">
                        Hover over a project card to view its details.
                    </div>
                )}
            </div>
        </section>
    );
}

export default Carousel;