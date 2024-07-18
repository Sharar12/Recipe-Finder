import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-900 px-4">
      <h1 className="text-4xl font-bold text-white sm:text-5xl">
        Recipe Finder
      </h1>
      <p className="max-w-md text-center text-gray-400">
        Discover, save, and share your favorite recipes with a simple and clean interface.
      </p>
      <Link
        href="/recipes"
        className="rounded-lg bg-orange-600 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-700"
      >
        Browse Recipes
      </Link>
    </div>
  );
}
