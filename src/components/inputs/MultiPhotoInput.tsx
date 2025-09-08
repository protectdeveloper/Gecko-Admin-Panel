'use client';

import React, { Fragment, useRef, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { ImagePlus, X, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';

type MultiPhotoInputValue = {
  image: string;
  isUrl: boolean;
};

type ViewMode = 'single' | 'carousel' | 'carousel-multi' | 'grid3' | 'grid5';

type MultiPhotoInputProps = {
  value: MultiPhotoInputValue[];
  onChange?: (images: MultiPhotoInputValue[]) => void;
  limit?: number;
  viewMode?: ViewMode;
};

const MultiPhotoInput: React.FC<MultiPhotoInputProps> = ({ value = [], onChange, limit = 5, viewMode = 'single' }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkInput, setLinkInput] = useState('');

  const triggerFileInput = () => {
    if (!onChange || value.length >= limit) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;
    const files = e.target.files;
    if (!files) return;

    const availableSlots = limit - value.length;
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    const validFiles = Array.from(files)
      .filter((file) => allowedTypes.includes(file.type))
      .slice(0, availableSlots);

    const readFilesAsDataURL = (files: File[]): Promise<MultiPhotoInputValue[]> => {
      return Promise.all(
        files.map(
          (file) =>
            new Promise<MultiPhotoInputValue>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                // Check file size - if too large, resize; otherwise use original
                const fileSize = file.size / 1024 / 1024; // MB

                if (fileSize > 2) {
                  // If larger than 2MB, resize
                  const img = new Image();
                  img.onload = () => {
                    // Create canvas to resize image
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    if (!ctx) {
                      resolve({ image: reader.result as string, isUrl: false });
                      return;
                    }

                    // Set canvas size to 64x64 for smaller file size
                    canvas.width = 64;
                    canvas.height = 64;

                    // Draw resized image
                    ctx.drawImage(img, 0, 0, 128, 128);

                    // Convert to data URL with much lower quality (0.4)
                    const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.4);
                    resolve({ image: resizedDataUrl, isUrl: false });
                  };
                  img.onerror = () => {
                    // If image loading fails, use original
                    resolve({ image: reader.result as string, isUrl: false });
                  };
                  img.src = reader.result as string;
                } else {
                  // Use original image if smaller than 2MB
                  resolve({ image: reader.result as string, isUrl: false });
                }
              };
              reader.onerror = reject;
              reader.readAsDataURL(file);
            })
        )
      );
    };

    readFilesAsDataURL(validFiles)
      .then((newImages) => {
        onChange([...value, ...newImages]);
      })
      .catch(() => {
        toast.error('Yükleme Hatası');
      });

    if (files.length > availableSlots) {
      toast.warning(`Maksimum ${availableSlots} fotoğraf yüklenebilir.`);
    }

    e.target.value = '';
  };

  const handleRemoveImage = (index: number) => {
    if (!onChange) return;
    const removed = value[index];
    if (!removed.isUrl) {
      URL.revokeObjectURL(removed.image);
    }
    onChange(value.filter((_, i) => i !== index));
  };

  const handleAddLink = () => {
    if (!onChange) return;
    if (!linkInput.trim()) {
      toast.error('Lütfen bir link girin.');
      return;
    }
    if (!isValidUrl(linkInput.trim())) {
      toast.error('Geçersiz link.');
      return;
    }
    if (value.length >= limit) {
      toast.warning(`Maksimum ${limit} fotoğraf yüklenebilir.`);
      return;
    }
    onChange([...value, { image: linkInput.trim(), isUrl: true }]);
    setLinkInput('');
    setShowLinkDialog(false);
  };

  const renderAddButtons = () => (
    <div className="flex flex-col items-center justify-center gap-2">
      <span className="text-sm text-muted-foreground">Fotoğraf yüklemeniz önerilir.</span>

      <Button type="button" variant={'outline'} onClick={triggerFileInput}>
        <ImagePlus className="w-4 h-4 mr-1" /> Fotoğraf Yükle
      </Button>
      <Button type="button" variant={'outline'} onClick={() => setShowLinkDialog(true)}>
        <LinkIcon className="w-4 h-4 mr-1" /> Link Ekle
      </Button>
    </div>
  );

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="w-full space-y-4">
      <input
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <AlertDialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Fotoğraf Linki Ekle</AlertDialogTitle>
            <AlertDialogDescription>Bir Linki Girin.</AlertDialogDescription>
          </AlertDialogHeader>
          <input
            type="text"
            className="w-full border rounded px-2 py-1 mt-2"
            placeholder="https://..."
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
          />
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction onClick={handleAddLink}>Ekle</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {viewMode === 'grid3' || viewMode === 'grid5' ? (
        <div className={`grid ${viewMode === 'grid3' ? 'grid-cols-3' : 'grid-cols-5'} gap-4`}>
          {value?.map((src, idx) => (
            <div key={idx} className="relative w-full h-[150px]">
              <img
                src={src.image}
                alt={`photo ${idx + 1}`}
                width={150}
                height={150}
                className="w-full h-full object-cover rounded-md"
              />

              {onChange && (
                <Button
                  size="icon"
                  variant="default"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}

          {onChange && value.length < limit && (
            <div className="flex flex-col items-center justify-center border border-dashed rounded-md p-4 cursor-pointer">
              {renderAddButtons()}
            </div>
          )}
        </div>
      ) : (
        <div className="relative w-full overflow-hidden">
          <Carousel opts={{ align: 'start' }} className="w-full">
            <CarouselContent>
              {value.length === 0 && onChange ? (
                <CarouselItem className="basis-full">
                  <Card className="w-full h-[200px] flex items-center justify-center">
                    <CardContent className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
                      {renderAddButtons()}
                    </CardContent>
                  </Card>
                </CarouselItem>
              ) : (
                <Fragment>
                  {value.map((src, idx) => (
                    <CarouselItem
                      key={idx}
                      className={
                        viewMode === 'carousel-multi'
                          ? 'basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/2 xl:basis-1/3 2xl:basis-1/4'
                          : 'basis-full'
                      }
                    >
                      <Card className="relative w-full h-[200px] overflow-hidden p-0">
                        <CardContent className="w-full h-full p-0">
                          <img width={200} height={200} src={src.image} alt="Uploaded" className="object-cover w-full h-full" />

                          {onChange && (
                            <Button
                              size="icon"
                              variant="default"
                              onClick={() => handleRemoveImage(idx)}
                              className="absolute top-2 right-2 z-10 w-5 h-5 rounded-full text-white"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                  {onChange && value.length < limit && (
                    <CarouselItem
                      className={
                        viewMode === 'carousel-multi'
                          ? 'basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/2 xl:basis-1/3 2xl:basis-1/4'
                          : 'basis-full'
                      }
                    >
                      <Card className="w-full h-[200px] flex items-center justify-center cursor-pointer">
                        <CardContent className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
                          {renderAddButtons()}
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  )}
                </Fragment>
              )}
            </CarouselContent>

            <CarouselPrevious
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 z-10 text-black"
              style={{ backgroundColor: '#f1f1f1' }}
            />
            <CarouselNext
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 z-10 text-black"
              style={{ backgroundColor: '#f1f1f1' }}
            />
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default MultiPhotoInput;
