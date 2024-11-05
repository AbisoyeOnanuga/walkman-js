// PersistentComponent
import React from 'react';

const PersistentComponent = ({ isVisible, children }) => {
  return (
    <div style={{ display: isVisible ? 'block' : 'none' }}>
      {children}
    </div>
  );
};

export default PersistentComponent;
