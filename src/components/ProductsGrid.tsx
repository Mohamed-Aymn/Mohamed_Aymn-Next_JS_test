'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import Button from './Button'
import Image from 'next/image'

type Product = {
    id: number
    title: string
    image: string
    price: number
}

export default function ProductsGrid({ initialProducts }: { initialProducts: Product[] }) {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 12

    // Paginate the data
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedData = initialProducts.slice(startIndex, endIndex)

    const totalPages = Math.ceil(initialProducts.length / itemsPerPage)

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <div className="py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedData.map((product) => (
                    <Link
                        href={`/products/${product.id}`}
                        key={product.id}
                        className="p-4"
                    >
                        <Image
                            src={product.image}
                            alt={product.title}
                            width={320}
                            height={320}
                            className="object-contain mb-4 mx-auto h-80 w-auto"
                        />
                        <h2 className="text-sm">{product.title}</h2>
                        <p className="mt-2">${product.price}</p>
                    </Link>
                ))}
            </div>

            {/* Pagination controls */}
            <div className="mt-28 flex justify-center gap-2">
                {pageNumbers.map((number) => (
                    <Button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        variant={currentPage === number ? 'primary' : 'ghost'}
                    >
                        {number}
                    </Button>
                ))}
            </div>
        </div>
    )
}
