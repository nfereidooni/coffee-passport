'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUtensils, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

interface CoffeeShop {
  id: number;
  name: string;
  address: string;
  neighborhood: string;
  smallImage?: string;
  largeImage?: string;
  vibes?: string;
  googleRating?: number;
  description?: string;
  menuUrl?: string;
  website?: string;
  instagram?: string;
}

interface CoffeeShopDetailsProps {
  shop: CoffeeShop;
  descExpanded: boolean;
  onToggleDescription: () => void;
}

export function CoffeeShopDetails({
  shop,
  descExpanded,
  onToggleDescription,
}: CoffeeShopDetailsProps) {
  // For read more logic
  const fullDescription = shop.description || 'No description available.';
  const truncatedDescription =
    fullDescription.length > 150
      ? fullDescription.substring(0, 150) + '...'
      : fullDescription;

  return (
    <div className="w-full md:w-1/2 pr-6 border-r border-gray-300">
      {/* Basic Info */}
      <h1 className="text-3xl font-bold mb-2">{shop.name}</h1>
      <span className="inline-block bg-gray-800 text-white px-3 py-1 rounded-full text-sm mb-2">
        {shop.neighborhood}
      </span>
      <p className="text-gray-600">{shop.address}</p>

      {/* Images */}
      <div className="mt-4 flex gap-4">
        <Image
          src={shop.smallImage || '/images/placeholder.webp'}
          alt={shop.name}
          width={150}
          height={150}
          className="rounded-lg object-cover"
        />
        <Image
          src={shop.largeImage || '/images/placeholder.webp'}
          alt={shop.name}
          width={300}
          height={150}
          className="rounded-lg object-cover"
        />
      </div>

      {/* Rating & Vibes */}
      <p className="text-sm mt-2 flex items-center">
        <span className="font-bold mr-1">Rating:</span>
        <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
        <span className="ml-1">{shop.googleRating}</span>
      </p>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Vibes</h2>
        <p className="text-gray-700">{shop.vibes || 'No vibes recorded yet.'}</p>
      </div>

      {/* Description */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-1">Description</h2>
        <p className="text-gray-700">
          {descExpanded ? fullDescription : truncatedDescription}
        </p>
        {fullDescription.length > 150 && (
          <button
            onClick={onToggleDescription}
            className="text-blue-500 hover:underline mt-1"
          >
            {descExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </div>

      {/* Menu/Website/Instagram */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {shop.menuUrl && (
          <Link
            href={shop.menuUrl}
            target="_blank"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow-md transition-all"
          >
            <FontAwesomeIcon icon={faUtensils} className="mr-2" /> Menu
          </Link>
        )}
        {shop.website && (
          <Link
            href={shop.website}
            target="_blank"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow-md transition-all"
          >
            <FontAwesomeIcon icon={faGlobe} className="mr-2" /> Website
          </Link>
        )}
        {shop.instagram && (
          <Link
            href={shop.instagram}
            target="_blank"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow-md transition-all"
          >
            <FontAwesomeIcon icon={faInstagram} className="mr-2" /> Instagram
          </Link>
        )}
      </div>
    </div>
  );
}
