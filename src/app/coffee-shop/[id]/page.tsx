'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faMugHot } from '@fortawesome/free-solid-svg-icons';

import coffeeShops from '@/app/data/coffeeShops.json';
import { CoffeeShopDetails } from '@/components/CoffeeShopDetails';
import { VisitForm } from '@/components/VisitForm';
import Header from '@/components/Header';

export default function CoffeeShopPage() {
  const params = useParams();
  const [id, setId] = useState<string | null>(null);

  // Track the visit states
  const [visitInProgress, setVisitInProgress] = useState(false);
  const [visitLogged, setVisitLogged] = useState(false);

  // Data from the form
  const [selectedDate, setSelectedDate] = useState('');
  const [userRating, setUserRating] = useState<number | null>(null);
  const [userNotes, setUserNotes] = useState('');

  // For toggling the shop description
  const [descExpanded, setDescExpanded] = useState(false);

  useEffect(() => {
    if (params?.id) {
      setId(params.id as string);
    }
  }, [params]);

  // Locate the shop in JSON
  const shop = id
    ? coffeeShops.find((s) => s.id === Number(id))
    : undefined;

  // If invalid ID or not found
  if (!shop) {
    return (
      <div className="text-center mt-10 text-xl">
        <p>Coffee shop not found</p>
        <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">
          Return to Home
        </Link>
      </div>
    );
  }

  // Handler for starting a visit
  const handleStartVisit = () => {
    setVisitInProgress(true);
  };

  // Called when the user submits the VisitForm
  const handleSubmitVisit = (date: string, rating: number, notes: string) => {
    setSelectedDate(date);
    setUserRating(rating);
    setUserNotes(notes);
    setVisitInProgress(false);
    setVisitLogged(true);
  };

  return (
    <div className="min-h-screen bg-orange-100 text-black p-6 flex flex-col items-center">
      {/* Header / Logo */}
      <Header />

      {/* Back Button Above Layout */}
      <div className="w-2/3 mb-4">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg shadow-md transition-all"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
        </button>
      </div>

      <div className="w-2/3 bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row relative">
        {/* Left Side - CoffeeShopDetails */}
        <CoffeeShopDetails
          shop={shop}
          descExpanded={descExpanded}
          onToggleDescription={() => setDescExpanded((prev) => !prev)}
        />

        {/* Right Side - Stamps & Log Visit */}
        <div className="w-full md:w-1/2 md:pl-6 flex flex-col items-center justify-center min-h-[400px] relative mt-6 md:mt-0">
          {/* Stamp in top-right */}
          <div className="absolute top-2 right-2 flex items-center justify-center w-14 h-14 border-2 border-dashed border-gray-400">
            {visitLogged ? (
              <FontAwesomeIcon icon={faMugHot} className="text-gray-600 text-3xl" />
            ) : (
              <p className="text-xs text-gray-600 text-center">PLACE STAMP HERE</p>
            )}
          </div>

          {/* If not started & not logged */}
          {!visitInProgress && !visitLogged && (
            <button
              onClick={handleStartVisit}
              className="bg-black text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-800 transition-all"
            >
              Log Visit
            </button>
          )}

          {/* If in progress */}
          {visitInProgress && !visitLogged && (
            <VisitForm onSubmit={handleSubmitVisit} />
          )}

          {/* If completed */}
          {visitLogged && (
            <div className="text-center">
              <p className="text-lg font-semibold">Visited on: {selectedDate || 'N/A'}</p>
              <p className="text-lg">Your Rating: {userRating || 'N/A'}</p>
              <p className="mt-2 text-gray-700">{userNotes || 'No additional notes.'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
