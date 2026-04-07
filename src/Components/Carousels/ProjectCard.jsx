function ProjectCard({
                         type = "website",
                         title = "Project Title",
                         description = "Project Description",
                         tags = [],
                         children
                     }) {
    const accentColors = {
        website: "#FF8A1E",
        game: "#004346",
    };

    const accentColor = accentColors[type] || accentColors.website;

    return (
        <>
            <div
                className="relative h-[240px] w-[240px] overflow-hidden rounded-2xl border-2 border-teal-400 bg-[url('/src/assets/Projects/Netna.png')] bg-contain bg-no-repeat bg-center">
                <svg className="absolute left-0 top-0 z-10 h-[90px] w-full" viewBox="0 0 220 90"
                     preserveAspectRatio="none">
                    <polygon points="0,0 220,0 220,8 0,48" fill={accentColor}/>
                </svg>

                <div className="relative z-20 p-4 pt-14">
                    {children}
                </div>
            </div>

            <h3 className="text-lg font-semibold text-black">{title}</h3>
            <article className="text-sm text-black">{description}</article>

            <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <span key={index}
                          className="rounded-full min-w-12 text-center bg-emerald-400 px-4 py-1 text-sm font-medium text-black">
                         {tag}
                    </span>
                ))}
            </div>
        </>
    );
}

export default ProjectCard;