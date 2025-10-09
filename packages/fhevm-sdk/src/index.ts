/**
 * FHEVM SDK - Universal SDK for Fully Homomorphic Encryption
 *
 * @packageDocumentation
 */

// Core exports (framework-agnostic)
export { initFhevm, getFhevmClient } from './core';

// React exports
export { FhevmProvider, useFhevm, useEncrypt, useDecrypt } from './react';

// Type exports
export type {
  FhevmConfig,
  FhevmClient,
  FheType,
  EncryptedValue,
  DecryptedValue,
  DecryptionRequest,
  EIP712Domain,
  EIP712Message,
  EncryptionError,
  DecryptionError,
} from './types';

export type {
  FhevmProviderProps,
  UseFhevmReturn,
  UseEncryptReturn,
  UseDecryptReturn,
} from './react';
