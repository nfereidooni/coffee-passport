'use client';

import Image from 'next/image';
import coffeeShops from '@/app/data/coffeeShops.json';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowLeft, faStamp } from '@fortawesome/free-solid-svg-icons';

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
  const [visitLogged, setVisitLogged] = useState(false);
  const [visitDate, setVisitDate] = useState<string | null>(null);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [userNotes, setUserNotes] = useState<string>('');

  useEffect(() => {
    if (params?.id) {
      setId(params.id as string);
    }
  }, [params]);

  const shop: CoffeeShop | undefined = id ? coffeeShops.find(shop => shop.id === Number(id)) : undefined;

  if (!shop) {
    return <div className="text-center mt-10 text-xl">Coffee shop not found</div>;
  }

  const handleLogVisit = () => {
    setVisitLogged(true);
    setVisitDate(new Date().toLocaleDateString());
  };

  return (
    <div className="min-h-screen bg-orange-100 text-black p-6 flex flex-col items-center">
      <header className="p-4 text-center">
        <Image src="/images/logo.webp" alt="Toronto Coffee Passport Logo" width={150} height={69} className="mx-auto" />
      </header>
      
      <div className="w-2/3 mx-auto bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row relative">
        {/* Left Side - Coffee Shop Details */}
        <div className="w-full md:w-1/2 pr-6 border-r border-gray-300">
          <button 
            onClick={() => window.history.back()} 
            className="mb-4 flex items-center text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg shadow-md transition-all"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
          </button>
          <h1 className="text-3xl font-bold mb-2">{shop.name}</h1>
          <p className="text-gray-600">{shop.address}, {shop.neighborhood}</p>
          <div className="mt-4 w-full h-64 relative">
            <Image 
              src={shop.image || '/images/placeholder.webp'} 
              alt={shop.name} 
              layout="fill" 
              objectFit="cover" 
              className="rounded-lg" 
            />
          </div>
          <p className="text-sm mt-2 flex items-center">
            <span className="font-bold mr-1">Rating:</span>
            <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
            <span className="ml-1">{shop.googleRating}</span>
          </p>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Vibes</h2>
            <p className="text-gray-700">{shop.vibes || 'No vibes recorded yet.'}</p>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Notes</h2>
            <p className="text-gray-700">{shop.notes || 'No notes yet.'}</p>
          </div>
        </div>

        {/* Right Side - Log Visit & Stamps */}
        <div className="w-full md:w-1/2 pl-6 flex flex-col items-center justify-center min-h-[400px] relative">
          <div className="absolute top-2 right-2 flex items-center justify-center w-14 h-14 border-2 border-dashed border-gray-400">
            {visitLogged ? (
              <FontAwesomeIcon icon={faStamp} className="text-gray-600 text-3xl" />
            ) : (
              <p className="text-xs text-gray-600 text-center">PLACE STAMP HERE</p>
            )}
          </div>
          {!visitLogged ? (
            <button 
              onClick={handleLogVisit} 
              className="bg-black text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-800 transition-all"
            >
              Log Visit
            </button>
          ) : (
            <div className="text-center">
              <p className="text-lg font-semibold">Visited on: {visitDate}</p>
              {uploadedPhoto && <Image src={uploadedPhoto} alt="Uploaded" width={200} height={200} className="mt-4 rounded-lg" />}
              <p className="mt-2 text-gray-700">{userNotes || 'No additional notes.'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
