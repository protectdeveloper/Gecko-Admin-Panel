'use client';

import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { MapPin, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocationPermission } from '@/hooks/useLocationPermission';

const LocationPermissionRequest = () => {
  const { t } = useTranslation();
  const { checkPermission } = useLocationPermission();

  const handleRequestPermission = async () => {
    try {
      if (!navigator.geolocation) {
        toast.error(t('devices.browserNotSupportLocation'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        () => {
          toast.success(t('devices.locationPermissionGranted'));
          setTimeout(() => {
            checkPermission();
          }, 500);
        },
        (error) => {
          // Hata koduna göre kullanıcıya bilgi ver
          if (error.code === error.PERMISSION_DENIED) {
            toast.error(t('devices.locationPermissionDenied'));
            setTimeout(() => {
              checkPermission();
            }, 500);
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            toast.error(t('devices.locationUnavailable'));
          } else if (error.code === error.TIMEOUT) {
            toast.error(t('devices.locationTimeout'));
          } else {
            toast.error(t('devices.locationError'));
          }
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } catch (error) {
      toast.error(t('devices.checkBrowserSettings'));
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 p-8 rounded-lg border-2 border-dashed border-border">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="p-4 bg-blue-100 rounded-full">
          <MapPin className="w-8 h-8 text-blue-600" />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold ">{t('devices.locationPermissionRequired')}</h3>
          <p className="text-sm text-muted-foreground max-w-md">{t('devices.locationPermissionDescription')}</p>
        </div>

        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg max-w-md">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-left">
            <p className="text-xs font-medium text-blue-800">{t('devices.securityTitle')}</p>
            <p className="text-xs text-blue-700">{t('devices.securityDescription')}</p>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3">
        <div className="flex flex-row gap-3">
          <Button onClick={handleRequestPermission} className="flex-1" size="sm">
            {t('devices.giveLocationPermission')}
          </Button>

          <Button
            variant="link"
            className="flex-1"
            size="sm"
            onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))}
          >
            {t('devices.later')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationPermissionRequest;
