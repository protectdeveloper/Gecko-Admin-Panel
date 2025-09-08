'use client';
import { GetSupportUserTicketMessagesByIdDTO } from '@/api/Support/Support.types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import React, { useState } from 'react';

interface MessagePhotoGalleryProps {
  msg: GetSupportUserTicketMessagesByIdDTO['data'][0];
}

const MessagePhotoGallery = ({ msg }: MessagePhotoGalleryProps) => {
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  return (
    <div>
      {msg.photos && msg.photos.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {msg.photos.slice(0, 2).map((photo, index) => (
            <div className="relative" key={index}>
              <img
                src={photo.image}
                alt={`Message Photo ${index + 1}`}
                className="w-24 h-24 object-cover rounded-md cursor-pointer"
                onClick={() => setShowGallery(true)}
              />
              {index === 1 && msg.photos.length > 2 && (
                <div
                  className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-md cursor-pointer text-white text-lg font-bold"
                  onClick={() => setShowGallery(true)}
                >
                  +{msg.photos.length - 2}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showGallery && msg.photos && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setShowGallery(false)}>
          <Button
            size={'icon'}
            className="absolute p-0 w-7 h-7 top-4 right-4 text-white text-3xl font-bold"
            onClick={(e) => {
              e.stopPropagation();
              setShowGallery(false);
            }}
            aria-label="Kapat"
          >
            <X className="h-6 w-6" />
          </Button>

          <div className="flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img
                src={msg.photos[galleryIndex].image}
                alt={`Gallery Photo ${galleryIndex + 1}`}
                className="max-w-[80vw] max-h-[70vh] rounded-lg shadow-lg"
                onClick={(e) => e.stopPropagation()}
              />

              {msg.photos.length > 1 && (
                <>
                  <Button
                    size={'icon'}
                    className="w-7 h-7 absolute left-1 top-1/2 cursor-pointer -translate-y-1/2 bg-black/50 text-white rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setGalleryIndex((prev) => (prev - 1 + msg.photos.length) % msg.photos.length);
                    }}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    size={'icon'}
                    className="w-7 h-7 absolute right-1 top-1/2 cursor-pointer -translate-y-1/2 bg-black/50 text-white rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setGalleryIndex((prev) => (prev + 1) % msg.photos.length);
                    }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
            <div className="flex gap-2 mt-4">
              {msg.photos.map((photo, idx) => (
                <img
                  key={idx}
                  src={photo.image}
                  alt={`Thumb ${idx + 1}`}
                  className={`w-12 h-12 object-cover rounded cursor-pointer ${galleryIndex === idx && 'border-2 border-primary'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setGalleryIndex(idx);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagePhotoGallery;
