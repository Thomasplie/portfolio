import {useRef} from "react";
import BlockEdgeDecoration from "./BlockEdgeDecoration";
import SpatialCubes from "./SpatialCubes";

// images — optional for of image URLs passed down to SpatialCubes
// overrideText — optional JSX to replace the default hero text
function HeaderBanner({overrideText, images = []}) {
    const sectionRef = useRef(null);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen overflow-hidden bg-neutral-900"
            style={{cursor: "none"}}
        >
            {/* Animated cube background  */}
            <SpatialCubes sectionRef={sectionRef} images={images}/>

            {/* Dark overlay so text stays readable */}
            <div className="absolute inset-0 bg-black/20" style={{pointerEvents: "none"}}/>

            {/* Hero text  */}
            <div
                className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center text-white"
                style={{pointerEvents: "none"}}
            >
                <div>
                    {overrideText ?? (
                        <div>
                            <p className="mb-4 text-sm md:text-base font-medium text-[#09BC8A]">It's time to</p>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">LEVEL UP.</h1>
                            <p className="mt-4 text-lg md:text-2xl">Take a look around.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom edge decoration  */}
            <div className="relative" style={{pointerEvents: "none"}}>
                <BlockEdgeDecoration color="#124559" position="bottom"/>
            </div>

        </section>
    );
}

export default HeaderBanner;