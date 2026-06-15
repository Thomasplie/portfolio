import {useEffect, useRef} from "react";

// ─── constants ───────────────────────────────────────────────────────────────
const TEAL = "#3ECFB2";
const COLORS = [TEAL, "#ffffff", "#5af5d8", "#0a7a62", "#a0fff0"];
const CUBE_COUNT = 18;
const FOV = 400;

// Unit cube: 8 corners, 6 faces (each face = 4 corner indices, CCW winding)
const UNIT_CORNERS = [
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
];
const FACES = [
    [0, 3, 2, 1], // back   (CCW from outside)
    [4, 5, 6, 7], // front
    [0, 1, 5, 4], // bottom
    [3, 7, 6, 2], // top
    [1, 2, 6, 5], // right
    [0, 4, 7, 3], // left
];

// ─── math helpers ────────────────────────────────────────────────────────────
function rotatePoint([x, y, z], rx, ry, rz) {
    // X axis
    let y1 = y * Math.cos(rx) - z * Math.sin(rx);
    let z1 = y * Math.sin(rx) + z * Math.cos(rx);
    // Y axis
    let x2 = x * Math.cos(ry) + z1 * Math.sin(ry);
    let z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);
    // Z axis
    let x3 = x2 * Math.cos(rz) - y1 * Math.sin(rz);
    let y3 = x2 * Math.sin(rz) + y1 * Math.cos(rz);
    return [x3, y3, z2];
}

// Canvas Y is flipped vs math convention, so a face is front-facing when
// the 2-D cross product is NEGATIVE (clockwise in screen space = toward us).
function isFrontFacing(p) {
    const ax = p[1][0] - p[0][0], ay = p[1][1] - p[0][1];
    const bx = p[2][0] - p[0][0], by = p[2][1] - p[0][1];
    return (ax * by - ay * bx) < 0;
}

// ─── cube factories ──────────────────────────────────────────────────────────
// Distant background cubes — tiny, very faint, glacially slow
function makeDistantCube(W, H, dpr) {
    const size = (4 + Math.random() * 10) * dpr;
    const alpha = 0.06 + Math.random() * 0.10;
    return {
        x: Math.random() * W,
        y: Math.random() * H,
        size,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.04,
        vy: (Math.random() - 0.5) * 0.03,
        vrx: (Math.random() - 0.5) * 0.002,
        vry: (Math.random() - 0.5) * 0.002,
        vrz: (Math.random() - 0.5) * 0.001,
        alpha,
        baseAlpha: alpha,
        color: TEAL,
    };
}

function makeCube(W, H, dpr) {
    const size = (20 + Math.random() * 45) * dpr;
    const alpha = 0.45 + Math.random() * 0.55;
    return {
        x: Math.random() * W,
        y: Math.random() * H,
        size,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.12,
        vrx: (Math.random() - 0.5) * 0.006,
        vry: (Math.random() - 0.5) * 0.008,
        vrz: (Math.random() - 0.5) * 0.004,
        alpha,
        baseAlpha: alpha,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
}

// ─── project cube to screen ──────────────────────────────────────────────────
function projectCube(cube) {
    const {x, y, size, rotX, rotY, rotZ} = cube;

    // 3-D rotated corners (kept for depth sorting)
    const corners3d = UNIT_CORNERS.map((c) =>
        rotatePoint(c.map((v) => v * size), rotX, rotY, rotZ)
    );

    // Perspective project to 2-D
    const pts2d = corners3d.map(([rx, ry, rz]) => {
        const z = rz + FOV;
        return [x + rx * (FOV / z), y + ry * (FOV / z)];
    });

    return {corners3d, pts2d};
}

// ─── draw one cube ───────────────────────────────────────────────────────────
function drawCube(ctx, cube, dpr) {
    const {alpha, color} = cube;
    const {corners3d, pts2d} = projectCube(cube);

    // Sort faces back → front by average 3-D Z (painter's algorithm)
    const sorted = FACES.map((face) => {
        const avgZ = face.reduce((s, i) => s + corners3d[i][2], 0) / face.length;
        return {face, avgZ};
    }).sort((a, b) => b.avgZ - a.avgZ);

    sorted.forEach(({face}) => {
        const p = face.map((i) => pts2d[i]);

        // Backface cull: skip faces pointing away from the camera
        if (!isFrontFacing(p)) return;

        ctx.beginPath();
        ctx.moveTo(p[0][0], p[0][1]);
        for (let i = 1; i < p.length; i++) ctx.lineTo(p[i][0], p[i][1]);
        ctx.closePath();

        const fillA = Math.floor(alpha * 0.15 * 255).toString(16).padStart(2, "0");
        ctx.fillStyle = color + fillA;
        ctx.fill();

        const edgeA = Math.floor(alpha * 255).toString(16).padStart(2, "0");
        ctx.strokeStyle = color + edgeA;
        ctx.lineWidth = 0.9 * dpr;
        ctx.stroke();
    });
}

// ─── component ───────────────────────────────────────────────────────────────
// SpatialCubes renders a full-size canvas. It expects to be placed inside a
// `position: relative` parent (HeaderBanner's <section> already is).
// Mouse tracking is done on the SECTION element via the `sectionRef` prop so
// the z-10 text layer doesn't block events.
export default function SpatialCubes({sectionRef}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const section = sectionRef?.current ?? canvas.parentElement;
        const ctx = canvas.getContext("2d");
        const dpr = window.devicePixelRatio || 1;

        let rafId;
        let t = 0;
        let mx = -9999;
        let my = -9999;

        // ── resize ──────────────────────────────────────────────────────────
        function resize() {
            const rect = section.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
        }

        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(section);

        const W = () => canvas.width;
        const H = () => canvas.height;

        // ── spawn cubes ─────────────────────────────────────────────────────
        // Distant layer drawn first so they sit behind everything
        const distantCubes = Array.from({length: 30}, () =>
            makeDistantCube(W(), H(), dpr)
        );
        const cubes = Array.from({length: CUBE_COUNT}, () =>
            makeCube(W(), H(), dpr)
        );

        const cursorCube = {
            x: 0, y: 0, size: 22 * dpr,
            rotX: 0, rotY: 0, rotZ: 0,
            vx: 0, vy: 0,
            vrx: 0.02, vry: 0.03, vrz: 0.015,
            alpha: 0.95, baseAlpha: 0.95,
            color: TEAL,
        };

        // ── mouse — listen on the SECTION so z-10 div doesn't block ────────
        function onMouseMove(e) {
            const rect = section.getBoundingClientRect();
            mx = (e.clientX - rect.left) * dpr;
            my = (e.clientY - rect.top) * dpr;
        }

        function onMouseLeave() {
            mx = -9999;
            my = -9999;
        }

        section.addEventListener("mousemove", onMouseMove);
        section.addEventListener("mouseleave", onMouseLeave);

        // ── animation loop ──────────────────────────────────────────────────
        function loop() {
            t += 0.016;

            // Solid fill each frame — clears trails, keeps dark background
            ctx.fillStyle = "#171717"; // matches bg-neutral-900
            ctx.fillRect(0, 0, W(), H());

            // Draw distant background cubes first (behind everything)
            distantCubes.forEach((cube) => {
                cube.x += cube.vx;
                cube.y += cube.vy;
                cube.rotX += cube.vrx;
                cube.rotY += cube.vry;
                cube.rotZ += cube.vrz;

                const pad = 40 * dpr;
                if (cube.x < -pad) cube.x = W() + pad;
                if (cube.x > W() + pad) cube.x = -pad;
                if (cube.y < -pad) cube.y = H() + pad;
                if (cube.y > H() + pad) cube.y = -pad;

                // Very slow alpha breathe
                cube.alpha = cube.baseAlpha * (0.6 + 0.4 * Math.sin(t * 0.3 + cube.baseAlpha * 20));

                drawCube(ctx, cube, dpr);
            });

            cubes.forEach((cube) => {
                // Gentle nudge from cursor — falls off with distance
                const dx = mx - cube.x;
                const dy = my - cube.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const radius = 160 * dpr;
                if (dist < radius && dist > 0) {
                    const strength = (1 - dist / radius) * 0.18; // very soft
                    cube.vx -= (dx / dist) * strength;
                    cube.vy -= (dy / dist) * strength;
                }

                cube.x += cube.vx;
                cube.y += cube.vy;
                cube.rotX += cube.vrx;
                cube.rotY += cube.vry;
                cube.rotZ += cube.vrz;
                cube.vx *= 0.94; // heavier damping so they settle quickly
                cube.vy *= 0.94;

                // Wrap at edges
                const pad = 80 * dpr;
                if (cube.x < -pad) cube.x = W() + pad;
                if (cube.x > W() + pad) cube.x = -pad;
                if (cube.y < -pad) cube.y = H() + pad;
                if (cube.y > H() + pad) cube.y = -pad;

                cube.alpha = cube.baseAlpha * (0.7 + 0.3 * Math.sin(t * 0.8 + cube.baseAlpha * 10));

                drawCube(ctx, cube, dpr);
            });

            // Cursor cube
            if (mx > -100) {
                cursorCube.x = mx;
                cursorCube.y = my;
                cursorCube.rotX += cursorCube.vrx;
                cursorCube.rotY += cursorCube.vry;
                cursorCube.rotZ += cursorCube.vrz;
                cursorCube.size = (22 + 6 * Math.sin(t * 3)) * dpr;
                drawCube(ctx, cursorCube, dpr);
            }

            rafId = requestAnimationFrame(loop);
        }

        loop();

        return () => {
            cancelAnimationFrame(rafId);
            ro.disconnect();
            section.removeEventListener("mousemove", onMouseMove);
            section.removeEventListener("mouseleave", onMouseLeave);
        };
    }, [sectionRef]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                display: "block",
                pointerEvents: "none", // let section handle all mouse events
            }}
        />
    );
}