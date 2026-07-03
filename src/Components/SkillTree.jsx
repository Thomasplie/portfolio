import {useEffect, useRef, useState} from "react";
import SpatialCubesAmbient from "./SpatialCubesAmbient.jsx";

// ─── Node data ────────────────────────────────────────────────────────────────
// Fill in real descriptions when ready. color: root | game | web | future
const NODES = [
    {
        id: 0, x: 100, y: 300,
        label: "Started\nCMGT",
        title: "Started CMGT",
        desc: "When I started CMGT I had no clue what I was doing in web-dev. It was the beginning of everything — a blank slate and a lot of curiosity.",
        tags: ["CMGT", "2023", "Start"],
        color: "root",
    },
    {
        id: 1, x: 280, y: 180,
        label: "Game Dev\nHobby",
        title: "Game Dev Hobby",
        desc: "Discovered a passion for game design through course projects and personal experiments. Started exploring Unity and C#.",
        tags: ["Unity", "C#", "Design"],
        color: "game",
    },
    {
        id: 2, x: 280, y: 420,
        label: "Frontend\nFocus",
        title: "Frontend Focus",
        desc: "Fell in love with building interactive web experiences. React became my framework of choice and I never looked back.",
        tags: ["React", "HTML", "CSS"],
        color: "web",
    },
    {
        id: 3, x: 460, y: 100,
        label: "Purify\nGame",
        title: "Purify — The Game",
        desc: "Built a full 2D platformer as part of a team project. I handled game design, level design, and environment art.",
        tags: ["Unity", "Game", "Team"],
        color: "game",
    },
    {
        id: 4, x: 460, y: 280,
        label: "This\nPortfolio",
        title: "This Portfolio",
        desc: "Designed and built this portfolio from scratch using React, Vite and Tailwind CSS. You're looking at it right now.",
        tags: ["React", "Vite", "Tailwind"],
        color: "web",
    },
    {
        id: 5, x: 460, y: 420,
        label: "Internship",
        title: "Internship",
        desc: "Currently seeking an internship where I can contribute to real projects, learn from experienced developers and grow fast.",
        tags: ["Frontend", "Junior", "Growth"],
        color: "web",
    },
    {
        id: 6, x: 640, y: 100,
        label: "?",
        title: "Unknown — Game Path",
        desc: "A future game project — bigger in scope, more ambitious. What comes after Purify is still being written.",
        tags: ["Future", "Game"],
        color: "future",
    },
    {
        id: 7, x: 640, y: 280,
        label: "?",
        title: "Unknown — Web Path",
        desc: "The next step after this portfolio. Something more complex, more ambitious — maybe a full-stack project.",
        tags: ["Future", "Web"],
        color: "future",
    },
    {
        id: 8, x: 640, y: 420,
        label: "?",
        title: "Unknown — Career",
        desc: "Where the internship leads. A full-time role, new skills, new team. The destination is unclear — and that's exciting.",
        tags: ["Future", "Career"],
        color: "future",
    },
];

const EDGES = [
    [0, 1], [0, 2],
    [1, 3], [1, 6],
    [2, 4], [2, 5],
    [3, 6],
    [4, 7],
    [5, 8],
];

// ─── Colors ───────────────────────────────────────────────────────────────────
const C = {
    TEAL: "#09BC8A",
    TEAL_MID: "#09BC8A88",
    TEAL_DIM: "#09BC8A33",
    ORANGE: "#F17F29",
    ORANGE_MID: "#F17F2988",
    ORANGE_DIM: "#F17F2933",
    PURPLE: "#7F77DD",
    PURPLE_DIM: "#7F77DD44",
    DARK: "#0d1117",
    BG_TEAL: "#0e2d33",
    BG_GAME: "#1a0e00",
    BG_ROOT: "#1a0800",
    BG_Q: "#0e0b1a",
};

const NODE_W = 90;
const NODE_H = 42;
const Q_SIZE = 42;

function getScheme(node, hovered) {
    const hot = hovered?.id === node.id;
    switch (node.color) {
        case "root":
            return {fill: C.BG_ROOT, stroke: C.ORANGE, tc: C.ORANGE, sw: hot ? 2 : 1.5};
        case "game":
            return {fill: C.BG_GAME, stroke: C.ORANGE, tc: C.ORANGE, sw: hot ? 2 : 1.5};
        case "web":
            return {fill: C.BG_TEAL, stroke: C.TEAL, tc: C.TEAL, sw: hot ? 2 : 1.5};
        case "future":
            return {fill: C.BG_Q, stroke: C.PURPLE_DIM, tc: C.PURPLE_DIM, sw: 1, dash: !hot};
        default:
            return {fill: C.BG_TEAL, stroke: C.TEAL, tc: C.TEAL, sw: 1.5};
    }
}

function getEdgeColor(a, b) {
    if (b.color === "future") return C.PURPLE_DIM;
    if (a.color === "game" || b.color === "game") return C.ORANGE_MID;
    if (a.color === "root") return C.TEAL_DIM;
    return C.TEAL_MID;
}

// ─── Draw helpers ─────────────────────────────────────────────────────────────
function drawRR(ctx, x, y, w, h, r, fill, stroke, sw, dash) {
    if (dash) ctx.setLineDash([4, 4]); else ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
    }
    if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = sw;
        ctx.stroke();
    }
    ctx.setLineDash([]);
}

function drawText(ctx, str, x, y, color, size = 9, weight = "500") {
    ctx.fillStyle = color;
    ctx.font = `${weight} ${size}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const lines = str.split("\n");
    lines.forEach((l, i) => ctx.fillText(l, x, y + (i - (lines.length - 1) / 2) * 13));
}

function drawPCBLine(ctx, x1, y1, x2, y2, color, dashed = false) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.2;
    if (dashed) ctx.setLineDash([4, 4]); else ctx.setLineDash([]);
    const mx = (x1 + x2) / 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(mx, y1);
    ctx.lineTo(mx, y2);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.setLineDash([]);
}

function drawNode(ctx, node, ox, oy, hovered) {
    const nx = node.x + ox;
    const ny = node.y + oy;
    const s = getScheme(node, hovered);
    const hot = hovered?.id === node.id;

    if (node.color === "future") {
        drawRR(ctx, nx - Q_SIZE / 2, ny - Q_SIZE / 2, Q_SIZE, Q_SIZE, 3,
            hot ? "#1a1030" : s.fill,
            hot ? C.PURPLE : s.stroke,
            hot ? 2 : 1, !hot);
        drawText(ctx, "?", nx, ny, hot ? C.PURPLE : s.tc, 18, "400");
    } else {
        drawRR(ctx, nx - NODE_W / 2, ny - NODE_H / 2, NODE_W, NODE_H, 3,
            s.fill, s.stroke, s.sw);
        drawText(ctx, node.label, nx, ny, s.tc, 9, hot ? "700" : "500");
    }
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function SkillTree() {
    const canvasRef = useRef(null);
    const parentRef = useRef(null);
    const oxRef = useRef(0);
    const oyRef = useRef(0);
    const scaleRef = useRef(1);          // zoom level
    const dragRef = useRef(false);
    const lastRef = useRef({x: 0, y: 0});
    const hoveredRef = useRef(null);
    const rafRef = useRef(null);

    const [hovered, setHovered] = useState(null);
    const [zoomed, setZoomed] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const parent = parentRef.current;
        const ctx = canvas.getContext("2d");
        const dpr = window.devicePixelRatio || 1;

        function resize() {
            const r = parent.getBoundingClientRect();
            canvas.width = r.width * dpr;
            canvas.height = r.height * dpr;
            canvas.style.width = r.width + "px";
            canvas.style.height = r.height + "px";
            ctx.scale(dpr, dpr);
        }

        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(parent);

        const W = () => canvas.width / dpr;
        const H = () => canvas.height / dpr;

        function draw() {
            const ox = oxRef.current;
            const oy = oyRef.current;
            const sc = scaleRef.current;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.save();
            // Apply zoom centered on canvas center
            ctx.translate(W() / 2, H() / 2);
            ctx.scale(sc, sc);
            ctx.translate(-W() / 2, -H() / 2);

            // subtle grid
            ctx.strokeStyle = "#ffffff06";
            ctx.lineWidth = 0.5;
            const gx = ((ox % 40) + 40) % 40;
            const gy = ((oy % 40) + 40) % 40;
            for (let x = gx; x < W(); x += 40) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, H());
                ctx.stroke();
            }
            for (let y = gy; y < H(); y += 40) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(W(), y);
                ctx.stroke();
            }

            // edges
            EDGES.forEach(([ai, bi]) => {
                const a = NODES[ai], b = NODES[bi];
                drawPCBLine(ctx,
                    a.x + ox + NODE_W / 2, a.y + oy,
                    b.x + ox - (b.color === "future" ? Q_SIZE / 2 : NODE_W / 2), b.y + oy,
                    getEdgeColor(a, b),
                    b.color === "future"
                );
            });

            // nodes
            NODES.forEach(n => drawNode(ctx, n, ox, oy, hoveredRef.current));
            ctx.restore();
        }

        function loop() {
            draw();
            rafRef.current = requestAnimationFrame(loop);
        }

        loop();

        function getHit(mx, my) {
            // Transform screen coords back to canvas space accounting for zoom
            const sc = scaleRef.current;
            const cw = W(), ch = H();
            const cx2 = (mx - cw / 2) / sc + cw / 2;
            const cy2 = (my - ch / 2) / sc + ch / 2;
            return NODES.find(n => {
                const nx = n.x + oxRef.current;
                const ny = n.y + oyRef.current;
                const hw = n.color === "future" ? Q_SIZE / 2 : NODE_W / 2;
                const hh = n.color === "future" ? Q_SIZE / 2 : NODE_H / 2;
                return cx2 >= nx - hw && cx2 <= nx + hw && cy2 >= ny - hh && cy2 <= ny + hh;
            }) ?? null;
        }

        function onMouseDown(e) {
            dragRef.current = true;
            lastRef.current = {x: e.clientX, y: e.clientY};
            canvas.style.cursor = "grabbing";
        }

        function onMouseMove(e) {
            const rect = canvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;

            if (dragRef.current) {
                oxRef.current += e.clientX - lastRef.current.x;
                oyRef.current += e.clientY - lastRef.current.y;
                lastRef.current = {x: e.clientX, y: e.clientY};
                return;
            }

            const hit = getHit(mx, my);
            if (hit?.id !== hoveredRef.current?.id) {
                hoveredRef.current = hit;
                setHovered(hit);
                canvas.style.cursor = hit ? "pointer" : "grab";
            }
        }

        function onMouseUp() {
            dragRef.current = false;
            canvas.style.cursor = "grab";
        }

        function onMouseLeave() {
            dragRef.current = false;
            hoveredRef.current = null;
            setHovered(null);
            canvas.style.cursor = "grab";
        }

        // Double-click to zoom in/out — toggles between 1x and 1.8x
        let zoomAnimRef = null;

        function animateZoom(from, to, duration = 300) {
            const start = performance.now();

            function tick(now) {
                const t = Math.min((now - start) / duration, 1);
                const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // ease in-out quad
                scaleRef.current = from + (to - from) * ease;
                if (t < 1) zoomAnimRef = requestAnimationFrame(tick);
            }

            if (zoomAnimRef) cancelAnimationFrame(zoomAnimRef);
            zoomAnimRef = requestAnimationFrame(tick);
        }

        function onDblClick() {
            const isZoomed = scaleRef.current > 1.1;
            animateZoom(scaleRef.current, isZoomed ? 1 : 1.8);
            setZoomed(!isZoomed);
        }

        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("mouseleave", onMouseLeave);
        canvas.addEventListener("dblclick", onDblClick);

        return () => {
            cancelAnimationFrame(rafRef.current);
            if (zoomAnimRef) cancelAnimationFrame(zoomAnimRef);
            ro.disconnect();
            canvas.removeEventListener("mousedown", onMouseDown);
            canvas.removeEventListener("mousemove", onMouseMove);
            canvas.removeEventListener("mouseup", onMouseUp);
            canvas.removeEventListener("mouseleave", onMouseLeave);
            canvas.removeEventListener("dblclick", onDblClick);
        };
    }, []);

    return (
        <div
            ref={parentRef}
            className="relative w-full overflow-hidden bg-[#0d1117]"
            style={{height: "120vh"}}
        >
            {/* ── Ambient cube background ── */}
            <div className="absolute inset-0 z-0">
                <SpatialCubesAmbient/>
            </div>

            {/* ── Skill tree canvas ── */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-10"
                style={{cursor: "grab"}}
            />

            {/*
                ── Gradient fades — top and bottom ─────────────────────────────
                These sit above the canvas (z-10) and fade the page background
                color (#0e2d33) into transparent, creating a "slope down" feel
                instead of a hard peek-through-a-hole edge. Same technique as
                the carousel topSvg/bottomSvg gradients on the homepage.
            ── */}
            <div
                className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
                style={{
                    height: "clamp(70px, 13vw, 200px)",
                    background: "linear-gradient(to bottom, #0e2d33 0%, transparent 100%)",
                }}
            />
            <div
                className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
                style={{
                    height: "clamp(70px, 13vw, 200px)",
                    background: "linear-gradient(to top, #0e2d33 0%, transparent 100%)",
                }}
            />

            {/* ── Hint label — top center so it's always visible ── */}
            <p className="absolute top-[clamp(80px,14vw,210px)] left-1/2 -translate-x-1/2 z-20 text-[11px] text-[#09BC8A] font-mono pointer-events-none select-none opacity-70 whitespace-nowrap">
                {zoomed ? "double-click to zoom out" : "drag to pan · double-click to zoom"}
            </p>

            {/*
                ── Hover info card — viewport-anchored ──────────────────────────

                WHY position: fixed?
                The skill tree canvas lives inside a section with a fixed height
                (600px). If the user scrolls down so the canvas is partially off
                screen, any child with position: absolute would scroll away with
                it — making the popup invisible exactly when the user needs it.

                position: fixed takes the element OUT of the normal document
                flow and pins it relative to the BROWSER VIEWPORT instead of
                its parent. So no matter how far the user has scrolled, this
                card always appears at the same spot on screen.

                bottom: 24px  — 24px from the bottom edge of the viewport
                left: 50%     — start at the horizontal center
                transform: translateX(-50%)  — shift left by half its own
                                               width so it's truly centered

                z-index: 50 — sits above everything else on the page including
                the nav, since we want it always readable.

                pointerEvents: none — the card is purely visual, never blocks
                clicks or hovers on the canvas behind it.
            ── */}
            <div
                style={{
                    position: "fixed",
                    bottom: "24px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 50,
                    width: "100%",
                    maxWidth: "560px",
                    padding: "0 16px",
                    opacity: hovered ? 1 : 0,
                    pointerEvents: "none",
                    transition: "opacity 0.25s ease",
                }}
            >
                <div className="rounded-xl bg-[#0e2d33]/95 border border-[#09BC8A22] p-4 shadow-lg backdrop-blur-sm">
                    {hovered && (
                        <>
                            <h3 className="text-base font-semibold text-[#e2f0ee] mb-1">
                                {hovered.title}
                            </h3>
                            <p className="text-xs leading-relaxed text-[#e2f0ee]/70 mb-3">
                                {hovered.desc}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {hovered.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="px-3 py-0.5 text-xs font-medium rounded-full bg-[#09BC8A] text-black"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

        </div>
    );
}