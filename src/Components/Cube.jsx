function Cube() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-100">
            <svg
                width="220"
                height="220"
                viewBox="0 0 220 220"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Simple cube"
            >
                {/* Top face */}
                <polygon
                    points="110,40 170,75 110,110 50,75"
                    fill="#d1d5db"
                    stroke="#111827"
                    strokeWidth="2"
                />

                {/* Left face */}
                <polygon
                    points="50,75 110,110 110,180 50,145"
                    fill="#9ca3af"
                    stroke="#111827"
                    strokeWidth="2"
                />

                {/* Right face */}
                <polygon
                    points="110,110 170,75 170,145 110,180"
                    fill="#6b7280"
                    stroke="#111827"
                    strokeWidth="2"
                />
            </svg>
        </div>
    );
}

export default Cube;