import { redirect } from 'next/navigation';

export default function Home() {
  // Perform the redirect immediately during server-side rendering.
  redirect('/products');

  return (
    <main>
      Main page
    </main>
  );
}