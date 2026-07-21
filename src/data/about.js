const base = import.meta.env.BASE_URL;

// Photos used in the HeaderBanner cube animation
export const aboutPhotos = [
    `${base}images/Me.jpg`,
    `${base}images/Me.jpg`,
    `${base}images/Me.jpg`,
    `${base}images/Me.jpg`,
];

// Smaller intro photo shown in the text section
export const introPhoto = `${base}images/Me.jpg`;

// Tools / languages for the carousel
export const tools = [
    {
        id: 1,
        name: "HTML",
        icon: `${base}images/icons/Html.svg.webp`,
        category: "language",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML"
    },
    {
        id: 2,
        name: "CSS",
        icon: `${base}images/icons/CSS.svg.webp`,
        category: "language",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS"
    },
    {
        id: 3,
        name: "JavaScript",
        icon: `${base}images/icons/js.png`,
        category: "language",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
    },
    {
        id: 4,
        name: "PHP",
        icon: `${base}images/icons/PHP.svg.webp`,
        category: "language",
        url: "https://www.php.net/docs.php"
    },
    {id: 5, name: "React", icon: `${base}images/icons/reactjs.png`, category: "framework", url: "https://react.dev"},
    {
        id: 6,
        name: "Tailwind",
        icon: `${base}images/icons/Tailwind.svg.webp`,
        category: "framework",
        url: "https://tailwindcss.com/docs"
    },
    {id: 7, name: "Vite", icon: `${base}images/icons/Vite.svg.webp`, category: "tool", url: "https://vitejs.dev"},
    {id: 8, name: "GitHub", icon: `${base}images/icons/github.png`, category: "tool", url: "https://docs.github.com"},
    {id: 9, name: "Figma", icon: `${base}images/icons/Figma.svg.webp`, category: "tool", url: "https://help.figma.com"},
    {id: 10, name: "Miro", icon: `${base}images/icons/miro.png`, category: "tool", url: "https://help.miro.com"},
    {
        id: 11,
        name: "UE",
        icon: `${base}images/icons/ue.webp`,
        category: "tool",
        url: "https://dev.epicgames.com/documentation"
    },
];