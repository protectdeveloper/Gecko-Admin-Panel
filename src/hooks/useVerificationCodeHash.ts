import { useCallback } from 'react';
import { toast } from 'sonner';

interface UseVerificationCodeHashReturn {
  verifyCode: (code: string, storedHash: string, storedSalt: string) => Promise<boolean>;
  computeHash: (code: string, salt: string) => Promise<string>;
}

export const useVerificationCodeHash = (): UseVerificationCodeHashReturn => {
  // Base64 string'i Uint8Array'e çevir
  const base64ToBytes = useCallback((base64: string): Uint8Array => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }, []);

  // Uint8Array'i Base64 string'e çevir
  const bytesToBase64 = useCallback((bytes: Uint8Array): string => {
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }, []);

  // HMAC-SHA512 hesapla
  const computeHMACSHA512 = useCallback(async (key: Uint8Array, data: string): Promise<Uint8Array> => {
    const cryptoKey = await crypto.subtle.importKey('raw', key.buffer as ArrayBuffer, { name: 'HMAC', hash: 'SHA-512' }, false, [
      'sign'
    ]);

    const encoder = new TextEncoder();
    const signature = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(data));
    return new Uint8Array(signature);
  }, []);

  // PBKDF2 hesapla
  const computePBKDF2 = useCallback(
    async (password: Uint8Array, salt: Uint8Array, iterations: number, keyLength: number): Promise<Uint8Array> => {
      const cryptoKey = await crypto.subtle.importKey('raw', password.buffer as ArrayBuffer, { name: 'PBKDF2' }, false, [
        'deriveBits'
      ]);

      const derivedBits = await crypto.subtle.deriveBits(
        {
          name: 'PBKDF2',
          salt: salt.buffer as ArrayBuffer,
          iterations: iterations,
          hash: 'SHA-512'
        },
        cryptoKey,
        keyLength * 8
      );

      return new Uint8Array(derivedBits);
    },
    []
  );

  // Hash hesapla (C#'daki ComputeHash fonksiyonunun JavaScript versiyonu)
  const computeHash = useCallback(
    async (code: string, salt: string): Promise<string> => {
      try {
        const saltBytes = base64ToBytes(salt);

        // Pre-salt password: Convert.ToBase64String(salt) + password
        const preSaltPassword = bytesToBase64(saltBytes) + code;

        // Post-salt password: password + Convert.ToBase64String(salt)
        const postSaltPassword = code + bytesToBase64(saltBytes);

        // HMAC-SHA512 ile first pass hash hesapla
        const firstPassHash = await computeHMACSHA512(saltBytes, preSaltPassword);

        // PBKDF2 ile final hash hesapla (100000 iterations, 64 bytes)
        const finalHash = await computePBKDF2(firstPassHash, saltBytes, 100000, 64);

        return bytesToBase64(finalHash);
      } catch (error) {
        toast.error('Hash hesaplama hatası');
        throw new Error('Hash hesaplanamadı');
      }
    },
    [base64ToBytes, bytesToBase64, computeHMACSHA512, computePBKDF2]
  );

  // Şifre doğrula (C#'daki VerifyPassword fonksiyonunun JavaScript versiyonu)
  const verifyCode = useCallback(
    async (code: string, storedHash: string, storedSalt: string): Promise<boolean> => {
      try {
        const computedHash = await computeHash(code, storedSalt);
        return computedHash === storedHash;
      } catch (error) {
        toast.error('Kod doğrulama hatası');
        return false;
      }
    },
    [computeHash]
  );

  return {
    verifyCode,
    computeHash
  };
};
