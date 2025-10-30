'use client';

import { useState } from 'react';
import { useEncrypt, useDecrypt } from '@fhevm/sdk/react';

export function EncryptionDemo() {
  const [value, setValue] = useState('42');
  const [type, setType] = useState<'euint8' | 'euint16' | 'euint32'>('euint32');

  const { encrypt, isEncrypting, result: encryptResult, error: encryptError } = useEncrypt();
  const { publicDecrypt, isDecrypting, result: decryptResult, error: decryptError } = useDecrypt();

  const handleEncrypt = async () => {
    try {
      await encrypt(Number(value), type);
    } catch (error) {
      console.error('Encryption failed:', error);
    }
  };

  const handleDecrypt = async () => {
    if (!encryptResult) return;
    try {
      await publicDecrypt(encryptResult.ciphertext, type);
    } catch (error) {
      console.error('Decryption failed:', error);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">FHE Encryption Demo</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Value to Encrypt
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter a number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            FHE Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="euint8">euint8 (0-255)</option>
            <option value="euint16">euint16 (0-65535)</option>
            <option value="euint32">euint32</option>
          </select>
        </div>

        <button
          onClick={handleEncrypt}
          disabled={isEncrypting}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isEncrypting ? 'Encrypting...' : 'Encrypt Value'}
        </button>

        {encryptError && (
          <div className="p-4 bg-red-100 border border-red-300 rounded-lg">
            <p className="text-red-700">Error: {encryptError.message}</p>
          </div>
        )}

        {encryptResult && (
          <div className="p-4 bg-green-100 border border-green-300 rounded-lg">
            <h3 className="font-semibold mb-2">Encrypted Result:</h3>
            <p className="break-all font-mono text-sm">{encryptResult.ciphertext}</p>
            <p className="mt-2 text-sm">Type: {encryptResult.type}</p>

            <button
              onClick={handleDecrypt}
              disabled={isDecrypting}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              {isDecrypting ? 'Decrypting...' : 'Decrypt'}
            </button>
          </div>
        )}

        {decryptResult && (
          <div className="p-4 bg-purple-100 border border-purple-300 rounded-lg">
            <h3 className="font-semibold mb-2">Decrypted Result:</h3>
            <p className="text-2xl font-bold">{decryptResult.value.toString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}
