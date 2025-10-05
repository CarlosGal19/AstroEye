'use client';

import { IImageCard } from '@/types/Components';
import Image from 'next/image';

export default function ImageCard({ image }: IImageCard) {
  return (
    <div className="flex flex-col items-center rounded-xl p-4 w-full max-w-sm">
      <div className="w-full aspect-square relative">
        <Image
          src={image.base64}
          alt={image.title || 'Untitled Image'}
          fill
          unoptimized
          className="object-contain rounded-lg"
        />
      </div>
      <h2 className="text-lg font-semibold mt-3 text-white text-center">
        {image.title || ''}
      </h2>
    </div>
  );
}
