import React from 'react';
import { Outlet } from 'react-router-dom';

function App() { // Root Layout
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;