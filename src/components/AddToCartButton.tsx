"use client"

import useCartStore from '@/stores/useCartStore'
import React from 'react'
import Button from './Button'

function AddToCartButton({ productId, className }: { productId: number; className?: string }) {
    const { addProduct } = useCartStore()
    return (
        <Button
            variant='outline'
            onClick={() => addProduct(productId)}
            className={`${className} w-full`}
        >
            Add to cart
        </Button>
    )
}

export default AddToCartButton