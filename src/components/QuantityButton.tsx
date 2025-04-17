"use client"

import useCartStore from '@/stores/useCartStore';
import React from 'react'

interface IQuanityButtonProps {
    quantity: number;
    className?: string;
    increaseCount: (id?: number) => void;
    decreaseCount: (id?: number) => void;
}

function QuantityButton({ quantity, className, increaseCount, decreaseCount }: IQuanityButtonProps){
    // const { increaseCount, decreaseCount, products } = useCartStore()
    // const quantity = products.find((p) => p.id === productId)?.count ?? 1;

    return (
        <div className={`${className} flex flex-col justify-between`}>
            <div className="grid grid-cols-3  border h-fit w-32">
                <button onClick={() => decreaseCount()} className="w-full py-1 text-lg scale-175">-</button>
                <button className="w-full py-1 text-lg">{quantity.toString().padStart(2, '0')}</button>
                <button onClick={() => increaseCount()} className="w-full py-1 text-lg scale-125">+</button>
            </div>
        </div>
    )
}

export default QuantityButton