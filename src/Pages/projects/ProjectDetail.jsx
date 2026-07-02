import {useParams, Link} from "react-router";
import HeaderBanner from "../../Components/HeaderBanner.jsx";
import projects from "../../data/projects.js";

function ProjectDetail() {
    const {slug} = useParams();

    // Find the project whose slug matches the URL
    const project = projects.find((p) => p.slug === slug);

    // If no match — show a friendly fallback
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

    return (
        <div className="bg-[#0e2d33]">

            {/* ── Hero — HeaderBanner with this project's image on the cubes ── */}
            <HeaderBanner
                images={Array(4).fill(project.image)}
                overrideText={
                    <div>
                        <p className="mb-4 text-sm md:text-base font-medium text-[#09BC8A]">
                            {project.type}
                        </p>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                            {project.title}
                        </h1>
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 text-xs font-medium rounded-sm bg-[#09BC8A] text-black"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                }
            />

        </div>
    );
}

export default ProjectDetail;