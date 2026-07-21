import {useParams, Link} from "react-router";
import HeaderBanner from "../../Components/HeaderBanner.jsx";
import BlockEdgeDecoration from "../../Components/BlockEdgeDecoration.jsx";
import projects from "../../data/projects.js";

// Jagged hole image
function ProjectImage({src, alt}) {
    return (
        <div className="relative flex-shrink-0 w-[260px] h-[320px]">
            <div
                className="absolute inset-0 bg-neutral-900"
                style={{clipPath: jaggedClip}}
            />
            <img
                src={src}
                alt={alt}
                className="absolute inset-0 w-full h-full object-cover"
                style={{clipPath: jaggedClip}}
            />
        </div>
    );
}

const jaggedClip = `polygon(
    0% 8%,    3.9% 8%,  3.9% 0%,  12.1% 0%,  12.1% 5%,
    27.9% 5%, 27.9% 0%, 43.9% 0%, 43.9% 8%,
    56.1% 8%, 56.1% 0%, 71.9% 0%, 71.9% 5%,
    87.9% 5%, 87.9% 0%, 96.1% 0%, 96.1% 8%, 100% 8%,
    100% 92%, 96.1% 92%, 96.1% 100%, 87.9% 100%, 87.9% 95%,
    71.9% 95%, 71.9% 100%, 56.1% 100%, 56.1% 92%,
    43.9% 92%, 43.9% 100%, 27.9% 100%, 27.9% 95%,
    12.1% 95%, 12.1% 100%, 3.9% 100%, 3.9% 92%,
    0% 92%
)`;

function ProjectDetail() {
    const {slug} = useParams();
    const project = projects.find((p) => p.slug === slug);

    // Not found
    if (!project) {
        return (
            <div className="min-h-screen bg-[#0e2d33] flex flex-col items-center justify-center gap-4">
                <p className="text-[#e2f0ee] text-2xl font-semibold">Project not found.</p>
                <Link to="/my-projects" className="text-[#09BC8A] hover:underline text-sm">
                    ← Back to projects
                </Link>
            </div>
        );
    }

    const accentColor = project.type === "game" ? "#F17F29" : "#09BC8A";

    return (
        <div className="bg-[#0e2d33]">

            <HeaderBanner
                images={Array(4).fill(project.image)}
                overrideText={
                    <div>
                        <p className="mb-4 text-sm md:text-base font-medium" style={{color: accentColor}}>
                            {project.type}
                        </p>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                            {project.title}
                        </h1>
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 text-xs font-medium rounded-sm text-black"
                                    style={{background: accentColor}}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                }
            />

            {/* About the project */}
            <section className="relative w-full py-48">

                <BlockEdgeDecoration
                    color="#124559"
                    position="top"
                    flipX="true"
                    height="clamp(70px, 13vw, 200px)"
                />

                <div className="mx-auto max-w-5xl px-6 flex items-start gap-16">

                    <div className="flex-1">

                        <div className="flex flex-wrap gap-6 mb-8">
                            {project.role && (
                                <div>
                                    <p className="text-[9px] font-bold tracking-widest uppercase mb-1"
                                       style={{color: accentColor}}>Role</p>
                                    <p className="text-[#e2f0ee] text-sm font-medium">{project.role}</p>
                                </div>
                            )}
                            {project.teamSize && (
                                <div>
                                    <p className="text-[9px] font-bold tracking-widest uppercase mb-1"
                                       style={{color: accentColor}}>Team</p>
                                    <p className="text-[#e2f0ee] text-sm font-medium">{project.teamSize} people</p>
                                </div>
                            )}
                            <div>
                                <p className="text-[9px] font-bold tracking-widest uppercase mb-1"
                                   style={{color: accentColor}}>Type</p>
                                <p className="text-[#e2f0ee] text-sm font-medium capitalize">{project.type}</p>
                            </div>
                        </div>

                        {/* Long description */}
                        {project.longDescription?.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-[#e2f0ee] mb-3">
                                    About the project
                                </h2>
                                {project.longDescription.map((para, i) => (
                                    <p key={i} className="text-[#e2f0ee]/70 leading-relaxed mb-3">
                                        {para}
                                    </p>
                                ))}
                            </div>
                        )}

                        {/* Contribution */}
                        {project.contribution?.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold text-[#e2f0ee] mb-3">
                                    My contribution
                                </h2>
                                {project.contribution.map((para, i) => (
                                    <p key={i} className="text-[#e2f0ee]/70 leading-relaxed mb-3">
                                        {para}
                                    </p>
                                ))}
                            </div>
                        )}

                        {/* GitHub link */}
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm mt-4 hover:underline"
                                style={{color: accentColor}}
                            >
                                View on GitHub →
                            </a>
                        )}
                    </div>

                    {/* ── Right: main project image ── */}
                    <ProjectImage
                        src={project.image}
                        alt={`${project.title} screenshot`}
                    />

                </div>

                {/* ── Back link for projects without screenshots ── */}
                {(!project.screenshots || project.screenshots.length === 0) && (
                    <div className="flex justify-center mt-16">
                        <Link to="/my-projects" className="text-[#09BC8A] hover:underline text-base font-medium">
                            ← Back to all projects
                        </Link>
                    </div>
                )}

                <BlockEdgeDecoration
                    color="#124559"
                    position="bottom"
                    height="clamp(70px, 12vw, 200px)"
                />

            </section>

            {/* ── Screenshots section ── */}
            {project.screenshots?.length > 0 && (
                <section className="relative w-full py-24">

                    <BlockEdgeDecoration
                        color="#124559"
                        position="top"
                        flipX="true"
                        height="clamp(70px, 13vw, 200px)"
                    />

                    <div className="mx-auto max-w-5xl px-6">
                        <h2 className="text-xl font-semibold text-[#e2f0ee] mb-10 text-center">
                            Screenshots
                        </h2>

                        {/* Screenshots alternate left/right like ProjectsPage rows */}
                        <div className="flex flex-col gap-16">
                            {project.screenshots.map((screenshot, i) => (
                                <div
                                    key={i}
                                    className={`flex items-center gap-16 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                                >
                                    <ProjectImage
                                        src={screenshot.src}
                                        alt={screenshot.caption ?? `${project.title} screenshot ${i + 1}`}
                                    />
                                    {/* Caption, shows custom text or a fallback */}
                                    <p className="flex-1 text-[#e2f0ee]/70 text-sm leading-relaxed">
                                        {screenshot.caption ?? `Screenshot ${i + 1}`}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Back link  */}
                    <div className="flex justify-center mt-16">
                        <Link to="/my-projects" className="text-[#09BC8A] hover:underline text-base font-medium">
                            ← Back to all projects
                        </Link>
                    </div>

                    <BlockEdgeDecoration
                        color="#124559"
                        position="bottom"
                        flipX="true"
                        height="clamp(70px, 12vw, 200px)"
                    />

                </section>
            )}



        </div>
    );
}

export default ProjectDetail;