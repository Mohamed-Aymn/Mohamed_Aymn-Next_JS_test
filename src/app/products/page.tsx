import Button from '@/components/ui/Button'
import ProductsGrid from '@/app/ProductsGrid'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'

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


export const generateMetadata = async (): Promise<Metadata> => {
    const title = "Fashion | Shop the Best Selling Products"
    const description = "Browse our latest collection of fashion items, including the best selling clothing, shoes, and accessories."

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "website",
            url: "https://your-domain.com/fashion", // adjust to your route
            images: [
                {
                    url: "https://your-domain.com/og-fashion.jpg", // replace with a real OG image
                    width: 1200,
                    height: 630,
                    alt: "Fashion Collection",
                }
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["https://your-domain.com/og-fashion.jpg"], // same as above
        }
    }
}