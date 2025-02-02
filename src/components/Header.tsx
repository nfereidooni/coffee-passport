'use client';

import Image from 'next/image';

// Common header component
export default function Header() {
  return (
    <header className="p-4 text-center">
      <Image
        src="/images/logo.webp"
        alt="Toronto Coffee Passport Logo"
        width={150}
        height={69}
        className="mx-auto"
      />
    </header>
  );
}
