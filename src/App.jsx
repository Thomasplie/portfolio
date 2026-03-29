import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./Components/Layout.jsx";
import Homepage from "./Pages/Homepage.jsx";
import About from "./Pages/About.jsx";
import Future from "./Pages/Future.jsx";
import Projects from "./Pages/Projects.jsx";
import Error from "./Pages/Error.jsx";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Homepage/>
            },
            {
                path: "/about-me",
                element: <About/>
            },
            {
                path: "/future-plans",
                element: <Future/>
            },
            {
                path: "/my-projects",
                element: <Projects/>
            },
            {
                path: "/not-found",
                element: <Error/>,
            },
            {
                path: "*",
                element: <Error/>,
            }
        ],
    },
]);

function App() {
    return <RouterProvider router={router}/>;
}

export default App;