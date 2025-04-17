"use client"

import React, { useState } from 'react'
import useCartStore from '@/stores/useCartStore'
import { useQuery } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Checkbox from '@/components/Checkbox'
import Button from '@/components/Button'
import QuantityButton from '@/components/QuantityButton'
import Link from 'next/link'

type Product = {
    id: number
    title: string
    price: number
    image: string
}

function Cart() {
    const { products, removeProduct } = useCartStore()
    const [checked, isChecked] = useState(false)
    const {increaseCount, decreaseCount} = useCartStore()

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
            <div className="mx-auto w-fit flex flex-col justify-center items-center mb-6">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-3">Shopping Cart</h1>
                <div className="flex gap-2 items-center">
                    <span>Home</span> <ChevronRight /> <span>Your Shopping Cart</span>
                </div>
            </div>

            <div className="overflow-x-auto mt-12">
                <table className="min-w-full">
                    <thead className="border-b">
                        <tr>
                            <th className="py-6 text-left">Product</th>
                            <th className="py-6 text-left">Price</th>
                            <th className="py-6 text-left">Quantity</th>
                            <th className="py-6 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            [...Array(3)].map((_, index) => (
                                <tr key={index} className="animate-pulse">
                                    <td className="p-3 bg-gray-200 rounded h-6 w-32"></td>
                                    <td className="p-3 bg-gray-200 rounded h-6 w-20"></td>
                                    <td className="p-3 bg-gray-200 rounded h-6 w-16"></td>
                                    <td className="p-3 bg-gray-200 rounded h-6 w-20"></td>
                                </tr>
                            ))
                        ) : (
                            data?.map((productData) => {
                                const cartItem = products.find(p => p.id === productData.id)
                                const quantity = cartItem?.count ?? 0
                                const total = productData.price * quantity
                                return (
                                    <tr key={productData.id} className="border-b">
                                        <td className="py-12 flex gap-4">
                                            <Link href={`/products/${productData.id}`}>
                                                <Image
                                                    src={productData.image}
                                                    alt={productData.title}
                                                    width={150}
                                                    height={150}
                                                    className="object-contain my-4"
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
                                        <td className="py-12 align-top font-bold">${productData.price.toFixed(2)}</td>
                                        <td className="py-12 align-top">
                                            <QuantityButton
                                                increaseCount={() => increaseCount(productData.id)}
                                                decreaseCount={() => decreaseCount(productData.id)}
                                                className='w-fit' 
                                                quantity={quantity}
                                                
                                            />
                                        </td>
                                        <td className="py-12 font-bold align-top text-right">${total.toFixed(2)}</td>
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
                            // label="I agree to the terms and conditions"
                            children={
                                <>
                                    For <span className='font-bold text-black'>$100</span> Please Wrap The Product
                                </>
                            }
                            checked={checked}
                            onChange={() => isChecked(!checked)}
                            className='border-b pb-4'
                        />
                        <div className='my-4 flex justify-between'>
                            <span>SubTotal </span>
                            <span>$100</span>
                        </div>
                        <Button variant="speical" className="w-full px-4 py-4 shadow-xl mb-12">
                            Checkout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
