import React from 'react';
import './App.css';

import Data from './testData/testData.js'
import Model from './tensorflow/model.js'

 const functionName = () => {

 }

function App() {
  console.log(Model.trainModel(Data.inputArr, Data.targetArr,12,3, 2, 0.001, 3, null)
  .then((model) => {
    console.log(model);
    Model.Predict(Data.inputArr, 12, model)
  }));
  
  return (
    <div className="App">
      <div className="InputHeader">
        <table>
          <tr>
            <th><input type="text" name="name" /></th>
            <th>Lastname</th>
            <th>Age</th>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default App;
