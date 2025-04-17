import Button from '@/components/Button'
import ProductsGrid from '@/components/ProductsGrid'
import { ChevronDown, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Product = {
    id: number
    title: string
    image: string
    price: number
}

const fetchProducts = async (): Promise<Product[]> => {
    const res = await fetch('https://fakestoreapi.com/products')
    if (!res.ok) throw new Error('Failed to fetch')
    return res.json()
}


async function Products() {
    const products = await fetchProducts()

    return (
        <>
            <div className="w-full">
                <div className="mx-auto w-fit flex flex-col justify-center items-center">
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-3">Fashion</h1>
                    <div className="flex"><span>Home</span> <ChevronRight /> <span>Fashion</span></div>
                </div>
            </div>

            {/* products controlers */}
            <div className="w-full flex justify-between items-center mt-12">
                <h2 className="flex gap-[0.1em]">
                    <span>Best Selling </span>
                    <ChevronDown className="scale-50" />
                </h2>

                <div className="flex gap-4">
                    <Button className='px-4 py-4'>
                        <Image src={'/three.svg'} alt="1" width={20} height={20} />
                    </Button>
                    <Button className='px-4 py-4'>
                        <Image src={'/four.svg'} alt="1" width={20} height={20} />
                    </Button>
                    <Button className='px-4 py-4'>
                        <Image src={'/five.svg'} alt="1" width={20} height={20} />
                    </Button>
                </div>
            </div>

            {/* products */}
            <ProductsGrid initialProducts={products} />
        </>
    )
}

export default Products