import React from 'react';

const ErrorMessage: React.FC<{ message?: string; onRetry?: () => void }> = ({ message = 'Something went wrong.', onRetry }) => (
  <div role="alert" className="error">
    <p>{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="btn-retry">Try again</button>
    )}
  </div>
);

export default React.memo(ErrorMessage);
