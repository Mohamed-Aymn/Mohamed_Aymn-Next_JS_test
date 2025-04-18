"use client"

import useCartStore from '@/stores/useCartStore'
import React from 'react'
import Button from '../../../components/ui/Button'

function AddToCartButton({ productId, className, quantity }: { productId: number; className?: string, quantity: number }) {
    const { addProduct } = useCartStore()
    return (
        <Button
            variant='outline'
            onClick={() => addProduct(productId, quantity)}
            className={`${className} w-full`}
        >
            Add to cart
        </Button>
    )
}

export default AddToCartButton