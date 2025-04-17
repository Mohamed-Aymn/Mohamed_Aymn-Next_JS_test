'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React, { useState } from 'react'

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

export default function ProductsGrid() {
    const { data, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    })

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 12 

    if (isLoading) {
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-6">Products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="animate-pulse bg-gray-200 rounded-md h-60" />
                    ))}
                </div>
            </div>
        )
    }

    // Paginate the data
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedData = data?.slice(startIndex, endIndex)

    // Handle pagination
    const totalPages = Math.ceil((data?.length ?? 0) / itemsPerPage)

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    // Create an array of page numbers for pagination
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedData?.map((product) => (
                    <Link
                        href={`/products/${product.id}`}
                        key={product.id}
                        className="border rounded-md p-4 flex flex-col items-center hover:shadow-lg transition"
                    >
                        <img
                            src={product.image}
                            alt={product.title}
                            className="h-32 object-contain mb-4"
                        />
                        <h2 className="text-sm font-semibold text-center line-clamp-2">{product.title}</h2>
                        <p className="text-blue-600 font-bold mt-2">${product.price}</p>
                    </Link>
                ))}
            </div>

            {/* Pagination controls */}
            <div className="mt-6 flex justify-center gap-2">
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={`px-4 py-2 border rounded-md ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'} transition`}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </div>
    )
}
