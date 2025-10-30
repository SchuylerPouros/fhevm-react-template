'use client';

import { useState } from 'react';
import { useEncrypt, useDecrypt } from '@fhevm/sdk/react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function BankingExample() {
  const [balance, setBalance] = useState('1000');
  const [amount, setAmount] = useState('100');

  const { encrypt, isEncrypting, result: encryptedBalance } = useEncrypt();
  const { publicDecrypt, isDecrypting, result: decryptedBalance } = useDecrypt();

  const handleEncryptBalance = async () => {
    await encrypt(Number(balance), 'euint32');
  };

  const handleCheckBalance = async () => {
    if (encryptedBalance) {
      await publicDecrypt(encryptedBalance.ciphertext, 'euint32');
    }
  };

  return (
    <Card title="Private Banking Example" className="max-w-2xl mx-auto">
      <p className="text-gray-600 mb-6">
        Encrypt account balance and perform private transactions
      </p>

      <div className="space-y-4">
        <Input
          type="number"
          label="Account Balance"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          placeholder="Enter balance"
        />

        <Button
          onClick={handleEncryptBalance}
          disabled={isEncrypting}
          variant="success"
          className="w-full"
        >
          {isEncrypting ? 'Encrypting...' : 'Encrypt Balance'}
        </Button>

        {encryptedBalance && (
          <div className="p-4 bg-green-100 border border-green-300 rounded-lg">
            <p className="text-sm font-medium mb-2">Encrypted Balance:</p>
            <p className="break-all font-mono text-xs">
              {encryptedBalance.ciphertext}
            </p>

            <Button
              onClick={handleCheckBalance}
              disabled={isDecrypting}
              variant="primary"
              className="mt-3 w-full"
            >
              {isDecrypting ? 'Checking...' : 'Check Balance'}
            </Button>
          </div>
        )}

        {decryptedBalance && (
          <div className="p-4 bg-blue-100 border border-blue-300 rounded-lg">
            <p className="text-sm font-medium">Current Balance:</p>
            <p className="text-2xl font-bold">${decryptedBalance.value.toString()}</p>
          </div>
        )}
      </div>
    </Card>
  );
}
