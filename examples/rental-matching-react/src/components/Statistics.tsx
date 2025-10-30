interface StatisticsProps {
  activeListings: number;
  activeRequests: number;
  account: string;
  network: string;
}

function Statistics({ activeListings, activeRequests, account, network }: StatisticsProps) {
  const shortAddress = account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Not connected';

  return (
    <div className="card matches-section">
      <h3>📊 Platform Statistics</h3>
      <div className="stats-grid">
        <div className="match-card">
          <strong>Active Listings:</strong>
          <div>{activeListings}</div>
        </div>
        <div className="match-card">
          <strong>Active Requests:</strong>
          <div>{activeRequests}</div>
        </div>
        <div className="match-card">
          <strong>Your Account:</strong>
          <div>{shortAddress}</div>
        </div>
        <div className="match-card">
          <strong>Network:</strong>
          <div>{network || 'Sepolia Testnet'}</div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
