'use client';

import { useState } from 'react';
import { useEncrypt, useDecrypt } from '@fhevm/sdk/react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function MedicalExample() {
  const [patientData, setPatientData] = useState('98');
  const [dataType, setDataType] = useState<'heartRate' | 'bloodPressure' | 'temperature'>('heartRate');

  const { encrypt, isEncrypting, result: encryptedData } = useEncrypt();
  const { publicDecrypt, isDecrypting, result: decryptedData } = useDecrypt();

  const handleEncryptData = async () => {
    await encrypt(Number(patientData), 'euint16');
  };

  const handleDecryptData = async () => {
    if (encryptedData) {
      await publicDecrypt(encryptedData.ciphertext, 'euint16');
    }
  };

  const getDataLabel = () => {
    switch (dataType) {
      case 'heartRate':
        return 'Heart Rate (BPM)';
      case 'bloodPressure':
        return 'Blood Pressure (mmHg)';
      case 'temperature':
        return 'Temperature (°F)';
      default:
        return 'Medical Data';
    }
  };

  return (
    <Card title="Private Medical Records" className="max-w-2xl mx-auto">
      <p className="text-gray-600 mb-6">
        Securely encrypt and store sensitive patient health data
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Data Type
          </label>
          <select
            value={dataType}
            onChange={(e) => setDataType(e.target.value as any)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="heartRate">Heart Rate</option>
            <option value="bloodPressure">Blood Pressure</option>
            <option value="temperature">Body Temperature</option>
          </select>
        </div>

        <Input
          type="number"
          label={getDataLabel()}
          value={patientData}
          onChange={(e) => setPatientData(e.target.value)}
          placeholder="Enter value"
        />

        <Button
          onClick={handleEncryptData}
          disabled={isEncrypting}
          variant="primary"
          className="w-full"
        >
          {isEncrypting ? 'Encrypting...' : 'Encrypt Medical Data'}
        </Button>

        {encryptedData && (
          <div className="p-4 bg-blue-100 border border-blue-300 rounded-lg">
            <p className="text-sm font-medium mb-2">Encrypted Medical Record:</p>
            <p className="break-all font-mono text-xs mb-3">
              {encryptedData.ciphertext}
            </p>
            <p className="text-xs text-gray-600 mb-3">
              This encrypted data can be safely stored on-chain while maintaining patient privacy.
            </p>

            <Button
              onClick={handleDecryptData}
              disabled={isDecrypting}
              variant="success"
              className="w-full"
            >
              {isDecrypting ? 'Decrypting...' : 'Authorized Access (Decrypt)'}
            </Button>
          </div>
        )}

        {decryptedData && (
          <div className="p-4 bg-green-100 border border-green-300 rounded-lg">
            <p className="text-sm font-medium">{getDataLabel()}:</p>
            <p className="text-2xl font-bold">{decryptedData.value.toString()}</p>
          </div>
        )}
      </div>
    </Card>
  );
}
