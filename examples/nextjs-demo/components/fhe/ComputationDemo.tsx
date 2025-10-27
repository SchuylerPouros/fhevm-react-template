'use client';

import { useState } from 'react';
import { useComputation } from '@/hooks/useComputation';

export function ComputationDemo() {
  const [value1, setValue1] = useState('10');
  const [value2, setValue2] = useState('20');
  const [operation, setOperation] = useState<'add' | 'sub' | 'mul' | 'div'>('add');

  const { compute, isComputing, result, error } = useComputation();

  const handleCompute = async () => {
    try {
      await compute(Number(value1), Number(value2), operation, 'euint32');
    } catch (error) {
      console.error('Computation failed:', error);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">FHE Computation Demo</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              First Value
            </label>
            <input
              type="number"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Second Value
            </label>
            <input
              type="number"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Operation
          </label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value as any)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="add">Addition (+)</option>
            <option value="sub">Subtraction (-)</option>
            <option value="mul">Multiplication (×)</option>
            <option value="div">Division (÷)</option>
          </select>
        </div>

        <button
          onClick={handleCompute}
          disabled={isComputing}
          className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isComputing ? 'Computing...' : 'Encrypt and Compute'}
        </button>

        {error && (
          <div className="p-4 bg-red-100 border border-red-300 rounded-lg">
            <p className="text-red-700">Error: {error.message}</p>
          </div>
        )}

        {result && (
          <div className="p-4 bg-indigo-100 border border-indigo-300 rounded-lg">
            <h3 className="font-semibold mb-2">Encrypted Operands:</h3>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Operation:</strong> {result.operation}
              </p>
              <p className="break-all">
                <strong>Operand 1 ({result.operand1}):</strong> {result.encrypted1?.ciphertext}
              </p>
              <p className="break-all">
                <strong>Operand 2 ({result.operand2}):</strong> {result.encrypted2?.ciphertext}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
