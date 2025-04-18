import Button from '@/components/ui/Button'
import ProductsGrid from '@/app/ProductsGrid'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import PageTitle from '@/components/PageTitle'

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
            <PageTitle title='Fashion' description='Fashion' />

            {/* products controlers */}
            <div className="w-full flex justify-between items-center mt-12">
                <h2 className="flex gap-[0.1em]">
                    <span>Best Selling </span>
                    <ChevronDown className="scale-50" />
                </h2>

                <div className="flex gap-4">
                    <Button className='px-3 py-3'>
                        <Image src={'/three.svg'} alt="1" width={12} height={12} />
                    </Button>
                    <Button className='px-3 py-3'>
                        <Image src={'/four.svg'} alt="1" width={12} height={12} />
                    </Button>
                    <Button className='px-3 py-3'>
                        <Image src={'/five.svg'} alt="1" width={12} height={12} />
                    </Button>
                </div>
            </div>

            {/* products */}
            <ProductsGrid initialProducts={products} />
        </>
    )
}

export default Products