// TestComponent.tsx
import React from 'react';
import { useSearch } from '../hooks/useSearch';
import { IonSpinner } from '@ionic/react';

const TestComponent: React.FC = () => {
  const categories = ["2cd00bebec0c48ba9db761da48678134", "77b3c33a92554bcf8e8c2c86cedd6f6f"]
  const { data, isLoading } = useSearch(null, null, categories);

  return (
    <div>
      {isLoading ? (
        <IonSpinner name='crescent' />
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
};

export default TestComponent;
