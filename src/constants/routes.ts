interface IRoutes {
    name: string,
    href: string,
    subPages?: boolean
}

export const routes : Array<IRoutes> = [
    {
        name: "Home",
        href: "#",
    },
    {
        name: "Shop",
        href: "#",
    },
    {
        name: "Products",
        href: "#",
    },
    {
        name: "Pages",
        href: "#",
        subPages: true
    },
]