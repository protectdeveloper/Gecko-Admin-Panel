'use client';

import Image from 'next/image';
import { ImageCropper } from '../image-cropper';
import React, { useCallback, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { AlertDialogHeader } from '@/components/ui/alert-dialog';
import { formatAvatarFallback } from '@/utils/formatAvatarFallback';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';

export type FileWithPreview = FileWithPath & {
  preview: string;
};

interface PhotoInputProps {
  value?: string;
  previewImage?: string;
  onChange?: (value: { originalImage: string; thumbnailImage: string }) => void;
  onDeletePhotoPress?: () => void;
  firstName?: string;
  lastName?: string;
  disabled?: boolean;
}

export function PhotoInput({
  value,
  previewImage,
  onChange,
  onDeletePhotoPress,
  firstName,
  lastName,
  disabled
}: PhotoInputProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openPreviewImage, setOpenPreviewImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileWithPreview | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const validExtensions = ['.jpg', '.jpeg', '.png'];
      const fileName = file.name.toLowerCase();
      const hasValidExtension = validExtensions.some((ext) => fileName.endsWith(ext));
      const hasValidType = validTypes.includes(file.type);
      if (!hasValidExtension || !hasValidType) {
        setError('Geçersiz dosya türü');
        return;
      }
      setError(null);
      const fileWithPreview = Object.assign(file, {
        preview: URL.createObjectURL(file)
      });
      setSelectedFile(fileWithPreview);
      setDialogOpen(true);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png']
    },
    maxFiles: 1
  });

  const handleCrop = (result: { originalImage: string; thumbnailImage: string }) => {
    onChange?.(result);
    setSelectedFile(null);
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setDialogOpen(false);
  };

  const handleAvatarClick = () => {
    if (previewImage) {
      setOpenPreviewImage(true);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div onClick={handleAvatarClick} className={disabled ? '' : 'cursor-pointer'}>
        <Avatar className="size-20 border-2 border-border">
          <AvatarImage src={value || undefined} alt="User Avatar" />
          <AvatarFallback>{formatAvatarFallback(firstName || '', lastName || '')}</AvatarFallback>
        </Avatar>
      </div>

      {!disabled && (
        <div className="flex items-center gap-2">
          <div
            {...getRootProps()}
            className={`cursor-pointer p-2 bg-muted rounded-lg transition-colors ${isDragActive ? 'bg-muted' : ''}`}
          >
            <input {...getInputProps()} />
            <p className="text-sm font-semibold text-muted-foreground">{isDragActive ? 'Buraya Bırakın' : 'Fotoğraf Yükleyin'}</p>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>
          <Button size={'icon'} variant={'destructive'} className="w-min h-min text-white p-2" onClick={onDeletePhotoPress}>
            <Trash2 size={20} />
          </Button>
        </div>
      )}

      <ImageCropper
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        selectedFile={selectedFile}
        onCrop={handleCrop}
        onCancel={handleCancel}
      />

      <Dialog open={openPreviewImage} onOpenChange={setOpenPreviewImage}>
        <DialogContent
          className="gap-4 flex flex-col items-center justify-center p-6"
          style={{ maxWidth: '96vw', maxHeight: '90vh', width: 'auto', height: 'auto' }}
        >
          <AlertDialogHeader>
            <DialogTitle className="hidden" />
            <DialogDescription className="hidden" />
          </AlertDialogHeader>

          {previewImage && (
            <Image src={previewImage} alt="Preview" width={470} height={400} className="rounded-md object-contain" />
          )}

          {!previewImage && (
            <div className="w-full h-72 flex items-center justify-center bg-gray-200 rounded-md">
              <span className="text-gray-500">No preview available</span>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
