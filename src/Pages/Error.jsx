import {Link} from "react-router";
import SpatialCubesAmbient from "../Components/SpatialCubesAmbient.jsx";

// ─── Inline cube card SVG — same geometry as ProjectCard ─────────────────────
// No import needed — the image is passed as a data URI from the original file.
const TEAL = "#09BC8A";
const SIDE = "#0a2218";
const TOP = "#124559";
const DEPTH = 30;
const B = 18;
const W = 200;
const H = 240;

function ErrorCubeCard({image}) {
    return (
        <svg
            width={W + DEPTH}
            height={H + DEPTH}
            viewBox={`0 0 ${W + DEPTH} ${H + DEPTH}`}
            style={{display: "block", overflow: "visible"}}
        >
            <defs>
                <linearGradient id="grad-error" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="transparent"/>
                    <stop offset="100%" stopColor="#071a1ef5"/>
                </linearGradient>
                <clipPath id="clip-error">
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

            {/* Front face — image  */}
            <image
                href={image}
                x="0" y={DEPTH}
                width={W} height={H}
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#clip-error)"
            />

            {/* Gradient overlay  */}
            <rect x="0" y={DEPTH} width={W} height={H} fill="url(#grad-error)"/>

            {/*  Right side panel  */}
            <polygon
                points={`${W},${DEPTH} ${W + DEPTH},0 ${W + DEPTH},${H} ${W},${H + DEPTH}`}
                fill={SIDE}
            />
            <line x1={W} y1={DEPTH} x2={W + DEPTH} y2="0" stroke={TEAL} strokeWidth="1" opacity="0.6"/>
            <line x1={W + DEPTH} y1="0" x2={W + DEPTH} y2={H} stroke={TEAL} strokeWidth="1" opacity="0.3"/>
            <line x1={W} y1={H + DEPTH} x2={W + DEPTH} y2={H} stroke={TEAL} strokeWidth="1" opacity="0.4"/>

            {/*  Corner brackets  */}
            <line x1="0" y1={DEPTH + B} x2="0" y2={DEPTH} stroke={TEAL} strokeWidth="2"/>
            <line x1="0" y1={DEPTH} x2={B} y2={DEPTH} stroke={TEAL} strokeWidth="2"/>
            <line x1={W} y1={DEPTH + B} x2={W} y2={DEPTH} stroke={TEAL} strokeWidth="2"/>
            <line x1={W} y1={DEPTH} x2={W - B} y2={DEPTH} stroke={TEAL} strokeWidth="2"/>
            <line x1="0" y1={H + DEPTH - B} x2="0" y2={H + DEPTH} stroke={TEAL} strokeWidth="2"/>
            <line x1="0" y1={H + DEPTH} x2={B} y2={H + DEPTH} stroke={TEAL} strokeWidth="2"/>
            <line x1={W} y1={H + DEPTH - B} x2={W} y2={H + DEPTH} stroke={TEAL} strokeWidth="2"/>
            <line x1={W} y1={H + DEPTH} x2={W - B} y2={H + DEPTH} stroke={TEAL} strokeWidth="2"/>

            {/*  Label  */}
            <text
                x="10" y={H + DEPTH - 18}
                fontSize="8" fill={TEAL}
                fontFamily="sans-serif" fontWeight="700"
                letterSpacing="2"
                style={{textTransform: "uppercase"}}
            >
                error
            </text>
            <text
                x="10" y={H + DEPTH - 6}
                fontSize="13" fill="#e2f0ee"
                fontFamily="sans-serif" fontWeight="500"
            >
                404 — Page not found
            </text>
        </svg>
    );
}

// Error page
const ERROR_IMAGE = "data:image/jpeg;base64,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"

function Error() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#0d1117]">

            {/*  Ambient cube background  */}
            <div className="absolute inset-0 z-0">
                <SpatialCubesAmbient/>
            </div>

            {/* Content */}
            <div
                className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 gap-6">

                {/* Cube card with the error image */}
                <ErrorCubeCard image={ERROR_IMAGE}/>

                {/* 404 heading */}
                <h1 className="text-6xl font-extrabold text-[#e2f0ee]">
                    404
                </h1>

                {/* Subtitle */}
                <p className="text-lg text-[#e2f0ee]/70">
                    Looks like this page disappeared… or never existed.
                </p>

                {/* Return home */}
                <Link to="/" className="contact-btn mt-4">
                    <span>Return to Home</span>
                </Link>

            </div>

        </div>
    );
}

export default Error;