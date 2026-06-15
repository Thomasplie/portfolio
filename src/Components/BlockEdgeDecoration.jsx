function BlockEdgeDecoration({
                                 className = "",
                                 color = "#ffffff",
                                 position = "bottom",
                                 flipY = false,
                                 flipX = false,
                                 height = "clamp(70px, 12vw, 200px)",
                             }) {
    const isTop = position === "top";

    const transforms = [
        flipX ? "scale-x-[-1]" : "",
        flipY || isTop ? "scale-y-[-1]" : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={`absolute left-0 w-full overflow-hidden pointer-events-none z-20 ${isTop ? "top-0" : "bottom-0"} 
        ${className}`} style={{height}} aria-hidden="true">

            <svg viewBox="0 0 1240 140" preserveAspectRatio="none" className={`block w-full h-full ${transforms}`}>

                {/* Default stroke */}
                <rect x="0" y="120" width="1240" height="20" fill={color}/>

                {/* DO NOT TOUCH WIDTH FOR STYLING, ONLY HEIGHTS. */}
                <rect x="0" y="25" width="98" height="115" fill={color}/>
                <rect x="97" y="75" width="102" height="65" fill={color}/>
                <rect x="198" y="105" width="243" height="35" fill={color}/>
                <rect x="440" y="120" width="243" height="20" fill={color}/>
                <rect x="682" y="90" width="375" height="50" fill={color}/>
                <rect x="1056" y="35" width="101" height="105" fill={color}/>
                <rect x="1156" y="0" width="84" height="140" fill={color}/>
            </svg>
        </div>
    );
}

export default BlockEdgeDecoration;