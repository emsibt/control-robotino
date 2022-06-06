import { useEffect, useState } from "react";
import "./App.css";
import Control from "./components/Control";
function App() {
  //URL for API call
  // const myURL = "http://0854-113-185-73-33.ngrok.io";
  const [myURL, setMyURL] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const myImage = document.getElementById("image-camera");
  const imagesFunc = async () => {
    try {
      await fetch(`${myURL}/cam0`).then(function (response) {
        // console.log(response);
        return response.blob();
      })
      .then(function (myBlob) {
        if (myBlob) {
          var objectURL = URL.createObjectURgitL(myBlob);
          myImage.src = objectURL;
        }
      });
    } catch (error) {
      console.log(error);
      myImage.src = "../public/image/waiting-icon-gif-23.jpg";
    }
  };
  const handleSubmitURL = () => {
    console.log(document.getElementById("url").value);
    setMyURL(document.getElementById("url").value);
    document.getElementById("url").value = "";
  };

  useEffect(() => {
    try {
      fetch(`${myURL}/items/1`).then(function (response) {
        if (response.status === 200) {
          setErrorMsg(false);
          let myInterval = setInterval(() => {
            imagesFunc();
          }, 500);
          return () => clearInterval(myInterval);
        } else setErrorMsg(true);
      });
    } catch (error) {
      console.log(error);
    }
  }, [myURL]);
  return (
    <div className="App">
      <div className="header">
        <h1>Control Your Robot </h1>
        <img src="/image/icons8-chatbot-64.png" alt="logo" className="logo" />
      </div>
      <div className="form-field">
        <input id="url" type="text" className="form-input" />
        <label for="url" className="form-label">
          URL
        </label>
        <button onClick={handleSubmitURL}>Submit</button>
      </div>
      <div className="error">
        {errorMsg ? <p>Your URL is not correct</p> : <div></div>}
      </div>

      <div className="body">
        <img
          id="image-camera"
          src="/image/waiting-icon-gif-23.jpg"
          alt="data"
          className="camera"
        ></img>
        <Control url={myURL} />
      </div>
    </div>
  );
}
export default App;
