import Image from "next/image";
import Link from "next/link"; // For navigation
import coffeeShops from "./data/coffeeShops.json";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

// Define the CoffeeShop type
type CoffeeShop = {
  id: number;
  name: string;
  address: string;
  neighborhood: string;
  image: string;
  vibes: string;
  googleRating: number;
  status: string;
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-orange-100 text-black">
      {/* Logo */}
      <header className="p-4">
        <Image
          src="/images/logo.webp"
          alt="Toronto Coffee Passport Logo"
          width={150}
          height={69}
          className="mx-auto"
        />
      </header>

      {/* Main Content */}
      <main className="p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome to Toronto Coffee Passport</h1>

        {/* Coffee Shop List */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {coffeeShops.map((shop: CoffeeShop) => (
            <Link
              key={shop.id}
              href={`/coffee-shop/${shop.id}`}
              className="relative block border rounded-lg shadow-lg hover:shadow-xl p-4 transition bg-white"
            >
              <div className="flex flex-col items-center">
                {/* Stamp Placeholder */}
                <div className="absolute top-2 right-2 w-14 h-14 border-2 border-dashed border-gray-400 flex items-center justify-center">
                  <p className="text-xs text-gray-600 text-center">PLACE STAMP HERE</p>
                </div>

                {/* Coffee Shop Image */}
                <Image
                  src={shop.image}
                  alt={`${shop.name} Image`}
                  width={150}
                  height={150}
                  className="mb-4 rounded-md"
                />

                {/* Coffee Shop Info */}
                <h2 className="text-lg font-semibold">{shop.name}</h2>
                <p className="text-gray-600 text-sm">{shop.neighborhood}</p>
                <p className="text-sm mt-2 flex items-center">
                  <span className="font-bold mr-1">Rating:</span>
                  <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                  <span className="ml-1">{shop.googleRating}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
