# Mohamed Aymn - Nest JS test

## Tech Stack
- **Language**: Typescript (as preferred)
- **Styles**: Tailwind (as preferred)
- **State Management**: Zustand (as suggested)
- **Handling Request States**: React Query

## Approach Explaination

### Products Page (Home Page)

I attempted to implement the page similar to how Amazon does it, with the initial product listing being server-side rendered (SSR) for better performance and SEO, followed by client-side updates when page pagination changes. However, the API endpoint I'm working with returns all products at once and doesn't support server-side filtering or pagination. As a result, I have to fetch all the data up front and handle the pagination entirely on the client side.


### Client State in Cart Page

When the cart is empty, a content shift issue occurs, the page initially renders with the skeleton of the cart table, then updates after hydration once the client state is available. This happens because the page is rendered entirely on the client side, which is expected behavior in client-side rendering: the app loads state and becomes interactive afterward.

In our case, we're using Zustand to manage client-side state, which loads from `sessionStorage`. This means the perceived layout shift is noticeable when the cart is empty (since the no items in the cart message is hidden at first) than when it's filled (as the structure remains stable).

This is handled using a client state, I introduced a hasHydrated flag in the Zustand store to track when the state has finished hydrating. his allows us to reach that final result and prevent premature content shift as possible.

```ts
interface ICartStore {
    products: Array<IProduct>
    // ...
    hasHydrated: boolean
    setHasHydrated: (state: boolean) => void
}
```

This can be handled using many way such as not rendered the table, not the empty cart message but render a loading spinner till the cliet state is loaded, so it is a UX/UI design choice and the codebase is built to hanlde all of that.

### SEO
Imporeved the search engine visibility and social sharing experience especially in the product page, I made sure to set relevant meta tags for each product page. This includes dynamically generating the title and description based on the individual product's data using Next.js's generateMetadata function.

### Responsiveness

Ensured the UI gracefully adapts to mobile screen sizes without layout breaks or crashing. While the task didn't include specific design requirements for mobile views, I implemented a flexible layout using utility-first CSS (e.g., Tailwind) to prevent content overflow and major rendering issues. This ensures the application remains functional and visually consistent on smaller devices, even if no dedicated mobile styling or design decisions were made.

