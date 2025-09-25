import { useState, useEffect, useCallback } from 'react';

interface UseLocationPermissionReturn {
  hasPermission: boolean | null;
  isChecking: boolean;
  requestPermission: () => Promise<boolean>;
  checkPermission: () => Promise<void>;
}

export const useLocationPermission = (): UseLocationPermissionReturn => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  const checkPermission = useCallback(async (): Promise<void> => {
    try {
      if (!navigator.geolocation) {
        setHasPermission(false);
        setIsChecking(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        () => {
          setHasPermission(true);
          setIsChecking(false);
        },
        (error) => {
          setHasPermission(false);
          setIsChecking(false);
        },
        {
          enableHighAccuracy: false,
          timeout: 3000,
          maximumAge: 300000
        }
      );
    } catch (error) {
      setHasPermission(false);
      setIsChecking(false);
    }
  }, []);

  const requestPermission = async (): Promise<boolean> => {
    try {
      if (!navigator.geolocation) {
        return false;
      }

      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          () => {
            setHasPermission(true);
            resolve(true);
          },
          (error) => {
            setHasPermission(false);
            resolve(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
          }
        );
      });
    } catch (error) {
      setHasPermission(false);
      return false;
    }
  };

  useEffect(() => {
    checkPermission();

    if ('permissions' in navigator) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((permission) => {
          // İlk durumu ayarla
          if (permission.state === 'granted') {
            setHasPermission(true);
          } else if (permission.state === 'denied') {
            setHasPermission(false);
          }

          // Değişiklikleri dinle
          permission.addEventListener('change', () => {
            if (permission.state === 'granted') {
              setHasPermission(true);
            } else if (permission.state === 'denied') {
              setHasPermission(false);
            }
          });
        })
        .catch(() => {
          // Permissions API çalışmazsa sadece ilk kontrolü yap
        });
    }
  }, [checkPermission]);

  return {
    hasPermission,
    isChecking,
    requestPermission,
    checkPermission
  };
};
