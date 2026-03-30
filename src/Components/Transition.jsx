function Transition({
                        children,
                        bgClass = "bg-white",
                        minHeight = "min-h-[100px]",
                        className = "",
                        contentClassName = "",
                        topSvg = null,
                        bottomSvg = null,
                        fullWidthContent = false,
                    }) {

    return (
        <section className={`relative w-full overflow-hidden ${bgClass} ${minHeight} ${className}`}>

            {/* Top SVG layer */}
            {topSvg && (
                <div className="absolute top-0 left-0 z-0 w-full pointer-events-none">
                    {topSvg}
                </div>
            )}

            {/* Main content */}
            <div className={`relative z-10 h-full w-full ${fullWidthContent ? "px-0" : "mx-auto max-w-7xl px-6"}
          ${contentClassName}
        `}
            >
                {children}
            </div>

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