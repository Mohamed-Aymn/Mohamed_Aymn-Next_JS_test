import React from 'react'

function QuantityButton({ productId, className }: { productId: number; className?: string }) {
    return (
        <div className={`${className} flex flex-col justify-between`}>
            <div className='grid grid-cols-3 border-gray-[#eee] border-2 h-full'>
                <button>-</button>
                <button>1</button>
                <button>+</button>
            </div>
        </div>
    )
}

export default QuantityButton