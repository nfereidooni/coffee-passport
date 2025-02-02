'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons';

interface RatingCupsProps {
  rating: number | null;
  onRatingSelect: (value: number) => void;
}

export function RatingCups({ rating, onRatingSelect }: RatingCupsProps) {
  const cups = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-2 mt-1">
      {cups.map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => onRatingSelect(value)}
          className="focus:outline-none"
        >
          <FontAwesomeIcon
            icon={faMugSaucer}
            className={
              value <= (rating || 0)
                ? 'text-amber-500 text-2xl'
                : 'text-gray-400 text-2xl'
            }
          />
        </button>
      ))}
    </div>
  );
}
