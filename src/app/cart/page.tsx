"use client"

import React, { useState } from 'react'
import useCartStore from '@/stores/useCartStore'
import { useQuery } from '@tanstack/react-query'
import Checkbox from '@/components/ui/Checkbox'
import Button from '@/components/ui/Button'
import QuantityButton from '@/components/QuantityButton'
import Link from 'next/link'
import PageTitle from '@/components/PageTitle'
import SkeletonImage from '@/components/SkeletonImage'

type Product = {
    id: number
    title: string
    price: number
    image: string
}

function Cart() {
    const { products, removeProduct, hasHydrated } = useCartStore()
    const [checked, isChecked] = useState(false)
    const { increaseCount, decreaseCount } = useCartStore()

    const { data, isLoading } = useQuery({
        queryKey: ['cart-products', products.map(p => p.id)],
        queryFn: async () => {
            const requests = products.map((product) =>
                fetch(`https://fakestoreapi.com/products/${product.id}`).then(res => res.json())
            )
            return Promise.all(requests) as Promise<Product[]>
        },
        enabled: products.length > 0,
    })

    return (
        <div className="p-4">
            <PageTitle title='Your Shopping Cart' description='Your Shopping Cart' />

            <div className="overflow-x-auto mt-12">
                {products.length === 0 && !data && !isLoading && hasHydrated ? (
                    <div className="flex flex-col gap-4 items-center justify-center">
                        <span className="text-2xl font-semibold">Your cart is empty</span>
                        <Link href="/">
                            <Button>Continue Shopping</Button>
                        </Link>
                    </div>
                ) :
                    (
                        <>
                            <table className="min-w-full">
                                <thead className="border-b">
                                    <tr>
                                        <th className="py-6 pr-6 text-left w-[30%]">Product</th>
                                        <th className="py-6 px-6 text-left w-[20%]">Price</th>
                                        <th className="py-6 px-6 text-left w-[25%]">Quantity</th>
                                        <th className="py-6 pl-6 text-right w-[25%]">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading || !data ?
                                        (
                                            [...Array(3)].map((_, index) => (
                                                <tr key={index} className="border-b animate-pulse">
                                                    <td className="py-12 pr-6 w-[30%]">
                                                        <div className="flex flex-col md:flex-row gap-4">
                                                            <div className="bg-gray-200 w-[150px] h-[150px] rounded" />
                                                            <div className="flex flex-col gap-4 max-w-xs w-full">
                                                                <div className="bg-gray-200 h-6 w-3/4 rounded" />
                                                                <div className="bg-gray-200 h-4 w-1/2 rounded" />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-12 px-6 align-top w-[20%]">
                                                        <div className="bg-gray-200 h-6 w-12 rounded" />
                                                    </td>
                                                    <td className="py-12 px-6 align-top w-[25%]">
                                                        <div className="flex gap-2">
                                                            <div className="bg-gray-200 h-8 w-8 rounded" />
                                                            <div className="bg-gray-200 h-8 w-8 rounded" />
                                                            <div className="bg-gray-200 h-8 w-8 rounded" />
                                                        </div>
                                                    </td>
                                                    <td className="py-12 pl-6 text-right align-top w-[25%]">
                                                        <div className="bg-gray-200 h-6 w-16 rounded ml-auto" />
                                                    </td>
                                                </tr>
                                            ))
                                        ) :
                                        (
                                            data?.map((productData) => {
                                                const cartItem = products.find(p => p.id === productData.id)
                                                const quantity = cartItem?.count ?? 0
                                                const total = productData.price * quantity
                                                return (
                                                    <tr key={productData.id} className="border-b">
                                                        <td className="py-12 pr-6 flex gap-4 flex-col md:flex-row">
                                                            <Link href={`/products/${productData.id}`} className='w-fit'>

                                                                <SkeletonImage
                                                                    imgProps={{
                                                                        alt: productData.title || "image",
                                                                        src: productData.image,
                                                                        className: "object-contain mb-4 mx-auto",
                                                                        width: 100,
                                                                        height: 100
                                                                    }}
                                                                    containerProps={{
                                                                        className: "mb-4 h-full w-38 flex justify-center items-center",
                                                                    }}
                                                                />

                                                            </Link>
                                                            <div className='max-w-xs'>
                                                                <div className='font-bold mb-6'>{productData.title}</div>
                                                                <div
                                                                    className='text-gray-500 underline cursor-pointer'
                                                                    onClick={() => removeProduct(productData.id)}
                                                                >
                                                                    Remove
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-12 px-6 align-top font-bold w-[20%]">${productData.price.toFixed(2)}</td>
                                                        <td className="py-10 px-6 align-top w-[25%]">
                                                            <QuantityButton
                                                                increaseCount={() => increaseCount(productData.id)}
                                                                decreaseCount={() => decreaseCount(productData.id)}
                                                                className='w-fit'
                                                                quantity={quantity}

                                                            />
                                                        </td>
                                                        <td className="py-12 pl-6 font-bold align-top text-right w-[25%]">${total.toFixed(2)}</td>
                                                    </tr>
                                                )
                                            })
                                        )}
                                </tbody>
                            </table>

                            <div className='grid grid-cols-2 mt-12'>
                                <div className="col-span-1"></div>
                                <div className='col-span-1'>
                                    <Checkbox
                                        id="terms"
                                        checked={checked}
                                        onChange={() => isChecked(!checked)}
                                        className='border-b pb-4'
                                    >
                                        For <span className='font-bold text-black'>$100</span> Please Wrap The Product
                                    </Checkbox>
                                    <div className='my-4 flex justify-between'>
                                        <span>SubTotal </span>
                                        <span>$100</span>
                                    </div>
                                    <Button variant="speical" className="w-full px-4 py-4 shadow-xl mb-12">
                                        Checkout
                                    </Button>
                                </div>
                            </div>

                        </>
                    )


                }
            </div>
        </div>
    )
}

export default Cart
