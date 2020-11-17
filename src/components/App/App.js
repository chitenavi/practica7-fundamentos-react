import React from 'react';
import MainLayout from '../layout/MainLayout';

function App() {
  return (
    <div className="App">
      <MainLayout title="Nodepop SPA">
        <p>Este es el contenido principal de la app</p>
        <p>El contenido que cambia en las rutas</p>
      </MainLayout>
    </div>
  );
}

export default App;
