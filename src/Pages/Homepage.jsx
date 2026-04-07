import HeaderBanner from "../Components/HeaderBanner.jsx";
import Transition from "../Components/Transition.jsx";
import Carousel from "../Components/Carousel.jsx";
function Homepage() {
    return (
        <>
            <HeaderBanner>
            </HeaderBanner>

            <Transition minHeight="min-h-[500px]" bgClass="bg-[#124559]">
                <Carousel></Carousel>
            </Transition>

            <h1>TitleCard :D</h1>
            <p>
                Interesting Information of who i am and what my goal is.
            </p>

            <Transition minHeight="min-h-[20px]" bgClass="bg-[#124559]" className="text-white">
                This is not going to be a transition,
                instead this will be a infinite slider with my projects and my tools that i can use.
            </Transition>

            <p>
                And here is the optional form, this is probably not gonna make it to the first version gonna be honest
            </p>
        </>
    )
}

export default Homepage