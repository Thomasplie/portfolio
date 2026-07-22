import {useEffect, useRef} from "react";

// Hello developer! This file has been made by me and claude. If you'd think i would
// do all of this math by myself i am truly flattered but incase you are here to check my skill, im sorry to dissapoint
// this was a combined effort. Nevertheless, debugging this was a pain and so if you wish to reuse this be my guest!
// The comments in the code should guide you well enough to be able to fine-tune this to your liking. Happy coding!

// constants
const TEAL = "#3ECFB2";
const COLORS = [TEAL, "#ffffff", "#5af5d8", "#0a7a62", "#a0fff0"];
const CUBE_COUNT = 18;
const FOV = 400;
const MAX_IMG_CUBES = 5; // cap, never texture more than 5 cubes

// Front face index in FACES array (index 1 = [4,5,6,7])
const FRONT_FACE_INDEX = 1;

const UNIT_CORNERS = [
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
];
const FACES = [
    [0, 3, 2, 1], // back
    [4, 5, 6, 7], // front, image goes here
    [0, 1, 5, 4], // bottom
    [3, 7, 6, 2], // top
    [1, 2, 6, 5], // right
    [0, 4, 7, 3], // left
];

// math helpers
function rotatePoint([x, y, z], rx, ry, rz) {
    let y1 = y * Math.cos(rx) - z * Math.sin(rx);
    let z1 = y * Math.sin(rx) + z * Math.cos(rx);
    let x2 = x * Math.cos(ry) + z1 * Math.sin(ry);
    let z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);
    let x3 = x2 * Math.cos(rz) - y1 * Math.sin(rz);
    let y3 = x2 * Math.sin(rz) + y1 * Math.cos(rz);
    return [x3, y3, z2];
}

function isFrontFacing(p) {
    const ax = p[1][0] - p[0][0], ay = p[1][1] - p[0][1];
    const bx = p[2][0] - p[0][0], by = p[2][1] - p[0][1];
    return (ax * by - ay * bx) < 0;
}

// cube factories
function makeDistantCube(W, H, dpr) {
    const size = (4 + Math.random() * 10) * dpr;
    const alpha = 0.06 + Math.random() * 0.10;
    return {
        x: Math.random() * W, y: Math.random() * H, size,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.04,
        vy: (Math.random() - 0.5) * 0.03,
        vrx: (Math.random() - 0.5) * 0.002,
        vry: (Math.random() - 0.5) * 0.002,
        vrz: (Math.random() - 0.5) * 0.001,
        alpha, baseAlpha: alpha, color: TEAL,
        image: null, // distant cubes never carry images
    };
}

function makeCube(W, H, dpr, image = null) {
    const size = (20 + Math.random() * 45) * dpr;
    const alpha = 0.45 + Math.random() * 0.55;
    return {
        x: Math.random() * W, y: Math.random() * H, size,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.12,
        vrx: (Math.random() - 0.5) * 0.006,
        vry: (Math.random() - 0.5) * 0.008,
        vrz: (Math.random() - 0.5) * 0.004,
        alpha, baseAlpha: alpha,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        image, // HTMLImageElement or null
    };
}

// project cube to screen
function projectCube(cube) {
    const {x, y, size, rotX, rotY, rotZ} = cube;
    const corners3d = UNIT_CORNERS.map((c) =>
        rotatePoint(c.map((v) => v * size), rotX, rotY, rotZ)
    );
    const pts2d = corners3d.map(([rx, ry, rz]) => {
        const z = rz + FOV;
        return [x + rx * (FOV / z), y + ry * (FOV / z)];
    });
    return {corners3d, pts2d};
}

// draw a textured face split into two triangles
// A projected cube face is a general quadrilateral, not a parallelogram.
// Splitting into two triangles and mapping half the image onto each ensures
// all 4 corners are covered with no gaps.
//
// Triangle 1: p[0], p[1], p[3], top-left half of image
// Triangle 2: p[1], p[2], p[3], bottom-right half of image
function drawTexturedTriangle(ctx, p0, p1, p2, uv0, uv1, uv2, img) {
    const w = img.naturalWidth;
    const h = img.naturalHeight;

    const x0 = p0[0], y0 = p0[1];
    const x1 = p1[0], y1 = p1[1];
    const x2 = p2[0], y2 = p2[1];

    const u0 = uv0[0] * w, v0 = uv0[1] * h;
    const u1 = uv1[0] * w, v1 = uv1[1] * h;
    const u2 = uv2[0] * w, v2 = uv2[1] * h;

    const det = (u1 - u0) * (v2 - v0) - (u2 - u0) * (v1 - v0);
    if (Math.abs(det) < 0.0001) return;

    const a = ((x1 - x0) * (v2 - v0) - (x2 - x0) * (v1 - v0)) / det;
    const b = ((x2 - x0) * (u1 - u0) - (x1 - x0) * (u2 - u0)) / det;
    const c = ((y1 - y0) * (v2 - v0) - (y2 - y0) * (v1 - v0)) / det;
    const d = ((y2 - y0) * (u1 - u0) - (y1 - y0) * (u2 - u0)) / det;
    const e = x0 - a * u0 - b * v0;
    const f = y0 - c * u0 - d * v0;

    ctx.save();

    ctx.beginPath();
    ctx.moveTo(p0[0], p0[1]);
    ctx.lineTo(p1[0], p1[1]);
    ctx.lineTo(p2[0], p2[1]);
    ctx.closePath();
    ctx.clip();

    ctx.transform(a, c, b, d, e, f);
    ctx.drawImage(img, 0, 0);

    ctx.restore();
}

function drawTexturedFace(ctx, p, img, darkOverlay = false) {
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const uv = [[0, 0], [1, 0], [1, 1], [0, 1]];

    drawTexturedTriangle(ctx, p[0], p[1], p[3], uv[0], uv[1], uv[3], img);
    drawTexturedTriangle(ctx, p[1], p[2], p[3], uv[1], uv[2], uv[3], img);

    if (darkOverlay) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(p[0][0], p[0][1]);
        for (let i = 1; i < p.length; i++) ctx.lineTo(p[i][0], p[i][1]);
        ctx.closePath();
        ctx.clip();
        ctx.fillStyle = "rgba(0,0,0,0.55)";
        ctx.fill();
        ctx.restore();
    }
}

// draw one cube, returns true if anything was actually drawn, false if the
// whole cube fell outside the visible canvas area and nothing was rendered
function drawCube(ctx, cube, dpr, canvasW, canvasH) {
    const {alpha, color, image} = cube;
    const {corners3d, pts2d} = projectCube(cube);

    // Bounding box check first, using all 8 projected corners regardless of
    // which faces end up front facing. If every corner falls outside the
    // canvas plus a small margin, this cube is not visible at all right now
    // and we skip the more expensive per face drawing work entirely. This is
    // the literal "only render blocks visible within the header" approach.
    const margin = 40 * dpr;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const [px, py] of pts2d) {
        if (px < minX) minX = px;
        if (px > maxX) maxX = px;
        if (py < minY) minY = py;
        if (py > maxY) maxY = py;
    }
    const isVisible =
        maxX >= -margin && minX <= canvasW + margin &&
        maxY >= -margin && minY <= canvasH + margin;

    if (!isVisible) return false;

    const sorted = FACES.map((face, faceIndex) => {
        const avgZ = face.reduce((s, i) => s + corners3d[i][2], 0) / face.length;
        return {face, faceIndex, avgZ};
    }).sort((a, b) => b.avgZ - a.avgZ);

    sorted.forEach(({face, faceIndex}) => {
        const p = face.map((i) => pts2d[i]);
        if (!isFrontFacing(p)) return;

        if (image) {
            drawTexturedFace(ctx, p, image, true);

            const edgeA = Math.floor(alpha * 180).toString(16).padStart(2, "0");
            ctx.beginPath();
            ctx.moveTo(p[0][0], p[0][1]);
            for (let i = 1; i < p.length; i++) ctx.lineTo(p[i][0], p[i][1]);
            ctx.closePath();
            ctx.strokeStyle = TEAL + edgeA;
            ctx.lineWidth = 0.9 * dpr;
            ctx.stroke();

        } else {
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
        }
    });

    return true;
}

// component
// Props:
//   sectionRef, ref to the parent section for mouse tracking and resize
//   images, optional string array of image URLs (max 5 used)
//           pass multiple for ProjectsPage, one for ProjectDetail, none for Homepage
export default function SpatialCubes({sectionRef, images = []}) {
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

        // resize
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

        // preload images, cap at MAX_IMG_CUBES, preload all before the loop starts drawing them
        const imageSlots = images.slice(0, MAX_IMG_CUBES);
        const loadedImgs = imageSlots.map((src) => {
            const img = new window.Image();
            img.src = src;
            return img; // canvas checks img.complete each frame, no blocking
        });

        // count tiers, simple and easy to verify instead of the ratio math
        // from before, which kept scaling the wrong direction. These widths
        // match the mobile, tablet, desktop breakpoints already used
        // elsewhere in the project.
        const rect = section.getBoundingClientRect();
        const isMobile = rect.width < 640;
        const isTablet = rect.width >= 640 && rect.width < 1024;

        const distantCount = isMobile ? 45 : isTablet ? 35 : 30;
        const foregroundCount = isMobile ? 24 : isTablet ? 20 : CUBE_COUNT;

        // spawn cubes
        const distantCubes = Array.from({length: distantCount}, () =>
            makeDistantCube(W(), H(), dpr)
        );

        // first N foreground cubes get an image, the rest are wireframe
        const cubes = Array.from({length: foregroundCount}, (_, i) =>
            makeCube(W(), H(), dpr, loadedImgs[i] ?? null)
        );

        const cursorCube = {
            x: 0, y: 0, size: 22 * dpr,
            rotX: 0, rotY: 0, rotZ: 0,
            vx: 0, vy: 0,
            vrx: 0.02, vry: 0.03, vrz: 0.015,
            alpha: 0.95, baseAlpha: 0.95,
            color: TEAL, image: null,
        };

        // shared helper, converts a client x and y coordinate into canvas space
        // used by both mouse and touch handlers so the math only lives in one place
        function updatePointer(clientX, clientY) {
            const rect = section.getBoundingClientRect();
            mx = (clientX - rect.left) * dpr;
            my = (clientY - rect.top) * dpr;
        }

        function clearPointer() {
            mx = -9999;
            my = -9999;
        }

        // mouse events, desktop
        function onMouseMove(e) {
            updatePointer(e.clientX, e.clientY);
        }

        function onMouseLeave() {
            clearPointer();
        }

        // touch events, mobile and tablet
        // passive true keeps the listener from blocking normal page scrolling,
        // since we never call preventDefault the finger can still scroll the
        // page as usual while also nudging the cubes underneath it
        function onTouchStart(e) {
            if (e.touches.length === 0) return;
            updatePointer(e.touches[0].clientX, e.touches[0].clientY);
        }

        function onTouchMove(e) {
            if (e.touches.length === 0) return;
            updatePointer(e.touches[0].clientX, e.touches[0].clientY);
        }

        function onTouchEnd() {
            clearPointer();
        }

        section.addEventListener("mousemove", onMouseMove);
        section.addEventListener("mouseleave", onMouseLeave);
        section.addEventListener("touchstart", onTouchStart, {passive: true});
        section.addEventListener("touchmove", onTouchMove, {passive: true});
        section.addEventListener("touchend", onTouchEnd, {passive: true});
        section.addEventListener("touchcancel", onTouchEnd, {passive: true});

        // animation loop
        function loop() {
            t += 0.016;

            ctx.fillStyle = "#171717";
            ctx.fillRect(0, 0, W(), H());

            // distant background cubes first
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

                cube.alpha = cube.baseAlpha * (0.6 + 0.4 * Math.sin(t * 0.3 + cube.baseAlpha * 20));
                drawCube(ctx, cube, dpr, W(), H());
            });

            // foreground cubes
            cubes.forEach((cube) => {
                const dx = mx - cube.x;
                const dy = my - cube.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const radius = 160 * dpr;
                if (dist < radius && dist > 0) {
                    const strength = (1 - dist / radius) * 0.18;
                    cube.vx -= (dx / dist) * strength;
                    cube.vy -= (dy / dist) * strength;
                }

                cube.x += cube.vx;
                cube.y += cube.vy;
                cube.rotX += cube.vrx;
                cube.rotY += cube.vry;
                cube.rotZ += cube.vrz;
                cube.vx *= 0.94;
                cube.vy *= 0.94;

                const pad = 80 * dpr;
                if (cube.x < -pad) cube.x = W() + pad;
                if (cube.x > W() + pad) cube.x = -pad;
                if (cube.y < -pad) cube.y = H() + pad;
                if (cube.y > H() + pad) cube.y = -pad;

                cube.alpha = cube.baseAlpha * (0.7 + 0.3 * Math.sin(t * 0.8 + cube.baseAlpha * 10));
                drawCube(ctx, cube, dpr, W(), H());
            });

            // cursor cube, always wireframe, never textured
            if (mx > -100) {
                cursorCube.x = mx;
                cursorCube.y = my;
                cursorCube.rotX += cursorCube.vrx;
                cursorCube.rotY += cursorCube.vry;
                cursorCube.rotZ += cursorCube.vrz;
                cursorCube.size = (22 + 6 * Math.sin(t * 3)) * dpr;
                drawCube(ctx, cursorCube, dpr, W(), H());
            }

            rafId = requestAnimationFrame(loop);
        }

        loop();

        return () => {
            cancelAnimationFrame(rafId);
            ro.disconnect();
            section.removeEventListener("mousemove", onMouseMove);
            section.removeEventListener("mouseleave", onMouseLeave);
            section.removeEventListener("touchstart", onTouchStart);
            section.removeEventListener("touchmove", onTouchMove);
            section.removeEventListener("touchend", onTouchEnd);
            section.removeEventListener("touchcancel", onTouchEnd);
        };
    }, [sectionRef, images]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                display: "block",
                pointerEvents: "none",
            }}
        />
    );
}