import { useState } from 'react';
import { ethers } from 'ethers';

interface CreateRequestProps {
  contract: ethers.Contract | null;
  onUpdate: (message: string, type?: 'info' | 'success' | 'error') => void;
  onSuccess: () => void;
}

function CreateRequest({ contract, onUpdate, onSuccess }: CreateRequestProps) {
  const [budget, setBudget] = useState('');
  const [bedrooms, setBedrooms] = useState('1');
  const [postalCode, setPostalCode] = useState('');
  const [propertyType, setPropertyType] = useState('1');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contract) {
      onUpdate('Please connect your wallet first.', 'error');
      return;
    }

    if (!budget || !postalCode) {
      onUpdate('Please fill in all required fields.', 'error');
      return;
    }

    setLoading(true);
    try {
      onUpdate('Creating encrypted request... Please confirm transaction in MetaMask.');

      const tx = await contract.createRequest(
        parseInt(budget),
        parseInt(bedrooms),
        parseInt(postalCode),
        parseInt(propertyType)
      );

      onUpdate('Transaction submitted. Waiting for confirmation...');
      await tx.wait();

      onUpdate('Request created successfully! Your preferences are encrypted on-chain.', 'success');

      // Clear form
      setBudget('');
      setPostalCode('');

      onSuccess();
    } catch (error: any) {
      console.error('Create request error:', error);
      onUpdate(`Failed to create request: ${error.reason || error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>🔍 Create Rental Request</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="requestBudget">Max Budget (USD):</label>
          <input
            type="number"
            id="requestBudget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="e.g. 1800"
            min="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="requestBedrooms">Minimum Bedrooms:</label>
          <select
            id="requestBedrooms"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          >
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4 Bedrooms</option>
            <option value="5">5+ Bedrooms</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="requestPostal">Preferred Postal Code:</label>
          <input
            type="number"
            id="requestPostal"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="e.g. 10001"
            min="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="requestType">Preferred Property Type:</label>
          <select
            id="requestType"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="1">Apartment</option>
            <option value="2">House</option>
            <option value="3">Studio</option>
          </select>
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Creating...' : 'Create Encrypted Request'}
        </button>
      </form>
    </div>
  );
}

export default CreateRequest;
