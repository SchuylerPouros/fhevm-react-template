/**
 * Core FHEVM SDK exports
 * Framework-agnostic functionality
 */

export { initFhevm, getFhevmClient } from './client';
export type {
  FhevmConfig,
  FhevmClient,
  FheType,
  EncryptedValue,
  DecryptedValue,
  DecryptionRequest,
  EIP712Domain,
  EIP712Message,
} from '../types';
