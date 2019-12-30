import React, {useState} from 'react';
import './App.css';

import Data from './testData/testData.js'
import Model from './tensorflow/model.js'



const App = () => {
  // hosting: https://www.freecodecamp.org/news/how-to-deploy-a-nodejs-app-to-heroku-from-github-without-installing-heroku-on-your-machine-433bec770efe/
  
  /*
	Model.trainModel(Data.inputArr, Data.targetArr, 15, 15, 1000, 0.005, 4).then(
		(wrapper_train) => {
    console.log(Model.Predict(Data.inputArr, 15, wrapper_train.model))
  });
  */

  const [textFromFileLoaded, setTextFromFileLoaded] = useState('');
  



  const loadFileAsText = () => {
    const fileToLoad = document.getElementById("fileToLoad").files[0];
    const fileReader = new FileReader();
    fileReader.onload = (fileLoadedEvent) => {
      const textFromFileLoaded = fileLoadedEvent.target.result;
      console.log(textFromFileLoaded);
      setTextFromFileLoaded(textFromFileLoaded);
    };

    fileReader.readAsText(fileToLoad, "UTF-8");
  }

  return (
    <div className="App">
      {textFromFileLoaded.length <=0 && <input type="file" accept=".csv" onChange={loadFileAsText} id="fileToLoad" />}
      {textFromFileLoaded.length > 0 && <div>{textFromFileLoaded} </div>}
    </div>
  );
}

export default App;
