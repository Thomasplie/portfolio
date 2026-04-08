import {Link} from "react-router";

function ProjectCard({
                         type = "website",
                         title = "Project Title",
                         description = "Project Description",
                         tags = [],
                         link = "#",
                         image = "",
                         children,
                         onMouseEnter,
                         onMouseLeave,
                         className = "",
                     }) {
    const accentColors = {
        website: "#FF8A1E",
        game: "#004346",
    };

    const accentColor = accentColors[type] || accentColors.website;

    return (
        <Link
            to={link}
            className={`block group ${className}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            aria-label={`${title} project card`}
        >
            <div
                className="relative h-[240px] w-[240px] overflow-hidden rounded-2xl border-2 border-teal-400 bg-contain bg-no-repeat bg-center transition-all duration-300"
                style={{backgroundImage: `url('${image}')`}}
            >
                <svg
                    className="absolute left-0 top-0 z-10 h-[90px] w-full"
                    viewBox="0 0 220 90"
                    preserveAspectRatio="none"
                >
                    <polygon points="0,0 220,0 220,8 0,48" fill={accentColor}/>
                </svg>

                <div className="relative z-20 p-4 pt-14">
                    {children}
                </div>
            </div>
        </Link>
    );
}

export default ProjectCard;