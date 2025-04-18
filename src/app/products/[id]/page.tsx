import React from 'react'
import Image from 'next/image'
import { Package2, Share2, Truck } from 'lucide-react'
import StockIndicator from '@/components/StockIndicator'
import CartControllers from './CartControllers'
import SkeletonImage from '@/components/SkeletonImage'
import { Metadata } from 'next'

type Product = {
    id: number
    title: string
    image: string
    price: number
    description: string
    rating: {
        rate: number,
        count: number
    }
}

// Update the component to accept params directly
async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    // Fetch the product data inside the component
    const res = await fetch(`https://fakestoreapi.com/products/${resolvedParams.id}`)
    const product: Product = await res.json()
    
    const { rate, count } = product.rating;

    const renderStars = (rating: number) => {
        const totalStars = 5;
        const filledStars = Math.round(rating);
        const emptyStars = totalStars - filledStars;

        return (
            <div className="flex items-center">
                {Array.from({ length: filledStars }).map((_, index) => (
                    <span key={`filled-${index}`} className="text-yellow-500">★</span>
                ))}
                {Array.from({ length: emptyStars }).map((_, index) => (
                    <span key={`empty-${index}`} className="text-gray-300">★</span>
                ))}
            </div>
        )
    }

    return (
        <div className="flex gap-32 justify-between flex-col lg:flex-row">
            <SkeletonImage
                imgProps={{
                    alt: product.title || "image",
                    src: product.image,
                    className: "object-contain mb-4 mx-auto",
                }}
                containerProps={{
                    className: "mb-4 mx-auto h-auto w-full flex justify-center items-center",
                }}
            />
            <div>
                <div>FASCO</div>
                <h1 className="text-2xl font-bold">{product.title}</h1>
                <div className="flex items-center">
                    {renderStars(rate)}
                    <span className="ml-2 text-sm text-gray-500">({count})</span>
                </div>

                <div className='my-6 flex gap-4 items-center'>
                    <p className="font-bold text-2xl">${product.price}</p>
                    <span className="text-gray-500 line-through">
                        ${(product.price + 20).toFixed(2)}
                    </span>
                    <span className='bg-[#DA3F3F] text-white px-2 py-1 text-sm rounded-full'>
                        SAVE 33%
                    </span>
                </div>

                <p className="mb-4">{product.description}</p>

                <StockIndicator currentStock={9} maxStock={70} />

                <div className='my-12'>
                    <div className='mb-3'>Quantity</div>
                    <div className="flex gap-2">
                        <CartControllers productId={product.id} />
                    </div>
                </div>

                <div className='my-8 flex gap-4'>
                    <Share2 />
                    <span>Share</span>
                </div>

                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />

                <div className='flex flex-col gap-2'>
                    <div className='flex gap-2'>
                        <Truck />
                        <span><b>Estimated Delivery:</b> <span>Jul 30 - Aug 03</span></span>
                    </div>
                    <div className='flex gap-2'>
                        <Package2 />
                        <span>
                            <b>Free Shipping & Returns:</b> On all orders over $75
                        </span>
                    </div>
                </div>

                <div className='bg-gray-100 flex flex-col gap-4 p-6 justify-center items-center mt-6'>
                    <Image src={'/banks.svg'} alt="1" width={300} height={200} />
                    <div>Guarantee safe & secure checkout</div>
                </div>
            </div>
        </div>
    )
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const res = await fetch(`https://fakestoreapi.com/products/${resolvedParams.id}`)
    const product: Product = await res.json()

    const title = product.title;
    const description = product.description;
    const imageUrl = product.image;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: imageUrl,
                    width: 800,
                    height: 600,
                    alt: title,
                }
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [imageUrl],
        },
    };
}

export default ProductPage