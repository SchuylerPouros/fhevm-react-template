'use client';

import { useState } from 'react';
import { useFhevm } from '@fhevm/sdk/react';

export function KeyManager() {
  const { fhevm, isInitialized } = useFhevm();
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetPublicKey = async () => {
    if (!fhevm) return;
    setLoading(true);
    setError(null);
    try {
      const key = await fhevm.getPublicKey();
      setPublicKey(key);
    } catch (err) {
      setError('Failed to get public key');
      console.error('Failed to get public key:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isInitialized) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <p className="text-gray-600">FHEVM not initialized</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Key Management</h2>

      <button
        onClick={handleGetPublicKey}
        disabled={loading}
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Get Public Key'}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {publicKey && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">Public Key:</h3>
          <p className="break-all font-mono text-sm">{publicKey}</p>
        </div>
      )}
    </div>
  );
}
