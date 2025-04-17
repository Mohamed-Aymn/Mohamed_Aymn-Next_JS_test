import { routes } from "@/constants/routes"
import { ChevronDown } from "lucide-react"

function Footer() {
    return (
        <footer className="bg-white shadow-sm ">
            <div className="w-full max-w-screen-xl mx-auto py-4 md:py-8">
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <span className="text-black self-center text-2xl font-semibold whitespace-nowrap ">FASCO</span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 gap-8">
                        {routes.map((route) => (
                            <li key={route.name}>
                                <a
                                    href={route.href}
                                    className="py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 flex gap-[0.1em]"
                                >
                                    {route.name} {route?.subPages ? <ChevronDown className="scale-50" /> : null}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <span className="block text-sm mt-10 text-gray-500 sm:text-center">Copyright © 2022 <a href="https://flowbite.com/" className="hover:underline">FASCO</a>. All Rights Reserved.</span>
            </div>
        </footer>
    )
}

export default Footer