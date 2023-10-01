import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import addProp from './addProp';

function App(props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Component mounted!');
    return () => {
      console.log('Component will unmount!');
    };
  }, []);

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Count: {count}
          </p>
          <p>
            {props.newProp}
          </p>
          <button onClick={() => setCount(count + 1)}>Increment</button>
        </header>
      </div>
  );
}

export default addProp(App);
