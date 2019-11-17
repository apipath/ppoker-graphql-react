import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './screens/Home';

function App() {
  return (
    <main className="flex flex-col font-sans">
      <Header />
      <Home />
      <Footer />
    </main>
  );
}

export default App;
