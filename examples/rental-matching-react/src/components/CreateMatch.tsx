import { useState } from 'react';
import { ethers } from 'ethers';

interface CreateMatchProps {
  contract: ethers.Contract | null;
  onUpdate: (message: string, type?: 'info' | 'success' | 'error') => void;
  onSuccess: () => void;
}

function CreateMatch({ contract, onUpdate, onSuccess }: CreateMatchProps) {
  const [listingId, setListingId] = useState('');
  const [requestId, setRequestId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contract) {
      onUpdate('Please connect your wallet first.', 'error');
      return;
    }

    if (!listingId || !requestId) {
      onUpdate('Please enter both listing ID and request ID.', 'error');
      return;
    }

    setLoading(true);
    try {
      onUpdate('Creating match... Please confirm transaction in MetaMask.');

      const tx = await contract.createMatch(parseInt(listingId), parseInt(requestId));

      onUpdate('Transaction submitted. Waiting for confirmation...');
      await tx.wait();

      onUpdate('Match created successfully! Both parties can now confirm the match.', 'success');

      // Clear form
      setListingId('');
      setRequestId('');

      onSuccess();
    } catch (error: any) {
      console.error('Create match error:', error);
      onUpdate(`Failed to create match: ${error.reason || error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>⚡ Match Properties</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="matchListingId">Your Listing ID:</label>
          <input
            type="number"
            id="matchListingId"
            value={listingId}
            onChange={(e) => setListingId(e.target.value)}
            placeholder="Enter your listing ID"
            min="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="matchRequestId">Request ID to Match:</label>
          <input
            type="number"
            id="matchRequestId"
            value={requestId}
            onChange={(e) => setRequestId(e.target.value)}
            placeholder="Enter request ID"
            min="1"
          />
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Creating Match...' : 'Create Match'}
        </button>
      </form>
    </div>
  );
}

export default CreateMatch;
