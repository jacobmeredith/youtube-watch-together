import React from 'react';

const SearchError: React.FC<{ error: any, resetErrorBoundary: any }> = ({ error, resetErrorBoundary }) => {
  return (
    <div>
      <p>There was an error</p>
      <button onClick={resetErrorBoundary}>Reload</button>
    </div>
  )
}

export default SearchError;
