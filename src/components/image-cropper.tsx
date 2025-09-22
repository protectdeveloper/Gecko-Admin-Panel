'use client';

import React from 'react';
import ReactCrop, { centerCrop, makeAspectCrop, type Crop, type PixelCrop } from 'react-image-crop';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import 'react-image-crop/dist/ReactCrop.css';
import './image-cropper.css';
import { CropIcon } from 'lucide-react';
import { FileWithPreview } from './inputs/PhotoInput';

interface ImageCropResult {
  originalImage: string;
  thumbnailImage: string;
}

interface ImageCropperProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedFile: FileWithPreview | null;
  onCrop: (result: ImageCropResult) => void;
  onCancel: () => void;
}

export function ImageCropper({ open, onOpenChange, selectedFile, onCrop, onCancel }: ImageCropperProps) {
  const aspect = 1;
  const imgRef = React.useRef<HTMLImageElement | null>(null);
  const [crop, setCrop] = React.useState<Crop>();
  const [completedCrop, setCompletedCrop] = React.useState<PixelCrop | null>(null);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height, naturalWidth, naturalHeight } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  function handleCropSave() {
    if (!completedCrop || !imgRef.current) return;
    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const cropWidth = completedCrop.width * scaleX;
    const cropHeight = completedCrop.height * scaleY;
    canvas.width = cropWidth;
    canvas.height = cropHeight;
    ctx.drawImage(image, completedCrop.x * scaleX, completedCrop.y * scaleY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
    // Original image (128x128)
    const originalCanvas = document.createElement('canvas');
    const originalCtx = originalCanvas.getContext('2d');
    originalCanvas.width = 128;
    originalCanvas.height = 128;
    originalCtx?.drawImage(canvas, 0, 0, 128, 128);
    const originalDataUrl = originalCanvas.toDataURL('image/jpeg', 0.9);
    // Thumbnail (64x64)
    const thumbnailCanvas = document.createElement('canvas');
    const thumbnailCtx = thumbnailCanvas.getContext('2d');
    thumbnailCanvas.width = 64;
    thumbnailCanvas.height = 64;
    thumbnailCtx?.drawImage(canvas, 0, 0, 64, 64);
    const thumbnailUrl = thumbnailCanvas.toDataURL('image/jpeg', 0.8);
    onCrop({ originalImage: originalDataUrl, thumbnailImage: thumbnailUrl });
    onOpenChange(false);
  }

  const handleCancel = () => {
    onCancel();
    onOpenChange(false);
  };

  if (!selectedFile) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="gap-4 flex flex-col items-center justify-center p-6"
        style={{ maxWidth: '96vw', maxHeight: '90vh', width: 'auto', height: 'auto' }}
      >
        <DialogTitle className="mb-2 text-center w-full">{'Fotoğrafı Kırp'}</DialogTitle>
        <div className="flex items-center justify-center w-full" style={{ minHeight: 200 }}>
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1}
            circularCrop
            className="max-w-full max-h-[60vh]"
          >
            <img
              ref={imgRef}
              src={selectedFile.preview}
              style={{
                maxHeight: '60vh',
                maxWidth: '60vw',
                objectFit: 'contain',
                display: 'block',
                margin: '0 auto',
                borderRadius: '8px',
                background: '#f3f3f3'
              }}
              alt="Kırpılacak resim"
              onLoad={onImageLoad}
            />
          </ReactCrop>
        </div>
        <DialogFooter className="pt-2 justify-center gap-4 w-full">
          <DialogClose asChild>
            <Button size={'sm'} type="reset" className="w-fit" variant={'outline'} onClick={handleCancel}>
              İptal
            </Button>
          </DialogClose>
          <Button type="submit" size={'sm'} className="w-fit" onClick={handleCropSave}>
            <CropIcon className="mr-1.5 size-4" />
            Kaydet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Helper function to center the crop
export function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number): Crop {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 50,
        height: 50
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}
