import { initFhevm } from '@fhevm/sdk/core';
import type { FhevmClient, EncryptedValue } from '@fhevm/sdk/types';

let fhevmInstance: FhevmClient | null = null;

export async function getFhevmClient(): Promise<FhevmClient> {
  if (!fhevmInstance) {
    fhevmInstance = await initFhevm({
      network: 'sepolia',
      gatewayUrl: process.env.NEXT_PUBLIC_GATEWAY_URL || 'https://gateway.zama.ai',
      debug: process.env.NODE_ENV === 'development',
    });
  }
  return fhevmInstance;
}

export async function encryptValue(
  value: number,
  type: 'euint8' | 'euint16' | 'euint32' = 'euint32'
): Promise<EncryptedValue> {
  const client = await getFhevmClient();
  return client.encrypt(value, type);
}

export async function decryptValue(
  ciphertext: string,
  type: string
): Promise<bigint> {
  const client = await getFhevmClient();
  const result = await client.publicDecrypt(ciphertext, type);
  return result.value;
}
