import {useEffect, useRef} from "react";

// ─── Stripped version of SpatialCubes ────────────────────────────────────────
// Only renders the distant background cubes — no foreground cubes, no mouse
// tracking, no cursor cube. Designed for small contained areas like the
// project image holes on the projects page!

const TEAL = "#3ECFB2";
const FOV = 400;

const UNIT_CORNERS = [
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
];
const FACES = [
    [0, 3, 2, 1],
    [4, 5, 6, 7],
    [0, 1, 5, 4],
    [3, 7, 6, 2],
    [1, 2, 6, 5],
    [0, 4, 7, 3],
];

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

function makeDistantCube(W, H, dpr) {
    const size = (3 + Math.random() * 8) * dpr; // smaller than header version
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
    };
}

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

function drawCube(ctx, cube, dpr) {
    const {alpha} = cube;
    const {corners3d, pts2d} = projectCube(cube);

    const sorted = FACES.map((face) => {
        const avgZ = face.reduce((s, i) => s + corners3d[i][2], 0) / face.length;
        return {face, avgZ};
    }).sort((a, b) => b.avgZ - a.avgZ);

    sorted.forEach(({face}) => {
        const p = face.map((i) => pts2d[i]);
        if (!isFrontFacing(p)) return;

        ctx.beginPath();
        ctx.moveTo(p[0][0], p[0][1]);
        for (let i = 1; i < p.length; i++) ctx.lineTo(p[i][0], p[i][1]);
        ctx.closePath();

        const fillA = Math.floor(alpha * 0.15 * 255).toString(16).padStart(2, "0");
        ctx.fillStyle = TEAL + fillA;
        ctx.fill();

        const edgeA = Math.floor(alpha * 255).toString(16).padStart(2, "0");
        ctx.strokeStyle = TEAL + edgeA;
        ctx.lineWidth = 0.9 * dpr;
        ctx.stroke();
    });
}

export default function SpatialCubesAmbient() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const parent = canvas.parentElement;
        const ctx = canvas.getContext("2d");
        const dpr = window.devicePixelRatio || 1;

        let rafId;
        let t = 0;

        function resize() {
            const rect = parent.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
        }

        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(parent);

        const W = () => canvas.width;
        const H = () => canvas.height;

        const cubes = Array.from({length: 30}, () =>
            makeDistantCube(W(), H(), dpr)
        );

        function loop() {
            t += 0.016;

            ctx.fillStyle = "#171717";
            ctx.fillRect(0, 0, W(), H());

            cubes.forEach((cube) => {
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

                drawCube(ctx, cube, dpr);
            });

            rafId = requestAnimationFrame(loop);
        }

        loop();

        return () => {
            cancelAnimationFrame(rafId);
            ro.disconnect();
        };
    }, []);

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
