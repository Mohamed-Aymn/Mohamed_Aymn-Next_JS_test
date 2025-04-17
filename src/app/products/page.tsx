import { BarBox } from '@/components/BarBox'
import ProductsGrid from '@/components/ProductsGrid'
import { ChevronDown, ChevronRight } from 'lucide-react'
import React from 'react'

function Products() {
    return (
        <>
            <div className="w-full">
                <div className="mx-auto w-fit flex flex-col justify-center items-center">
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-3">Fashion</h1>
                    <div className="flex"><span>Home</span> <ChevronRight /> <span>Fashion</span></div>
                </div>
            </div>

            {/* products controlers */}
            <div className="w-full flex justify-between items-center">
                <h2 className="flex gap-[0.1em]">
                    <span>Best Selling </span>
                    <ChevronDown className="scale-50" />
                </h2>

                <div className="text-white flex gap-4">
                    <BarBox count={3} />
                    <BarBox count={4} />
                    <BarBox count={5} />
                </div>
            </div>

            {/* products */}
            <ProductsGrid />

            {/* pagination */}
        </>
    )
}

export default Products