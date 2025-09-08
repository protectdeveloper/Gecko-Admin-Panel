'use client';

import React, { useState } from 'react';
import { ImagePlus } from 'lucide-react';
import { Button } from '../ui/button';

interface CustomPhotoInputProps {
  onChange: (imageDataUrls: string[]) => void;
  value?: string[];
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
            // Create canvas to resize image
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              resolve(reader.result as string);
              return;
            }

            // Set canvas size to 128x128 for better quality
            canvas.width = 128;
            canvas.height = 128;

            // Draw resized image
            ctx.drawImage(img, 0, 0, 128, 128);

            // Convert to data URL with good compression
            const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
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
      return;
    }

    if (value.length + validFiles.length > maxFiles) {
      return;
    }

    try {
      const dataUrls = await Promise.all(validFiles.map((file) => readFileAsDataURL(file)));
      onChange([...value, ...dataUrls]);
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
