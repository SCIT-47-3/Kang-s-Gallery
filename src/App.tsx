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
          '/images/photo1.jpeg',
          '/images/photo2.jpeg',
          '/images/photo3.jpeg',
          '/images/photo4.jpeg',
          '/images/photo5.jpeg',
          '/images/photo6.jpeg',
          '/images/photo7.jpeg',
          '/images/photo8.jpeg',
          '/images/photo9.gif',
        ]}
      />
    </div>
  );
};

export default App;