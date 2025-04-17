import AddToCartButton from '@/components/AddToCartButton'
import React from 'react'

// Define the product type
type Product = {
    id: number
    title: string
    image: string
    price: number
    description: string
    rating: {
        rate: number,
        count: number
    }
}

interface ProductPageProps {
    product: Product
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
    const { rate, count } = product.rating;

    // Helper function to render stars based on the rating
    const renderStars = (rating: number) => {
        const totalStars = 5;
        const filledStars = Math.round(rating); // Round the rating to the nearest integer
        const emptyStars = totalStars - filledStars;

        return (
            <div className="flex items-center">
                {/* Render filled stars */}
                {Array.from({ length: filledStars }).map((_, index) => (
                    <span key={`filled-${index}`} className="text-yellow-500">★</span>
                ))}
                {/* Render empty stars */}
                {Array.from({ length: emptyStars }).map((_, index) => (
                    <span key={`empty-${index}`} className="text-gray-300">★</span>
                ))}
                {rate}
            </div>
        )
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
            <img
                src={product.image}
                alt={product.title}
                className="h-64 object-contain mb-4"
            />
            <p className="mb-4">{product.description}</p>
            <p className="text-blue-600 font-bold">${product.price}</p>
            
            {/* Display rating stars and count */}
            <div className="mt-2">
                {renderStars(rate)}
                <span className="ml-2 text-sm text-gray-500">({count} reviews)</span>
            </div>

            <AddToCartButton productId={product.id} />
        </div>
    )
}

// Fetch data server-side based on the URL id
export async function generateMetadata({ params }: { params: { id: string } }) {
    const res = await fetch(`https://fakestoreapi.com/products/${params.id}`)
    const product: Product = await res.json()

    return {
        title: product.title,
        description: product.description,
    }
}

// Fetch product data for server-side rendering
export async function ProductPageServerSide({ params }: { params: { id: string } }) {
    const res = await fetch(`https://fakestoreapi.com/products/${params.id}`)
    const product: Product = await res.json()

    return (
        <ProductPage product={product} />
    )
}

export default ProductPageServerSide
