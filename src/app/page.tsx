import Image from "next/image";
import coffeeShops from "./data/coffeeShops.json";

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
        <h1 className="text-2xl font-bold text-center mb-6">Welcome to Coffee Passport</h1>
      </main>
    </div>
  );
}
