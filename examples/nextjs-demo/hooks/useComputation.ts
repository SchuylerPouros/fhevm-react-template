'use client';

import { useState, useCallback } from 'react';
import { useEncrypt } from '@fhevm/sdk/react';

export interface ComputationResult {
  operation: string;
  operand1: any;
  operand2: any;
  encrypted1?: any;
  encrypted2?: any;
}

export function useComputation() {
  const { encrypt } = useEncrypt();
  const [isComputing, setIsComputing] = useState(false);
  const [result, setResult] = useState<ComputationResult | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const compute = useCallback(async (
    value1: number,
    value2: number,
    operation: 'add' | 'sub' | 'mul' | 'div',
    type: 'euint8' | 'euint16' | 'euint32' = 'euint32'
  ) => {
    setIsComputing(true);
    setError(null);
    setResult(null);

    try {
      // Encrypt both operands
      const encrypted1 = await encrypt(value1, type);
      const encrypted2 = await encrypt(value2, type);

      setResult({
        operation,
        operand1: value1,
        operand2: value2,
        encrypted1,
        encrypted2,
      });

      return {
        operation,
        encrypted1,
        encrypted2,
      };
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Computation failed');
      setError(error);
      throw error;
    } finally {
      setIsComputing(false);
    }
  }, [encrypt]);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    compute,
    isComputing,
    result,
    error,
    reset,
  };
}
