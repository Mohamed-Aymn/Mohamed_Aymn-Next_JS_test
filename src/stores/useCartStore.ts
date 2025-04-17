import { create } from 'zustand'
import { persist } from 'zustand/middleware'


interface IProduct {
    id: number,
    count: number
}

interface ICartStore {
    products: Array<IProduct>
    addProduct: (id: number, count: number) => void
    removeProduct: (id: number) => void
    increaseCount: (id: number) => void
    decreaseCount: (id: number) => void
    getCount: (id: number) => number
}

const useStore = create<ICartStore>()(
    persist(
        (set, get) => ({
            products: [],

            addProduct: (id: number, count: number) =>
                set((state) => {
                    const existingProduct = state.products.find((product) => product.id === id)
                    if (existingProduct) return state

                    return {
                        products: [...state.products, { id, count }],
                    }
                }),

            removeProduct: (id: number) =>
                set((state) => ({
                    products: state.products.filter((product) => product.id !== id),
                })),

            increaseCount: (id: number) =>
                set((state) => ({
                    products: state.products.map((product) =>
                        product.id === id ? { ...product, count: product.count + 1 } : product
                    ),
                })),

            decreaseCount: (id: number) =>
                set((state) => ({
                    products: state.products.map((product) =>
                        product.id === id && product.count > 1
                            ? { ...product, count: product.count - 1 }
                            : product
                    ),
                })),

            getCount: (id) => {
                const product = get().products.find((p) => p.id === id);
                return product?.count ?? 1;
            },
        }),
        {
            name: 'cart-storage', // localStorage key name
        }
    )
)

export default useStore
