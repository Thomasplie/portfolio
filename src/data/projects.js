const base = import.meta.env.BASE_URL;

const projects = [
    {
        id: 1,
        slug: "netna",
        type: "game",
        title: "Netna",
        description: "A tiny top down action-adventure game that promotes sustainability by you having to purify 'littered' monsters " +
            "so that they will be calmed down!",
        tags: ["Excalibur", "Javascript"],
        link: "/my-projects/netna",
        github: "https://github.com/Thomasplie/Team6-Project-Net",
        demoUrl: "https://dtb354.github.io/Team6-Project-Net/",
        image: `${base}images/Netna.png`,
        role: "Player Designer",
        teamSize: 5,
        longDescription: [
            "Purify is a top-down action adventure game where you play as the protagonist, Netna. Your goal is to shut down the evil factory that is overpolluting nature and thereby corrupting elements like water to be angry at the player.",
            "This game has turned out to be great for speedrunners — the tight level design and responsive controls make it a natural fit for people who want to push the limits.",
        ],
        contribution: [
            "I created all the sprites for the player, working with spritesheets and figuring out pixel art for the first time. Getting everything as smooth as possible was a great challenge.",
            "I also did supporting work on other sprites and code — adding the shiny versions of the monsters, and building a small promotional website in HTML and CSS, which was one of my very first web projects ever.",
            "If you wish to try it out, Controls are wasd to move and space to attack. Press enter to start! (only controller inputs are explained in-game)"
        ],
        screenshots: [
            {
                src: `${base}images/projects/netna-screen1.png`,
                caption: "The player sprite sheet I created — 8 directional movement animations."
            },
            {
                src: `${base}images/projects/netna-screen2.png`,
                caption: "The shiny monster variants I added as a bonus feature."
            },
        ],
    },
    {
        id: 2,
        slug: "progression-assessment",
        type: "website",
        title: "Progression Assessment",
        description: "A creative assignment for the measurement of my skill-level at the time. This was my first real experience of using " +
            "a library outside of my comfort zone.",
        tags: ["Design", "Frontend", "Library"],
        link: "/my-projects/progression-assessment",
        github: "https://github.com/Thomasplie/signatuur",
        demoUrl: "https://thomasplie.github.io/signatuur/",
        image: `${base}images/Signatuur2.png`,
        role: "Frontend Developer",
        teamSize: 1,
        longDescription: [
            "A website to read about all the progress I made in my first two months of CMGT — one of my first real projects. I still love the creativity behind it.",
            "Some of it broke at the end, and the code might not be up to my current standard. But I'm still proud of it. It was the beginning of figuring out what I was actually capable of.",
        ],
        contribution: [
            "I did everything — frontend, design, and working with a library outside of my comfort zone for the first time. No backend, solo project from start to finish.",
        ],
        screenshots: [],
    },
    {
        id: 3,
        slug: "wybel-class-selector",
        type: "website",
        title: "Wybel Class Selector",
        description: "An AI chatbot that has answers for all your Wynncraft class questions.",
        tags: ["AI", "LangChain", "Wynncraft"],
        link: "/my-projects/wybel-class-selector",
        github: "https://github.com/Thomasplie/prg8Wynnbot",
        demoUrl: null,
        image: `${base}images/Wybot.png`,
        role: "Full-stack Developer",
        teamSize: 1,
        longDescription: [
            "An AI chatbot to answer all of your Wynncraft class-related questions. The Wynncraft API was a big help, but the real challenge was building a bot that actually understands your playstyle.",
            "Ask it how you like to play and it will help you find the class that fits you best. The bot is scoped entirely to Wynncraft — it can't and won't talk about anything else.",
        ],
        contribution: [
            "Everything — from the frontend to getting the AI to work with LangChain. This was my own personal project, built entirely solo.",
        ],
        screenshots: [
            {src: `${base}images/projects/wybel-screen1.png`, caption: "Screenshot 1"},
            {src: `${base}images/projects/wybel-screen2.png`, caption: "Screenshot 2"},
        ],
    },
    {
        id: 4,
        slug: "easyfit",
        type: "website",
        title: "EasyFit",
        description: "A treadmill workout app with real-time metrics, animation updates, and a strong themed presentation. " +
            "This treadmill is specifically designed for people with a mild intellectual disability.",
        tags: ["UI", "UX", "Frontend"],
        link: "/my-projects/easyfit",
        github: "https://github.com/Thomasplie/Easyfit",
        demoUrl: null,
        image: `${base}images/Easyfit_LOGO.png`,
        role: "Frontend Lead",
        teamSize: 3,
        longDescription: [
            "EasyFit is a treadmill workout app with real-time metrics. The layout of the interface is specifically designed for people with a mild intellectual disability, and so is the language used throughout.",
            "The treadmill supports different workout modes so that users can enjoy a wider variety of sessions, all within an interface that is clear, calm and confidence-inspiring.",
        ],
        contribution: [
            "I was responsible for the entire layout of the interface and led a lot of research into what our target audience understood and what they didn't.",
            "Understanding the user in this case was everything — the design had to be functional, friendly and accessible in a way that went far beyond standard UX thinking.",
        ],
        screenshots: [
            {src: `${base}images/projects/easyfit-screen1.png`, caption: "Screenshot 1"},
            {src: `${base}images/projects/easyfit-screen2.png`, caption: "Screenshot 2"},
        ],
    },
];

export default projects;