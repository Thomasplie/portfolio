import BlockEdgeDecoration from "./BlockEdgeDecoration";
import headerImage from "../assets/TjoekoeAndMonke.webp";

function HeaderBanner() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-neutral-900">
            <img
                src={headerImage}
                alt="Hero"
                className="absolute inset-0 h-full w-full"
            />

            <div className="absolute inset-0 bg-black/20"/>

            <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center text-white">
                <div>
                    <p className="mb-4 text-sm md:text-base font-medium">Goated Placeholder</p>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                        Time to level up.
                    </h1>
                    <p className="mt-4 text-lg md:text-2xl">
                        Tjoekoe and Monke
                    </p>
                </div>
            </div>

            <div className="relative">
                <BlockEdgeDecoration color="#124559" position="bottom"/>
            </div>
        </section>
    );
}

export default HeaderBanner;