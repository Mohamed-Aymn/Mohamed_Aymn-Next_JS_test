import AddToCartButton from '@/components/AddToCartButton'
import React from 'react'

// Define the product type
type Product = {
    id: number
    title: string
    image: string
    price: number
    description: string
}

interface ProductPageProps {
    product: Product
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
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
