import {Link} from "react-router";

function ProjectCard({
                         type = "website",
                         title = "Project Title",
                         description = "Project Description",
                         tags = [],
                         link = "#",
                         image = "",
                         children,
                         onMouseEnter,
                         onMouseLeave,
                         className = "",
                     }) {
    const dotColors = {
        website: "#F17F29",
        game: "#004346",
    };

    const dotColor = dotColors[type] || dotColors.website;
    const TEAL = "#09BC8A";
    const SIDE = "#0a2218"; // right panel dark
    const TOP = "#124559"; // top face mid teal
    const DEPTH = 30;        // how deep the top face / right panel extend in px
    const B = 18;        // bracket arm length
    const W = 200;       // card face width
    const H = 240;       // card face height

    return (
        <Link
            to={link}
            className={`block group ${className}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            aria-label={`${title} project card`}
        >
            <svg
                width={W + DEPTH}
                height={H + DEPTH}
                viewBox={`0 0 ${W + DEPTH} ${H + DEPTH}`}
                style={{display: "block", overflow: "visible"}}
            >
                <defs>
                    <linearGradient id={`grad-${type}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="transparent"/>
                        <stop offset="100%" stopColor="#071a1ef5"/>
                    </linearGradient>
                    <clipPath id={`clip-front-${type}`}>
                        <rect x="0" y={DEPTH} width={W} height={H}/>
                    </clipPath>
                </defs>

                {/* Top face  */}
                <polygon
                    points={`0,${DEPTH} ${W},${DEPTH} ${W + DEPTH},0 ${DEPTH},0`}
                    fill={TOP}
                />
                <line x1="0" y1={DEPTH} x2={DEPTH} y2="0" stroke={TEAL} strokeWidth="1" opacity="0.6"/>
                <line x1={DEPTH} y1="0" x2={W + DEPTH} y2="0" stroke={TEAL} strokeWidth="1" opacity="0.4"/>
                <line x1={W} y1={DEPTH} x2={W + DEPTH} y2="0" stroke={TEAL} strokeWidth="1" opacity="0.6"/>

                {/* Front face  */}
                <image
                    href={image}
                    x="0" y={DEPTH}
                    width={W} height={H}
                    preserveAspectRatio="xMidYMid slice"
                    clipPath={`url(#clip-front-${type})`}
                />

                {/* ── Front face — gradient overlay ── */}
                <rect
                    x="0" y={DEPTH} width={W} height={H}
                    fill={`url(#grad-${type})`}
                />

                {/* ── Right side panel ── */}
                <polygon
                    points={`${W},${DEPTH} ${W + DEPTH},0 ${W + DEPTH},${H} ${W},${H + DEPTH}`}
                    fill={SIDE}
                />
                <line x1={W} y1={DEPTH} x2={W + DEPTH} y2="0" stroke={TEAL} strokeWidth="1" opacity="0.6"/>
                <line x1={W + DEPTH} y1="0" x2={W + DEPTH} y2={H} stroke={TEAL} strokeWidth="1" opacity="0.3"/>
                <line x1={W} y1={H + DEPTH} x2={W + DEPTH} y2={H} stroke={TEAL} strokeWidth="1" opacity="0.4"/>

                {/* ── Corner bracket — top left ── */}
                <line x1="0" y1={DEPTH + B} x2="0" y2={DEPTH} stroke={TEAL} strokeWidth="2"/>
                <line x1="0" y1={DEPTH} x2={B} y2={DEPTH} stroke={TEAL} strokeWidth="2"/>

                {/* ── Corner bracket — top right ── */}
                <line x1={W} y1={DEPTH + B} x2={W} y2={DEPTH} stroke={TEAL} strokeWidth="2"/>
                <line x1={W} y1={DEPTH} x2={W - B} y2={DEPTH} stroke={TEAL} strokeWidth="2"/>

                {/* ── Corner bracket — bottom left ── */}
                <line x1="0" y1={H + DEPTH - B} x2="0" y2={H + DEPTH} stroke={TEAL} strokeWidth="2"/>
                <line x1="0" y1={H + DEPTH} x2={B} y2={H + DEPTH} stroke={TEAL} strokeWidth="2"/>

                {/* ── Corner bracket — bottom right ── */}
                <line x1={W} y1={H + DEPTH - B} x2={W} y2={H + DEPTH} stroke={TEAL} strokeWidth="2"/>
                <line x1={W} y1={H + DEPTH} x2={W - B} y2={H + DEPTH} stroke={TEAL} strokeWidth="2"/>

                {/* ── Category dot ── */}
                <circle
                    cx={W - 14} cy={DEPTH + 14}
                    r="4"
                    fill={dotColor}
                    stroke={type === "game" ? TEAL : "none"}
                    strokeWidth="1"
                />

                {/* ── Type label ── */}
                <text
                    x="10" y={H + DEPTH - 18}
                    fontSize="8" fill={TEAL}
                    fontFamily="sans-serif" fontWeight="700"
                    letterSpacing="2"
                    style={{textTransform: "uppercase"}}
                >
                    {type}
                </text>

                {/* ── Title ── */}
                <text
                    x="10" y={H + DEPTH - 6}
                    fontSize="13" fill="#e2f0ee"
                    fontFamily="sans-serif" fontWeight="500"
                >
                    {title}
                </text>
            </svg>
        </Link>
    );
}

export default ProjectCard;