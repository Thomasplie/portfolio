import {useState} from "react";
import {Link} from "react-router";
import HeaderBanner from "../../Components/HeaderBanner.jsx";
import BlockEdgeDecoration from "../../Components/BlockEdgeDecoration.jsx";
import SpatialCubesAmbient from "../../Components/SpatialCubesAmbient.jsx";
import projects from "../../data/projects.js";

const PROJECTS_PER_PAGE = 3;

// ─── Pagination bar ───────────────────────────────────────────────────────────
function PaginationBar({currentPage, totalPages, onPageChange}) {
    return (
        <div className="flex items-center justify-center gap-2 py-8">
            {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`
                        w-10 h-10 text-sm font-semibold border transition-all duration-200
                        ${currentPage === page
                        ? "bg-[#09BC8A] text-black border-[#09BC8A]"
                        : "bg-transparent text-[#e2f0ee] border-[#09BC8A44] hover:border-[#09BC8A] hover:text-[#09BC8A]"
                    }
                    `}
                    style={{borderRadius: "2px"}}
                    aria-label={`Go to page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                >
                    {page}
                </button>
            ))}
            {totalPages > 4 && (
                <span className="text-[#e2f0ee]/50 text-sm pl-2">... see more</span>
            )}
        </div>
    );
}

// ─── Jagged hole with ambient cubes + project image ──────────────────────────
function ProjectHole({image, title}) {
    return (
        <div className="relative flex-shrink-0 w-[380px] h-[300px]">

            {/* Outer jagged SVG mask shape — this is the visible "hole" */}
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 380 300"
                preserveAspectRatio="none"
                style={{zIndex: 0}}
            >
                {/* The jagged pixel shape filled with neutral-900 */}
                <polygon
                    points="
                        0,24   15,24  15,0   46,0   46,15
                        106,15 106,0  167,0  167,24
                        213,24 213,0  273,0  273,15
                        334,15 334,0  365,0  365,24 380,24
                        380,276 365,276 365,300 334,300 334,285
                        273,285 273,300 213,300 213,276
                        167,276 167,300 106,300 106,285
                        46,285  46,300  15,300  15,276
                        0,276
                    "
                    fill="#171717"
                />
            </svg>

            {/* Canvas lives clipped inside the same shape using clip-path on a child */}
            <div
                className="absolute inset-0 overflow-hidden"
                style={{
                    clipPath: `polygon(
                        0px 24px,   15px 24px,  15px 0px,   46px 0px,   46px 15px,
                        106px 15px, 106px 0px,  167px 0px,  167px 24px,
                        213px 24px, 213px 0px,  273px 0px,  273px 15px,
                        334px 15px, 334px 0px,  365px 0px,  365px 24px, 380px 24px,
                        380px 276px, 365px 276px, 365px 300px, 334px 300px, 334px 285px,
                        273px 285px, 273px 300px, 213px 300px, 213px 276px,
                        167px 276px, 167px 300px, 106px 300px, 106px 285px,
                        46px 285px,  46px 300px,  15px 300px,  15px 276px,
                        0px 276px
                    )`,
                    zIndex: 1,
                }}
            >
                {/* Dark bg with ambient cubes */}
                <div className="absolute inset-0 bg-neutral-900">
                    <SpatialCubesAmbient/>
                </div>

                {/* Project image on top */}
                {image && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 p-8">
                        <img
                            src={image}
                            alt={`${title} project screenshot`}
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Single project row ───────────────────────────────────────────────────────
function ProjectRow({project, index}) {
    const isEven = index % 2 === 0;
    const accentColor = project.type === "website" ? "#F17F29" : "#09BC8A";

    return (
        <div className="py-16 px-6">
            <Link
                to={project.link ?? "#"}
                className={`group flex items-center gap-16 ${isEven ? "flex-row" : "flex-row-reverse"}`}
                aria-label={`View ${project.title} project`}
            >
                {/* ── Left/Right: image hole ── */}
                <ProjectHole image={project.image} title={project.title}/>

                {/* ── Right/Left: text ── */}
                <div className="flex-1 min-w-0">
                    <span
                        className="inline-block text-[10px] font-bold tracking-widest uppercase mb-3 px-3 py-1"
                        style={{color: accentColor, border: `1px solid ${accentColor}44`, borderRadius: "2px"}}
                    >
                        {project.type}
                    </span>

                    <h2 className="text-2xl md:text-3xl font-bold text-[#e2f0ee] mb-3 group-hover:text-[#09BC8A] transition-colors duration-200">
                        {project.title}
                    </h2>

                    <p className="text-[#e2f0ee]/70 leading-relaxed mb-5 text-sm md:text-base">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                        {project.tags.map((tag) => (
                            <span key={tag}
                                  className="px-3 py-1 text-xs font-medium rounded-sm bg-[#09BC8A] text-black">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-[#09BC8A] hover:underline"
                            onClick={(e) => e.stopPropagation()}
                        >
                            View on GitHub →
                        </a>
                    )}
                </div>
            </Link>
        </div>
    );
}

// ─── Main page ────────────────────────────────────────────────────────────────
function ProjectsPage() {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    const visibleProjects = projects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

    function handlePageChange(page) {
        setCurrentPage(page);
        window.scrollTo({top: 0, behavior: "smooth"});
    }

    return (
        <div className="bg-[#0e2d33]">

            {/* ── Hero — reuse HeaderBanner with overrideText ── */}
            <HeaderBanner
                overrideText={
                    <div>
                        <p className="mb-4 text-sm md:text-base font-medium text-[#09BC8A]">My Work</p>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">Projects.</h1>
                        <p className="mt-4 text-lg md:text-2xl">Things I've built — and am still building.</p>
                    </div>
                }
            />

            {/* ── Content section — same pattern as Homepage ── */}
            <section className="relative w-full py-24">

                {/* Top transition — dark teal biting into page from top */}
                <BlockEdgeDecoration
                    color="#124559"
                    position="top"
                    height="clamp(70px, 13vw, 200px)"
                />

                {/* Top pagination */}
                <PaginationBar
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />

                {/* Project rows */}
                <div className="mx-auto max-w-5xl px-6 divide-y divide-[#124559]">
                    {visibleProjects.map((project, index) => (
                        <ProjectRow
                            key={project.id}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>

                {/* Bottom pagination */}
                <PaginationBar
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />

                {/* Bottom transition — flipped so it mirrors the top */}
                <BlockEdgeDecoration
                    color="#124559"
                    position="bottom"
                    flipX="true"
                    height="clamp(70px, 12vw, 200px)"
                />

            </section>

        </div>
    );
}

export default ProjectsPage;