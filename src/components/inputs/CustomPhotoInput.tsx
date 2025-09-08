'use client';

import React from 'react';
import { ImagePlus } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

export type CustomPhotoInputValueType = {
  image: string;
  isUrl: boolean;
};

interface CustomPhotoInputProps {
  onChange: (imageDataUrls: CustomPhotoInputValueType[]) => void;
  value?: CustomPhotoInputValueType[];
  maxFiles?: number;
  disabled?: boolean;
}

export function CustomPhotoInput({ onChange, value = [], maxFiles = 5, disabled }: CustomPhotoInputProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const readFileAsDataURL = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Check file size - if too large, resize; otherwise use original
        const fileSize = file.size / 1024 / 1024; // MB

        if (fileSize > 2) {
          // If larger than 2MB, resize
          const img = document.createElement('img');
          img.onload = () => {
            // Calculate new size while keeping aspect ratio, max 800x800
            const maxDim = 800;
            let width = img.width;
            let height = img.height;
            if (width > maxDim || height > maxDim) {
              if (width > height) {
                height = Math.round((height * maxDim) / width);
                width = maxDim;
              } else {
                width = Math.round((width * maxDim) / height);
                height = maxDim;
              }
            }
            // Create canvas to resize image
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              resolve(reader.result as string);
              return;
            }
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            // Convert to data URL with lowest reasonable quality
            const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.1);
            resolve(resizedDataUrl);
          };
          img.onerror = () => {
            // If image loading fails, use original
            resolve(reader.result as string);
          };
          img.src = reader.result as string;
        } else {
          // Use original image if smaller than 2MB
          resolve(reader.result as string);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const validFiles = files.filter((file) => validTypes.includes(file.type));

    if (validFiles.length === 0) {
      toast.error('Lütfen geçerli bir resim dosyası seçin (jpeg, png, jpg)');
      return;
    }

    const oversizedFiles = validFiles.filter((file) => file.size > 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast.error("1MB'dan büyük fotoğraflar yüklenemez");
      return;
    }

    if (value.length + validFiles.length > maxFiles) {
      toast.error(`En fazla ${maxFiles} fotoğraf yükleyebilirsiniz`);
      return;
    }

    try {
      const dataUrls = await Promise.all(validFiles.map((file) => readFileAsDataURL(file)));
      onChange([...value, ...dataUrls.map((url) => ({ image: url, isUrl: false }))]);
    } catch (err) {}

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        onChange={handleFileChange}
        disabled={disabled || value.length >= maxFiles}
        multiple
        className="hidden"
      />
      <Button
        variant="outline"
        size="icon"
        className="rounded-full"
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled || value.length >= maxFiles}
      >
        <ImagePlus className="h-4 w-4" />
      </Button>
    </div>
  );
}
