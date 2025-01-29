'use client';

import Image from 'next/image';
import coffeeShops from '@/app/data/coffeeShops.json';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface CoffeeShop {
  id: number;
  name: string;
  address: string;
  neighborhood: string;
  image?: string;
  notes?: string;
  vibes?: string;
  googleRating?: number;
  status?: string;
}

export default function CoffeeShopPage() {
  const params = useParams();
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (params?.id) {
      setId(params.id as string);
    }
  }, [params]);

  const shop: CoffeeShop | undefined = id ? coffeeShops.find(shop => shop.id === Number(id)) : undefined;

  if (!shop) {
    return <div className="text-center mt-10 text-xl">Coffee shop not found</div>;
  }

  return (
    <div className="min-h-screen bg-orange-100 text-black p-6">
      <header className="p-4 text-center">
        <Image src="/images/logo.webp" alt="Toronto Coffee Passport Logo" width={150} height={69} className="mx-auto" />
      </header>
      
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <button 
          onClick={() => window.history.back()} 
          className="mb-4 flex items-center text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg shadow-md transition-all"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
        </button>
        <h1 className="text-3xl font-bold mb-2">{shop.name}</h1>
        <p className="text-gray-600">{shop.address}, {shop.neighborhood}</p>
        {shop.image && (
          <div className="mt-4">
            <Image src={shop.image} alt={shop.name} width={600} height={400} className="rounded-lg" />
          </div>
        )}
        <p className="text-sm mt-2 flex items-center">
          <span className="font-bold mr-1">Rating:</span>
          <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
          <span className="ml-1">{shop.googleRating}</span>
        </p>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Notes</h2>
          <p className="text-gray-700">{shop.notes || 'No notes yet.'}</p>
        </div>
        <div className="mt-4 text-right">
          <button className="bg-black text-white px-4 py-2 rounded-lg">Log Visit</button>
        </div>
      </div>
    </div>
  );
}
