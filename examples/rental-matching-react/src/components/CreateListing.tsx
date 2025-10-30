import { useState } from 'react';
import { ethers } from 'ethers';

interface CreateListingProps {
  contract: ethers.Contract | null;
  onUpdate: (message: string, type?: 'info' | 'success' | 'error') => void;
  onSuccess: () => void;
}

function CreateListing({ contract, onUpdate, onSuccess }: CreateListingProps) {
  const [price, setPrice] = useState('');
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

    if (!price || !postalCode) {
      onUpdate('Please fill in all required fields.', 'error');
      return;
    }

    setLoading(true);
    try {
      onUpdate('Creating encrypted listing... Please confirm transaction in MetaMask.');

      const tx = await contract.createListing(
        parseInt(price),
        parseInt(bedrooms),
        parseInt(postalCode),
        parseInt(propertyType)
      );

      onUpdate('Transaction submitted. Waiting for confirmation...');
      await tx.wait();

      onUpdate('Listing created successfully! Your data is encrypted on-chain.', 'success');

      // Clear form
      setPrice('');
      setPostalCode('');

      onSuccess();
    } catch (error: any) {
      console.error('Create listing error:', error);
      onUpdate(`Failed to create listing: ${error.reason || error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>🏡 Create Property Listing</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="listingPrice">Monthly Rent (USD):</label>
          <input
            type="number"
            id="listingPrice"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. 1500"
            min="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="listingBedrooms">Bedrooms:</label>
          <select
            id="listingBedrooms"
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
          <label htmlFor="listingPostal">Postal Code:</label>
          <input
            type="number"
            id="listingPostal"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="e.g. 10001"
            min="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="listingType">Property Type:</label>
          <select
            id="listingType"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="1">Apartment</option>
            <option value="2">House</option>
            <option value="3">Studio</option>
          </select>
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Creating...' : 'Create Encrypted Listing'}
        </button>
      </form>
    </div>
  );
}

export default CreateListing;
