interface WalletInfoProps {
  account: string;
  network: string;
  onConnect: () => void;
}

function WalletInfo({ account, network, onConnect }: WalletInfoProps) {
  if (!account) {
    return (
      <div className="wallet-info">
        <button className="btn connect-btn" onClick={onConnect}>
          Connect MetaMask Wallet
        </button>
        <p>Connect your wallet to start using the platform</p>
      </div>
    );
  }

  const shortAddress = `${account.slice(0, 6)}...${account.slice(-4)}`;

  return (
    <div className="wallet-info">
      <p>✅ Connected: {shortAddress}</p>
      <p>Network: {network}</p>
    </div>
  );
}

export default WalletInfo;
