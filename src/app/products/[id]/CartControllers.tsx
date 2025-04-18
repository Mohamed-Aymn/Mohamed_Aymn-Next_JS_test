'use client'

import React, { useState } from 'react'
import QuantityButton from '../../../components/QuantityButton'
import AddToCartButton from './AddToCartButton'

function CartControllers({productId}: {productId: number}) {
    const [count, setCount] = useState(1)

    return (
        <>
            <QuantityButton
                className="col-span-2"
                increaseCount={() => setCount(count + 1)}
                decreaseCount={() => setCount(count - 1)}
                quantity={count}
            />
            <AddToCartButton
                className="col-span-6"
                productId={productId}
                quantity={count}
            />

        </>
    )
}

export default CartControllers