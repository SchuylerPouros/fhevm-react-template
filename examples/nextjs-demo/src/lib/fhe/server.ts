import { initFhevm } from '@fhevm/sdk/core';
import type { FhevmClient } from '@fhevm/sdk/types';

let serverFhevmInstance: FhevmClient | null = null;

export async function getServerFhevmClient(): Promise<FhevmClient> {
  if (!serverFhevmInstance) {
    serverFhevmInstance = await initFhevm({
      network: 'sepolia',
      gatewayUrl: process.env.GATEWAY_URL || 'https://gateway.zama.ai',
      debug: process.env.NODE_ENV === 'development',
    });
  }
  return serverFhevmInstance;
}

export async function serverEncrypt(value: number, type: string) {
  const fhevm = await getServerFhevmClient();
  return fhevm.encrypt(value, type);
}

export async function serverDecrypt(ciphertext: string, type: string) {
  const fhevm = await getServerFhevmClient();
  return fhevm.publicDecrypt(ciphertext, type);
}
