import {useParams, Link} from "react-router";
import HeaderBanner from "../../Components/HeaderBanner.jsx";
import BlockEdgeDecoration from "../../Components/BlockEdgeDecoration.jsx";
import projects from "../../data/projects.js";

// Jagged hole image
// fit contain shows the whole image with empty space if needed, good for
// screenshots or UI captures where cropping would cut off important content.
// fit cover fills the frame and crops overflow, good for photos.
//
// The container now uses a percentage width capped at 260px plus an aspect
// ratio instead of a fixed pixel width and height. Since the clip path below
// is written in percentage points it stretches to fit whatever box this
// sits in, so the jagged shape stays correct at any size, including a
// narrow phone screen where the full 260px would otherwise overflow.
function ProjectImage({src, alt, fit = "cover"}) {
    const fitClass = fit === "contain" ? "object-contain" : "object-cover";

    return (
        <div className="relative flex-shrink-0 w-full max-w-[260px] aspect-[260/320] mx-auto md:mx-0">
            <div
                className="absolute inset-0 bg-neutral-900"
                style={{clipPath: jaggedClip}}
            />
            <img
                src={src}
                alt={alt}
                className={`absolute inset-0 w-full h-full ${fitClass}`}
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

    if (!project) {
        return (
            <div className="min-h-screen bg-[#0e2d33] flex flex-col items-center justify-center gap-4 px-4 text-center">
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
                        <p className="mb-3 sm:mb-4 text-xs sm:text-sm md:text-base font-medium"
                           style={{color: accentColor}}>
                            {project.type}
                        </p>
                        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold">
                            {project.title}
                        </h1>
                        <div className="mt-3 sm:mt-4 flex flex-wrap justify-center gap-2 px-4">
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

            {/* About the project, stacks vertically below md, image and text sit side by side from md up */}
            <section className="relative w-full py-16 sm:py-24 md:py-36 lg:py-48">

                <BlockEdgeDecoration
                    color="#124559"
                    position="top"
                    flipX="true"
                    height="clamp(70px, 13vw, 200px)"
                />

                <div
                    className="mx-auto max-w-5xl px-6 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">

                    <div className="flex-1 w-full">

                        <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-8">
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

                        {project.longDescription?.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-lg sm:text-xl font-semibold text-[#e2f0ee] mb-3">
                                    About the project
                                </h2>
                                {project.longDescription.map((para, i) => (
                                    <p key={i} className="text-[#e2f0ee]/70 leading-relaxed mb-3">
                                        {para}
                                    </p>
                                ))}
                            </div>
                        )}

                        {project.contribution?.length > 0 && (
                            <div>
                                <h2 className="text-lg sm:text-xl font-semibold text-[#e2f0ee] mb-3">
                                    My contribution
                                </h2>
                                {project.contribution.map((para, i) => (
                                    <p key={i} className="text-[#e2f0ee]/70 leading-relaxed mb-3">
                                        {para}
                                    </p>
                                ))}
                            </div>
                        )}

                        {project.credits && (
                            <div className="mt-8">
                                <h2 className="text-lg sm:text-xl font-semibold text-[#e2f0ee] mb-3">
                                    Credits & Attribution
                                </h2>
                                <p className="text-[#e2f0ee]/70 leading-relaxed text-sm">
                                    {project.credits}
                                </p>
                            </div>
                        )}

                        {/* Both links use a plain anchor tag instead of Link, since GitHub and a live demo are outside this app entirely, Link is only for internal routes handled by React Router */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-4">
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm hover:underline"
                                    style={{color: accentColor}}
                                >
                                    View on GitHub →
                                </a>
                            )}
                            {project.demoUrl && (
                                <a
                                    href={project.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm hover:underline"
                                    style={{color: accentColor}}
                                >
                                    Live Demo →
                                </a>
                            )}
                        </div>
                    </div>

                    <ProjectImage
                        src={project.image}
                        alt={`${project.title} screenshot`}
                    />

                </div>

                {(!project.screenshots || project.screenshots.length === 0) && (
                    <div className="flex justify-center mt-10 sm:mt-16 px-4">
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

            {/* Screenshots section, same stacking pattern applied to each alternating row */}
            {project.screenshots?.length > 0 && (
                <section className="relative w-full py-12 sm:py-16 md:py-24">

                    <BlockEdgeDecoration
                        color="#124559"
                        position="top"
                        flipX="true"
                        height="clamp(70px, 13vw, 200px)"
                    />

                    <div className="mx-auto max-w-5xl px-6">
                        <h2 className="text-lg sm:text-xl font-semibold text-[#e2f0ee] mb-8 sm:mb-10 text-center">
                            Screenshots
                        </h2>

                        <div className="flex flex-col gap-10 md:gap-16">
                            {project.screenshots.map((screenshot, i) => {
                                const rowDirection = i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse";
                                return (
                                    <div
                                        key={i}
                                        className={`flex flex-col ${rowDirection} items-center gap-6 md:gap-16`}
                                    >
                                        <ProjectImage
                                            src={screenshot.src}
                                            alt={screenshot.caption ?? `${project.title} screenshot ${i + 1}`}
                                            fit={screenshot.fit}
                                        />
                                        <p className="flex-1 text-[#e2f0ee]/70 text-sm leading-relaxed text-center md:text-left">
                                            {screenshot.caption ?? `Screenshot ${i + 1}`}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex justify-center mt-10 sm:mt-16 px-4">
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