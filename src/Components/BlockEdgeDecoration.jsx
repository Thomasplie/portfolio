function BlockEdgeDecoration({
                                 className = "",
                                 color = "#124559",
                                 position = "bottom",
                                 flip = false,
                                 height = "clamp(70px, 12vw, 200px)",
                             }) {

    const isTop = position === "top";
    const shouldFlip = flip || isTop;

    return (
        <div className={`absolute left-0 w-full overflow-hidden pointer-events-none z-20 ${
            isTop ? "top-0" : "bottom-0"} ${className}`} style={{height}} aria-hidden="true">


            {/* stroke="black" strokeWidth="5" */}
            <svg viewBox="0 0 1240 140" preserveAspectRatio="none"
                 className={`block w-full h-full ${shouldFlip ? "scale-y-[-1]" : ""}`}>

                {/* Base strip across the entire width */}
                <rect x="0" y="120" width="1240" height="20" fill="#ffffff"/>

                {/* DO NOT TOUCH WIDTH FOR STYLING, ONLY HEIGHTS. */}
                <rect x="0" y="25" width="98" height="115" fill={color}></rect>

                <rect x="97" y="75" width="102" height="65" fill={color}></rect>

                <rect x="198" y="105" width="243" height="35" fill={color}></rect>

                <rect x="440" y="120" width="243" height="20" fill={color}></rect>

                <rect x="682" y="90" width="375" height="50" fill={color}></rect>

                <rect x="1056" y="35" width="101" height="105" fill={color}></rect>

                <rect x="1156" y="0" width="84" height="140" fill={color}></rect>

            </svg>
        </div>
    );
}

export default BlockEdgeDecoration;