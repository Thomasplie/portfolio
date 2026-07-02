const TEAL = "#09BC8A";
const SIDE = "#0a2218";
const TOP = "#124559";
const DEPTH = 30;
const B = 18;
const W = 200;
const H = 240;

const categoryColors = {
    language: "#F17F29",
    framework: "#09BC8A",
    tool: "#598392",
};

function ToolCard({
                      name = "Tool",
                      icon = null,
                      category = "tool",
                      url = "#",
                      onMouseEnter,
                      onMouseLeave,
                      className = ""
                  }) {
    const dotColor = categoryColors[category] ?? categoryColors.tool;
    const gradId = `grad-tool-${name.replace(/\s+/g, "-").toLowerCase()}`;
    const clipId = `clip-tool-${name.replace(/\s+/g, "-").toLowerCase()}`;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block group cursor-pointer ${className}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            aria-label={`${name} documentation`}
        >
            <svg
                width={W + DEPTH}
                height={H + DEPTH}
                viewBox={`0 0 ${W + DEPTH} ${H + DEPTH}`}
                style={{display: "block", overflow: "visible"}}
            >
                <defs>
                    <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="transparent"/>
                        <stop offset="100%" stopColor="#071a1ef5"/>
                    </linearGradient>
                    <clipPath id={clipId}>
                        <rect x="0" y={DEPTH} width={W} height={H}/>
                    </clipPath>
                </defs>

                {/* ── Top face ── */}
                <polygon
                    points={`0,${DEPTH} ${W},${DEPTH} ${W + DEPTH},0 ${DEPTH},0`}
                    fill={TOP}
                />
                <line x1="0" y1={DEPTH} x2={DEPTH} y2="0" stroke={TEAL} strokeWidth="1" opacity="0.6"/>
                <line x1={DEPTH} y1="0" x2={W + DEPTH} y2="0" stroke={TEAL} strokeWidth="1" opacity="0.4"/>
                <line x1={W} y1={DEPTH} x2={W + DEPTH} y2="0" stroke={TEAL} strokeWidth="1" opacity="0.6"/>

                {/* ── Front face background ── */}
                <rect x="0" y={DEPTH} width={W} height={H} fill="#0e2d33" clipPath={`url(#${clipId})`}/>

                {/* ── Icon fills entire front face ── */}
                {icon && (
                    <image
                        href={icon}
                        x="0" y={DEPTH}
                        width={W} height={H}
                        preserveAspectRatio="xMidYMid meet"
                        clipPath={`url(#${clipId})`}
                    />
                )}

                {/* ── Front face gradient overlay ── */}
                <rect
                    x="0" y={DEPTH} width={W} height={H}
                    fill={`url(#${gradId})`}
                />

                {/* ── Right side panel ── */}
                <polygon
                    points={`${W},${DEPTH} ${W + DEPTH},0 ${W + DEPTH},${H} ${W},${H + DEPTH}`}
                    fill={SIDE}
                />
                <line x1={W} y1={DEPTH} x2={W + DEPTH} y2="0" stroke={TEAL} strokeWidth="1" opacity="0.6"/>
                <line x1={W + DEPTH} y1="0" x2={W + DEPTH} y2={H} stroke={TEAL} strokeWidth="1" opacity="0.3"/>
                <line x1={W} y1={H + DEPTH} x2={W + DEPTH} y2={H} stroke={TEAL} strokeWidth="1" opacity="0.4"/>

                {/* ── Corner brackets ── */}
                <line x1="0" y1={DEPTH + B} x2="0" y2={DEPTH} stroke={TEAL} strokeWidth="2"/>
                <line x1="0" y1={DEPTH} x2={B} y2={DEPTH} stroke={TEAL} strokeWidth="2"/>
                <line x1={W} y1={DEPTH + B} x2={W} y2={DEPTH} stroke={TEAL} strokeWidth="2"/>
                <line x1={W} y1={DEPTH} x2={W - B} y2={DEPTH} stroke={TEAL} strokeWidth="2"/>
                <line x1="0" y1={H + DEPTH - B} x2="0" y2={H + DEPTH} stroke={TEAL} strokeWidth="2"/>
                <line x1="0" y1={H + DEPTH} x2={B} y2={H + DEPTH} stroke={TEAL} strokeWidth="2"/>
                <line x1={W} y1={H + DEPTH - B} x2={W} y2={H + DEPTH} stroke={TEAL} strokeWidth="2"/>
                <line x1={W} y1={H + DEPTH} x2={W - B} y2={H + DEPTH} stroke={TEAL} strokeWidth="2"/>

                {/* ── Category dot ── */}
                <circle cx={W - 14} cy={DEPTH + 14} r="4" fill={dotColor}/>

                {/* ── Category label ── */}
                <text
                    x="10" y={H + DEPTH - 18}
                    fontSize="8" fill={dotColor}
                    fontFamily="sans-serif" fontWeight="700"
                    letterSpacing="2"
                    style={{textTransform: "uppercase"}}
                >
                    {category}
                </text>

                {/* ── Tool name ── */}
                <text
                    x="10" y={H + DEPTH - 6}
                    fontSize="13" fill="#e2f0ee"
                    fontFamily="sans-serif" fontWeight="500"
                >
                    {name}
                </text>
            </svg>
        </a>
    );
}

export default ToolCard;