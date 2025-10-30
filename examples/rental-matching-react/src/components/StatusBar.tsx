interface StatusBarProps {
  message: string;
  type: 'info' | 'success' | 'error';
}

function StatusBar({ message, type }: StatusBarProps) {
  const getClassName = () => {
    switch (type) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      default:
        return '';
    }
  };

  return (
    <div className="status">
      <h4>Status</h4>
      <div className={getClassName()}>
        <p>{message}</p>
        <small>Time: {new Date().toLocaleTimeString()}</small>
      </div>
    </div>
  );
}

export default StatusBar;
