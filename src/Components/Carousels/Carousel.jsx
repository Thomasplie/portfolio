import {useEffect, useRef, useState} from "react";

const items = [1, 2, 3, 4, 5, 6, 7];

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
    const [hoveredCard, setHoveredCard] = useState(null);

    const baseSpeed = 80;
    const ease = 0.08;

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
        targetSpeedRef.current = isPlaying && hoveredCard === null ? baseSpeed : 0;
    }, [isPlaying, hoveredCard]);

    useEffect(() => {
        const animate = (time) => {
            if (!lastTimeRef.current) lastTimeRef.current = time;

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
        <div className="py-6">
            <div className="mb-4 flex justify-center">
                <button
                    type="button"
                    onClick={() => setIsPlaying((prev) => !prev)}
                    className="rounded-md bg-cyan-400 px-4 py-2 font-semibold text-black transition-transform duration-200 hover:scale-105"
                >
                    {isPlaying ? "Pause" : "Play"}
                </button>
            </div>

            <div className="carousel-viewport py-4">
                <div
                    ref={trackRef}
                    className="flex w-max gap-4 will-change-transform"
                >
                    {[0, 1].map((_, i) => (
                        <div key={i} ref={i === 0 ? groupRef : null} className="flex shrink-0 items-center gap-4"
                             aria-hidden={i === 1}>
                            {items.map((n) => {
                                const cardId = `${i}-${n}`;
                                const isActive = hoveredCard === cardId;
                                const isAnotherCardHovered =
                                    hoveredCard !== null && hoveredCard !== cardId;
                                return (
                                    <div key={cardId} className="flex-[0_0_5em]">
                                        <div onMouseEnter={() => setHoveredCard(cardId)}
                                             onMouseLeave={() => setHoveredCard(null)}
                                             className={`relative z-0 flex h-[240px] w-[240px] items-center justify-center rounded-[0.2em] bg-cyan-400 text-[3rem] transform-gpu transition-all duration-300
                                             ${isAnotherCardHovered ? "opacity-40" : "opacity-100"}
                                             ${isActive ? "z-30 -translate-y-2 scale-110 shadow-2xl" : ""}`}>
                                            {n}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Carousel;