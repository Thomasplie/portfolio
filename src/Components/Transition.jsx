function Transition({
                        children,
                        bgClass = "bg-white",
                        minHeight = "min-h-[100px]",
                        className = "",
                        contentClassName = "",
                        topSvg = null,
                        bottomSvg = null,
                        fullWidthContent = false,
                        fadeColor = null,
                        fadeHeight = "clamp(70px, 13vw, 200px)",
                    }) {

    return (
        <section className={`relative w-full overflow-hidden ${bgClass} ${minHeight} ${className}`}>

            {/* Top SVG layer */}
            {topSvg && (
                <div className="absolute top-0 left-0 z-0 w-full pointer-events-none">
                    {topSvg}
                </div>
            )}

            {/* Top fade */}
            {fadeColor && (
                <div
                    className="absolute top-0 left-0 right-0 z-20 pointer-events-none"
                    style={{
                        height: fadeHeight,
                        background: `linear-gradient(to bottom, ${fadeColor} 0%, transparent 100%)`,
                    }}
                />
            )}

            {/* Main content */}
            <div className={`relative z-10 h-full w-full ${fullWidthContent ? "px-0" : "mx-auto max-w-7xl px-6"}
          ${contentClassName}
        `}
            >
                {children}
            </div>

            {/* Bottom fade */}
            {fadeColor && (
                <div
                    className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
                    style={{
                        height: fadeHeight,
                        background: `linear-gradient(to top, ${fadeColor} 0%, transparent 100%)`,
                    }}
                />
            )}

            {/* Bottom SVG layer */}
            {bottomSvg && (
                <div className="absolute bottom-0 left-0 z-0 w-full pointer-events-none">
                    {bottomSvg}
                </div>
            )}
        </section>
    );
}

export default Transition;