"use client"

import { routes } from "@/constants/routes"
import useCartStore from "@/stores/useCartStore"
import { ChevronDown, Search, UserRound, Star, ShoppingBag, X } from "lucide-react"
import { useState } from "react"

function Nav() {
  const { products } = useCartStore()
  const [isSidebar, setIsSidebar] = useState(false)

  return (
    <nav className="bg-white w-full z-20 start-0 border-b border-gray-200 mb-24">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-10 relative z-30">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="text-black self-center text-2xl font-semibold whitespace-nowrap">FASCO</span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="hidden md:flex gap-6 text-black">
            <Search />
            <UserRound />
            <Star />
            <div className="relative">
              <ShoppingBag />
              {products.length > 0 && (
                <span className="absolute top-[-1em] right-[-1em] rounded-full bg-red-600 w-6 h-6 flex items-center justify-center text-white text-xs">
                  {products.length}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsSidebar(true)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14" xmlns="http://www.w3.org/2000/svg">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
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
                  {route.name} {route?.subPages ? <ChevronDown className="scale-50" /> : null}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Overlay with animation */}
      <div
        className={`
    fixed inset-0 z-40 bg-black transition-opacity duration-300
    ${isSidebar ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'}
  `}
        onClick={() => setIsSidebar(false)}
      />


      {/* Sidebar (from right) */}
      <div
        className={`fixed top-0 right-0 z-50 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isSidebar ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <span className="text-xl font-bold">FASCO</span>
          <button onClick={() => setIsSidebar(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <ul className="flex flex-col p-4 space-y-2">
          {routes.map((route) => (
            <li key={route.name}>
              <a
                href={route.href}
                className="block px-2 py-2 text-gray-800 hover:bg-gray-100 rounded"
                onClick={() => setIsSidebar(false)}
              >
                {route.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="p-6 flex gap-6 text-black">
          <Search />
          <UserRound />
          <Star />
          <div className="relative">
            <ShoppingBag />
            {products.length > 0 && (
              <span className="absolute top-[-1em] right-[-1em] rounded-full bg-red-600 w-6 h-6 flex items-center justify-center text-white text-xs">
                {products.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav

