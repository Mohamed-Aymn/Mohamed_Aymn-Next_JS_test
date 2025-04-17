"use client"

import { routes } from "@/constants/routes"
import useCartStore from "@/stores/useCartStore"
import { ChevronDown, Search, UserRound, Star, ShoppingBag} from "lucide-react"

function Nav() {
  const {products} = useCartStore()
  return (
    <nav className="bg-white w-full z-20 start-0 border-b border-gray-200 mb-24">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-10">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="text-black self-center text-2xl font-semibold whitespace-nowrap ">FASCO</span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="hidden md:flex gap-6 text-black">
            <Search />
            <UserRound />
            <Star />
            <div className="relative">
              <ShoppingBag />
              {products.length > 0 && <span className="absolute top-[-1em] right-[-1em] rounded-full bg-red-600 w-6 h-6 flex items-center justify-center text-white text-xs">{products.length}</span>}
            </div>
          </div>

          {/* <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center ">Get started</button> */}
          <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-sticky" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 py-10 items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            {routes.map((route) => (
              <li key={route.name}>
                <a
                  href={route.href}
                  className="py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 flex gap-[0.1em]"
                >
                  {route.name} {route?.subPages ? <ChevronDown className="scale-50"/> : null}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav