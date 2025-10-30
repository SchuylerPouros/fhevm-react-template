/**
 * Vue 3 adapter for FHEVM SDK
 * Provides Composition API composables for Vue applications
 */

import { ref, computed, onMounted, type Ref } from 'vue';
import { initFhevm } from '../core';
import type {
  FhevmClient,
  FhevmConfig,
  EncryptedValue,
  DecryptedValue,
} from '../types';

/**
 * Vue composable for FHEVM initialization
 */
export function useFhevmVue(config: FhevmConfig) {
  const fhevm: Ref<FhevmClient | null> = ref(null);
  const isInitializing = ref(true);
  const error: Ref<Error | null> = ref(null);

  const isInitialized = computed(() => fhevm.value !== null);

  onMounted(async () => {
    try {
      fhevm.value = await initFhevm(config);
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Initialization failed');
    } finally {
      isInitializing.value = false;
    }
  });

  return {
    fhevm: computed(() => fhevm.value),
    isInitialized,
    isInitializing: computed(() => isInitializing.value),
    error: computed(() => error.value),
  };
}

/**
 * Vue composable for encryption
 */
export function useEncryptVue() {
  const isEncrypting = ref(false);
  const result: Ref<EncryptedValue | null> = ref(null);
  const error: Ref<Error | null> = ref(null);

  const encrypt = async (
    fhevm: FhevmClient,
    value: number | bigint,
    type: 'euint8' | 'euint16' | 'euint32' | 'euint64' | 'euint128'
  ) => {
    isEncrypting.value = true;
    error.value = null;
    result.value = null;

    try {
      result.value = await fhevm.encrypt(value, type);
      return result.value;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Encryption failed');
      throw error.value;
    } finally {
      isEncrypting.value = false;
    }
  };

  const reset = () => {
    result.value = null;
    error.value = null;
  };

  return {
    encrypt,
    isEncrypting: computed(() => isEncrypting.value),
    result: computed(() => result.value),
    error: computed(() => error.value),
    reset,
  };
}

/**
 * Vue composable for decryption
 */
export function useDecryptVue() {
  const isDecrypting = ref(false);
  const result: Ref<DecryptedValue | null> = ref(null);
  const error: Ref<Error | null> = ref(null);

  const publicDecrypt = async (
    fhevm: FhevmClient,
    ciphertext: string,
    type: string
  ) => {
    isDecrypting.value = true;
    error.value = null;
    result.value = null;

    try {
      result.value = await fhevm.publicDecrypt(ciphertext, type);
      return result.value;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Decryption failed');
      throw error.value;
    } finally {
      isDecrypting.value = false;
    }
  };

  const userDecrypt = async (
    fhevm: FhevmClient,
    ciphertext: string,
    type: string,
    signature: string,
    contractAddress: string
  ) => {
    isDecrypting.value = true;
    error.value = null;
    result.value = null;

    try {
      result.value = await fhevm.userDecrypt(
        ciphertext,
        type,
        signature,
        contractAddress
      );
      return result.value;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Decryption failed');
      throw error.value;
    } finally {
      isDecrypting.value = false;
    }
  };

  const reset = () => {
    result.value = null;
    error.value = null;
  };

  return {
    publicDecrypt,
    userDecrypt,
    isDecrypting: computed(() => isDecrypting.value),
    result: computed(() => result.value),
    error: computed(() => error.value),
    reset,
  };
}
