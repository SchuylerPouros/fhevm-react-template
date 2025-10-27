export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface EncryptRequest {
  value: number;
  type: string;
}

export interface DecryptRequest {
  ciphertext: string;
  type: string;
  signature?: string;
  contractAddress?: string;
}

export interface ComputeRequest {
  operation: 'add' | 'sub' | 'mul' | 'div';
  operands: number[];
  types: string[];
}

export interface EncryptResponse {
  ciphertext: string;
  type: string;
}

export interface DecryptResponse {
  value: string;
  type: string;
}

export interface ComputeResponse {
  operation: string;
  encryptedOperands: Array<{
    ciphertext: string;
    type: string;
  }>;
}
