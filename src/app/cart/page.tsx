"use client"

import React from 'react'
import useCartStore from '@/stores/useCartStore'
import { useQuery } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'

type Product = {
    id: number
    title: string
    price: number
    image: string
}

function Cart() {
    const { products } = useCartStore()

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
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-3">Fashion</h1>
                <div className="flex gap-2 items-center">
                    <span>Home</span> <ChevronRight /> <span>Your Shopping Cart</span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Product</th>
                            <th className="p-3 text-left">Price</th>
                            <th className="p-3 text-left">Quantity</th>
                            <th className="p-3 text-left">Total</th>
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
                                    <tr key={productData.id} className="border-t">
                                        <td className="p-3">{productData.title}</td>
                                        <td className="p-3">${productData.price.toFixed(2)}</td>
                                        <td className="p-3">{quantity}</td>
                                        <td className="p-3 font-semibold">${total.toFixed(2)}</td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Cart
