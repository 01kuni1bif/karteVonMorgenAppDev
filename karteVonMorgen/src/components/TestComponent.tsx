// TestComponent.tsx
import React from 'react';
import { useCategories } from '../hooks/useCategories';

const TestComponent: React.FC = () => {
  const data = useCategories('7cee99c287094a94acbdcf29ffff2e85');

  return (
    <div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default TestComponent;
