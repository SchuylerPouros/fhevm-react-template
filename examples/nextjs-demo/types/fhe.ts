export interface EncryptedValue {
  ciphertext: string;
  type: string;
  timestamp: number;
}

export interface DecryptedValue {
  value: bigint;
  type: string;
  timestamp: number;
}

export interface FhevmConfig {
  network: 'sepolia' | 'mainnet';
  gatewayUrl: string;
  debug?: boolean;
}

export interface ComputationRequest {
  operation: 'add' | 'sub' | 'mul' | 'div';
  operands: number[];
  types: string[];
}

export interface ComputationResult {
  operation: string;
  encryptedOperands: EncryptedValue[];
  result?: EncryptedValue;
}

export type FheType = 'euint8' | 'euint16' | 'euint32' | 'euint64' | 'euint128';

export interface KeyInfo {
  publicKey: string;
  timestamp: number;
}
