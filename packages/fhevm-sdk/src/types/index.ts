/**
 * Type definitions for FHEVM SDK
 */

export type FheType = 'euint8' | 'euint16' | 'euint32' | 'euint64' | 'euint128' | 'euint256' | 'ebool' | 'eaddress';

export interface FhevmConfig {
  network: 'sepolia' | 'mainnet' | 'localhost';
  gatewayUrl: string;
  aclAddress?: string;
  kmsVerifierAddress?: string;
  chainId?: number;
  debug?: boolean;
}

export interface EncryptedInput {
  data: Uint8Array;
  type: FheType;
}

export interface EncryptedValue {
  ciphertext: string;
  type: FheType;
}

export interface DecryptionRequest {
  ciphertext: string;
  type: FheType;
  contractAddress: string;
}

export interface DecryptedValue {
  value: bigint | boolean | string;
  type: FheType;
}

export interface FhevmClient {
  config: FhevmConfig;
  isInitialized: boolean;
  encrypt: (value: number | bigint | boolean, type: FheType) => Promise<EncryptedValue>;
  decrypt: (request: DecryptionRequest) => Promise<DecryptedValue>;
  publicDecrypt: (ciphertext: string, type: FheType) => Promise<DecryptedValue>;
  userDecrypt: (request: DecryptionRequest, signature: string) => Promise<DecryptedValue>;
}

export interface EIP712Domain {
  name: string;
  version: string;
  chainId: number;
  verifyingContract: string;
}

export interface EIP712Message {
  ciphertext: string;
  contractAddress: string;
}

export interface EncryptionError extends Error {
  code: 'ENCRYPTION_FAILED' | 'INVALID_INPUT' | 'NETWORK_ERROR';
  originalError?: Error;
}

export interface DecryptionError extends Error {
  code: 'DECRYPTION_FAILED' | 'SIGNATURE_REQUIRED' | 'INVALID_CIPHERTEXT' | 'NETWORK_ERROR';
  originalError?: Error;
}
