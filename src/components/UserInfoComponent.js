import React from 'react';

const ErrorComponent = ({ error }) => {
  const { message, name, config, request, response } = error;
  return (
    <div>
      <h2>{name}</h2>
      <p>{message}</p>
      <pre>{JSON.stringify(config, null, 2)}</pre>
      <pre>{JSON.stringify(request, null, 2)}</pre>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
};

export default ErrorComponent;