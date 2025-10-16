/**
 * Core FHEVM Client
 * Framework-agnostic implementation for encryption and decryption
 */

import type {
  FhevmConfig,
  FhevmClient,
  EncryptedValue,
  DecryptionRequest,
  DecryptedValue,
  FheType,
} from '../types';

let globalInstance: FhevmClient | null = null;

/**
 * Initialize the FHEVM SDK
 * @param config Configuration options
 * @returns Initialized FhevmClient instance
 */
export async function initFhevm(config: FhevmConfig): Promise<FhevmClient> {
  if (globalInstance && globalInstance.isInitialized) {
    return globalInstance;
  }

  const client: FhevmClient = {
    config,
    isInitialized: false,
    encrypt: async (value, type) => encrypt(value, type, config),
    decrypt: async (request) => decrypt(request, config),
    publicDecrypt: async (ciphertext, type) => publicDecrypt(ciphertext, type, config),
    userDecrypt: async (request, signature) => userDecrypt(request, signature, config),
  };

  // Initialize connection to Gateway
  try {
    await testGatewayConnection(config.gatewayUrl);
    client.isInitialized = true;
    globalInstance = client;

    if (config.debug) {
      console.log('[FHEVM SDK] Initialized successfully', config);
    }

    return client;
  } catch (error) {
    throw new Error(`Failed to initialize FHEVM SDK: ${error}`);
  }
}

/**
 * Get the current FHEVM client instance
 */
export function getFhevmClient(): FhevmClient | null {
  return globalInstance;
}

/**
 * Encrypt a value using FHE
 */
async function encrypt(
  value: number | bigint | boolean,
  type: FheType,
  config: FhevmConfig
): Promise<EncryptedValue> {
  if (!validateInput(value, type)) {
    throw new Error(`Invalid input for type ${type}`);
  }

  try {
    // Convert value to bytes
    const bytes = valueToBytes(value, type);

    // Simulate encryption (in real implementation, this would use fhevmjs)
    const ciphertext = await performEncryption(bytes, type, config);

    if (config.debug) {
      console.log(`[FHEVM SDK] Encrypted ${type}:`, { value, ciphertext });
    }

    return {
      ciphertext,
      type,
    };
  } catch (error) {
    throw new Error(`Encryption failed: ${error}`);
  }
}

/**
 * Decrypt a ciphertext (requires signature)
 */
async function decrypt(
  request: DecryptionRequest,
  config: FhevmConfig
): Promise<DecryptedValue> {
  try {
    const response = await fetch(`${config.gatewayUrl}/decrypt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Gateway error: ${response.statusText}`);
    }

    const data = await response.json();

    if (config.debug) {
      console.log('[FHEVM SDK] Decrypted:', data);
    }

    return {
      value: parseDe cryptedValue(data.value, request.type),
      type: request.type,
    };
  } catch (error) {
    throw new Error(`Decryption failed: ${error}`);
  }
}

/**
 * Public decryption (no signature required)
 */
async function publicDecrypt(
  ciphertext: string,
  type: FheType,
  config: FhevmConfig
): Promise<DecryptedValue> {
  try {
    const response = await fetch(`${config.gatewayUrl}/public-decrypt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ciphertext, type }),
    });

    if (!response.ok) {
      throw new Error(`Gateway error: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      value: parseDecryptedValue(data.value, type),
      type,
    };
  } catch (error) {
    throw new Error(`Public decryption failed: ${error}`);
  }
}

/**
 * User decryption with EIP-712 signature
 */
async function userDecrypt(
  request: DecryptionRequest,
  signature: string,
  config: FhevmConfig
): Promise<DecryptedValue> {
  try {
    const response = await fetch(`${config.gatewayUrl}/user-decrypt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...request, signature }),
    });

    if (!response.ok) {
      throw new Error(`Gateway error: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      value: parseDecryptedValue(data.value, request.type),
      type: request.type,
    };
  } catch (error) {
    throw new Error(`User decryption failed: ${error}`);
  }
}

/**
 * Helper: Test Gateway connection
 */
async function testGatewayConnection(gatewayUrl: string): Promise<void> {
  try {
    const response = await fetch(`${gatewayUrl}/health`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Gateway health check failed');
    }
  } catch (error) {
    throw new Error(`Cannot connect to Gateway at ${gatewayUrl}`);
  }
}

/**
 * Helper: Validate input value for FHE type
 */
function validateInput(value: number | bigint | boolean, type: FheType): boolean {
  if (type === 'ebool') {
    return typeof value === 'boolean';
  }

  const numValue = typeof value === 'bigint' ? value : BigInt(value);

  switch (type) {
    case 'euint8':
      return numValue >= 0n && numValue <= 255n;
    case 'euint16':
      return numValue >= 0n && numValue <= 65535n;
    case 'euint32':
      return numValue >= 0n && numValue <= 4294967295n;
    case 'euint64':
      return numValue >= 0n && numValue <= 18446744073709551615n;
    default:
      return true;
  }
}

/**
 * Helper: Convert value to bytes
 */
function valueToBytes(value: number | bigint | boolean, type: FheType): Uint8Array {
  if (type === 'ebool') {
    return new Uint8Array([value ? 1 : 0]);
  }

  const numValue = typeof value === 'bigint' ? value : BigInt(value);
  const byteLength = getByteLengthForType(type);
  const bytes = new Uint8Array(byteLength);

  let tempValue = numValue;
  for (let i = 0; i < byteLength; i++) {
    bytes[i] = Number(tempValue & 0xFFn);
    tempValue >>= 8n;
  }

  return bytes;
}

/**
 * Helper: Get byte length for FHE type
 */
function getByteLengthForType(type: FheType): number {
  switch (type) {
    case 'euint8':
    case 'ebool':
      return 1;
    case 'euint16':
      return 2;
    case 'euint32':
      return 4;
    case 'euint64':
      return 8;
    case 'euint128':
      return 16;
    case 'euint256':
      return 32;
    default:
      return 32;
  }
}

/**
 * Helper: Perform encryption (placeholder for real fhevmjs integration)
 */
async function performEncryption(
  bytes: Uint8Array,
  type: FheType,
  config: FhevmConfig
): Promise<string> {
  // In real implementation, this would use fhevmjs library
  // For now, return a mock encrypted value
  const bytesHex = Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  return `0x${bytesHex}${type}`;
}

/**
 * Helper: Parse decrypted value
 */
function parseDecryptedValue(value: string, type: FheType): bigint | boolean | string {
  if (type === 'ebool') {
    return value === '1' || value === 'true';
  }

  if (type === 'eaddress') {
    return value;
  }

  return BigInt(value);
}
