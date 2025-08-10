// src/App.tsx
import React from 'react';
import Gallery from './components/Gallery/Gallery';
import './App.css';

// App.tsx
const App: React.FC = () => {
  return (
    <div className="App">
      <Gallery 
        images={[
          '/images/photo1.png',
          '/images/photo2.png',
          '/images/photo3.png',
          '/images/photo4.png',
          '/images/photo5.png'
        ]}
      />
    </div>
  );
};

export default App;