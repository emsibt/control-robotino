import { useEffect } from "react";
import "./App.css";
import Control from "./components/Control";
function App() {
  var myImage = document.querySelector("img");
  useEffect(() => {
    let interval = setInterval(() => {
      try {
        fetch("http://1d19-113-185-75-100.ngrok.io/cam0")
          .then(function (response) {
            return response.blob();
          })
          .then(function (myBlob) {
            var objectURL = URL.createObjectURL(myBlob);
            myImage.src = objectURL;
          });
      } catch (error) {
        console.log(error);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Home page</h1>
        <img src=""></img>
      </header>
      <body>
        <Control />
      </body>
    </div>
  );
}

export default App;
