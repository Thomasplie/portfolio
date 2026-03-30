function BlockEdgeDecoration({
                                 className = "",
                                 color = "#ffffff",
                                 position = "bottom",
                                 flip = false,
                             }) {
    return (
        <div className={`absolute left-0 w-full pointer-events-none z-20
        ${position === "bottom" ? "bottom-0" : "top-0"} ${className}`}
             aria-hidden="true"
        >

            <svg
                viewBox="0 0 1440 180"
                preserveAspectRatio="none"
                className={`w-full h-[120px] md:h-[160px] lg:h-[180px] ${flip ? "scale-y-[-1]" : ""}`}
            >
                <rect x="0" y="60" width="90" height="120" fill={color}/>
                <rect x="90" y="120" width="180" height="60" fill={color}/>

                <rect x="1030" y="120" width="100" height="60" fill={color}/>
                <rect x="1125" y="0" width="95" height="180" fill={color}/>
                <rect x="1220" y="120" width="95" height="90" fill={color}/>
                {/*<rect x="1220" y="120" width="40" height="20" fill="#004346" />*/}
                <rect x="1315" y="0" width="125" height="180" fill={color}/>
            </svg>
        </div>
    );
}

export default BlockEdgeDecoration;