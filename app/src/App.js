import React from 'react';
import './App.css';

import Data from './testData/testData.js'
import Model from './tensorflow/model.js'

 const functionName = () => {

 }

function App() {
	Model.trainModel(Data.inputArr, Data.targetArr, 15, 15, 250, 0.005, 4).then(
		(wrapper_train) => {
    console.log(Model.Predict(Data.inputArr, 15, wrapper_train.model))
  });
  
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
