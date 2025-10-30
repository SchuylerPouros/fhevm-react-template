'use client';

import { useState } from 'react';
import { useFhevm, useEncrypt, useDecrypt } from '@fhevm/sdk/react';

export default function Home() {
  const { isInitialized, isInitializing } = useFhevm();
  const { encrypt, isEncrypting, result: encryptResult } = useEncrypt();
  const { publicDecrypt, isDecrypting, result: decryptResult } = useDecrypt();

  const [value, setValue] = useState('42');
  const [type, setType] = useState<'euint8' | 'euint16' | 'euint32'>('euint32');

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

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Initializing FHEVM SDK...</div>
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Failed to initialize FHEVM SDK</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-4 text-center">
          🔐 FHEVM SDK Demo
        </h1>
        <p className="text-xl text-blue-200 mb-12 text-center">
          Next.js 14 + FHEVM SDK Example
        </p>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">Encryption Example</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-white mb-2">Value to Encrypt</label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30"
                placeholder="Enter a number"
              />
            </div>

            <div>
              <label className="block text-white mb-2">FHE Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30"
              >
                <option value="euint8">euint8 (0-255)</option>
                <option value="euint16">euint16 (0-65535)</option>
                <option value="euint32">euint32</option>
              </select>
            </div>

            <button
              onClick={handleEncrypt}
              disabled={isEncrypting}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isEncrypting ? 'Encrypting...' : 'Encrypt Value'}
            </button>

            {encryptResult && (
              <div className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Encrypted Result:</h3>
                <p className="text-green-200 break-all font-mono text-sm">
                  {encryptResult.ciphertext}
                </p>
                <p className="text-green-300 mt-2">Type: {encryptResult.type}</p>
              </div>
            )}
          </div>
        </div>

        {encryptResult && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 mt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Decryption Example</h2>

            <button
              onClick={handleDecrypt}
              disabled={isDecrypting}
              className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isDecrypting ? 'Decrypting...' : 'Public Decrypt'}
            </button>

            {decryptResult && (
              <div className="mt-4 p-4 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Decrypted Result:</h3>
                <p className="text-purple-200 text-2xl font-bold">
                  {decryptResult.value.toString()}
                </p>
                <p className="text-purple-300 mt-2">Type: {decryptResult.type}</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-12 text-center text-white/60 text-sm">
          <p>This demo uses the Universal FHEVM SDK</p>
          <p className="mt-2">
            <a
              href="https://github.com/SchuylerPouros/fhevm-react-template"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              View SDK Documentation
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
