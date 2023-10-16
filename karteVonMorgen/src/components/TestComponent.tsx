// TestComponent.tsx
import React from 'react';
import { useSearch } from '../hooks/useSearch';

const TestComponent: React.FC = () => {
  const bbox = "42.27,-7.97,52.58,38.25"
  const text = "bio"
  const data = useSearch(bbox, null, null, text);

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default TestComponent;
