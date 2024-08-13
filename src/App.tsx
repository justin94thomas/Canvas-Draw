import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import Canvas from './components/Canvas';
import './App.css';


const App: React.FC = () => {
  const [imageURL, setImageURL] = useState<string>('');

  return (<>
    <div className='App'>
      <h2>Canvas 2D Draw</h2>
      <div className='image-area'>
        <ImageUpload onImageUpload={setImageURL} />
        {imageURL ? <Canvas imageURL={imageURL} /> : null}
      </div>
    </div>
  </>)
}

export default App;