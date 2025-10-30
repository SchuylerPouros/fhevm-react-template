import { useState, useEffect } from 'react';
import WalletInfo from './components/WalletInfo';
import CreateListing from './components/CreateListing';
import CreateRequest from './components/CreateRequest';
import CreateMatch from './components/CreateMatch';
import Statistics from './components/Statistics';
import UserActivity from './components/UserActivity';
import StatusBar from './components/StatusBar';
import { useWallet } from './hooks/useWallet';
import { useContract } from './hooks/useContract';

function App() {
  const { account, network, contract, connectWallet, isConnecting } = useWallet();
  const { activeListings, activeRequests, userListings, userRequests, refresh } = useContract(contract, account);

  const [statusMessage, setStatusMessage] = useState<string>(
    'Connect your MetaMask wallet to begin using the anonymous rental matching platform.'
  );
  const [statusType, setStatusType] = useState<'info' | 'success' | 'error'>('info');

  const updateStatus = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    setStatusMessage(message);
    setStatusType(type);
  };

  useEffect(() => {
    if (account && contract) {
      updateStatus('Wallet connected successfully! You can now create listings and requests.', 'success');

      // Listen to events
      contract.on('ListingCreated', (listingId: bigint, landlord: string) => {
        if (landlord.toLowerCase() === account.toLowerCase()) {
          updateStatus(`Your listing #${listingId} was created successfully!`, 'success');
        }
        refresh();
      });

      contract.on('RequestCreated', (requestId: bigint, tenant: string) => {
        if (tenant.toLowerCase() === account.toLowerCase()) {
          updateStatus(`Your request #${requestId} was created successfully!`, 'success');
        }
        refresh();
      });

      contract.on('MatchCreated', (matchId: bigint, listingId: bigint, requestId: bigint) => {
        updateStatus(`New match #${matchId} created between listing #${listingId} and request #${requestId}!`, 'success');
        refresh();
      });

      return () => {
        contract.removeAllListeners();
      };
    }
  }, [account, contract, refresh]);

  return (
    <div className="container">
      <div className="header">
        <h1>🏠 Anonymous Rental Matching</h1>
        <p>Privacy-preserving property matching using FHE encryption</p>
      </div>

      <WalletInfo
        account={account}
        network={network}
        onConnect={connectWallet}
      />

      <div className="main-content">
        <CreateListing
          contract={contract}
          onUpdate={updateStatus}
          onSuccess={refresh}
        />

        <CreateRequest
          contract={contract}
          onUpdate={updateStatus}
          onSuccess={refresh}
        />

        <CreateMatch
          contract={contract}
          onUpdate={updateStatus}
          onSuccess={refresh}
        />

        <Statistics
          activeListings={activeListings}
          activeRequests={activeRequests}
          account={account}
          network={network}
        />
      </div>

      {account && (
        <UserActivity
          userListings={userListings}
          userRequests={userRequests}
        />
      )}

      <div className="privacy-notice">
        <h4>🔒 Privacy Protection</h4>
        <p>
          All sensitive information (prices, locations, preferences) is encrypted using FHE technology.
          Only you can see your encrypted data. Matching happens without revealing private details to unauthorized parties.
        </p>
      </div>

      <StatusBar message={statusMessage} type={statusType} />
    </div>
  );
}

export default App;
