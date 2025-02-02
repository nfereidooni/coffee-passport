'use client';

import { useState } from 'react';
import { RatingCups } from './RatingCups';

interface VisitFormProps {
  onSubmit: (date: string, rating: number, notes: string) => void;
}

export function VisitForm({ onSubmit }: VisitFormProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [userNotes, setUserNotes] = useState('');
  const [userRating, setUserRating] = useState<number | null>(null);

  // Separate error messages for each field
  const [dateError, setDateError] = useState('');
  const [ratingError, setRatingError] = useState('');

  const handleSubmit = () => {
    setDateError('');
    setRatingError('');

    let isValid = true;

    if (!selectedDate) {
      setDateError('Please select a date.');
      isValid = false;
    }

    if (!userRating) {
      setRatingError('Please select a rating.');
      isValid = false;
    }

    if (!isValid) return;

    // If valid
    onSubmit(selectedDate, userRating!, userNotes);
  };

  return (
    <div className="text-center w-full max-w-sm">
      {/* Date of Visit */}
      <label className="block text-left mt-2">
        <span className="text-gray-700 font-semibold">
          Date of Visit <span className="text-red-500">*</span>
        </span>
        <input
          type="date"
          className="border w-full px-3 py-2 mt-1 rounded"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        {dateError && (
          <p className="text-xs text-red-500 mt-1">{dateError}</p>
        )}
      </label>

      {/* Coffee Cup Rating Scale */}
      <div className="block text-left mt-2">
        <span className="text-gray-700 font-semibold">
          Your Rating (1-5) <span className="text-red-500">*</span>
        </span>
        <RatingCups
          rating={userRating}
          onRatingSelect={(value) => setUserRating(value)}
        />
        {ratingError && (
          <p className="text-xs text-red-500 mt-1">{ratingError}</p>
        )}
      </div>

      {/* Notes */}
      <label className="block text-left mt-2">
        <span className="text-gray-700 font-semibold">Notes</span>
        <textarea
          className="border w-full px-3 py-2 mt-1 rounded"
          placeholder="Add notes here..."
          value={userNotes}
          onChange={(e) => setUserNotes(e.target.value)}
        ></textarea>
      </label>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition-all"
      >
        Submit
      </button>
    </div>
  );
}
