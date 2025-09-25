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
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const cropX = Math.round(completedCrop.x * scaleX);
    const cropY = Math.round(completedCrop.y * scaleY);
    const cropWidth = Math.round(completedCrop.width * scaleX);
    const cropHeight = Math.round(completedCrop.height * scaleY);

    // Crop edilen alanı orijinal çözünürlükte döndür, çıktı formatı JPEG ve kalite 0.7
    const cropCanvas = document.createElement('canvas');
    cropCanvas.width = cropWidth;
    cropCanvas.height = cropHeight;
    const cropCtx = cropCanvas.getContext('2d');
    if (!cropCtx) return;
    cropCtx.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
    const croppedDataUrl = cropCanvas.toDataURL('image/jpeg', 0.5);
    onCrop({ originalImage: croppedDataUrl, thumbnailImage: croppedDataUrl });
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
