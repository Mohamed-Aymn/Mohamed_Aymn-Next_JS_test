"use client"

import useCartStore from '@/stores/useCartStore'
import React from 'react'

function AddToCartButton({ productId }: { productId: number }) {
    const { addProduct } = useCartStore()
    return (
        <button onClick={() => addProduct(productId)}>Add to cart</button>
    )
}

export default AddToCartButton