import { useEffect, useState } from "react";
import "./App.css";
import Control from "./components/Control";
import StartFirebase from "./firebaseConfig";
import { ref, set, get, child } from "firebase/database";
import axios from "axios";

function App() {
  const [myURL, setMyURL] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const myImage = document.getElementById("image-camera");
  const imagesFunc = async () => {
    try {
      await fetch(`${myURL}/cam0`)
        .then(function (response) {
          return response.blob();
        })
        .then(function (myBlob) {
          if (myBlob) {
            var objectURL = URL.createObjectURL(myBlob);
            myImage.src = objectURL;
          }
          return myBlob.text();
        })
        .then(function (text) {
          dataTest.image = text;
        });
    } catch (error) {
      console.log(error);
      myImage.src = "../public/image/waiting-icon-gif-23.jpg";
    }
  };
  const dataTest = {
    seq: 0,
    stamp: 0,
    angle_min: 0,
    angle_max: 0,
    angle_increment: 0,
    time_increment: 0,
    scan_time: 0,
    range_min: 0,
    range_max: 0,
    ranges: [],
    intensities: [],
    image: "",
    time: ""
  };
  const addData = (dataTest) => {
    const db = StartFirebase();
    set(ref(db, "robot/" + dataTest.time), {
      seq: dataTest.seq,
      stamp: dataTest.stamp,
      angle_min: dataTest.angle_min,
      angle_max: dataTest.angle_max,
      angle_increment: dataTest.angle_increment,
      time_increment: dataTest.time_increment,
      scan_time: dataTest.scan_time,
      range_min: dataTest.range_min,
      range_max: dataTest.range_max,
      ranges: dataTest.ranges,
      intensities: dataTest.intensities,
      image: dataTest.image,
    })
      .then(() => console.log("Add successfully"))
      .catch((error) => console.log(error));
  };
  const getData = () => {
    const dbref = ref(StartFirebase());
    get(child(dbref, "robot/")).then((snapshot) => {
      if (snapshot.exists()) {
        const textFile = new Blob([JSON.stringify(snapshot.val())], {
          type: "text/plain;charset=utf-8",
        });
        const element = document.createElement("a");
        element.href = URL.createObjectURL(textFile);
        element.download = "logFile.json";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      } else {
        console.log("fail to get Data");
      }
    });
  };
  const getSensorData = async () => {
    try {
      await axios.get(`${myURL}/data/scan0`).then(function (response) {
        dataTest.seq = response.data.seq;
        dataTest.stamp = response.data.stamp;
        dataTest.angle_min = response.data.angle_min;
        dataTest.angle_max = response.data.angle_max;
        dataTest.angle_increment = response.data.angle_increment;
        dataTest.scan_time = response.data.scan_time;
        dataTest.range_min = response.data.range_min;
        dataTest.range_max = response.data.range_max;
        dataTest.ranges = response.data.ranges;
        dataTest.intensities = response.data.intensities;
        dataTest.time = Date.now()
      });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   imagesFunc();
  // }, []);
  const handleSubmitURL = () => {
    console.log(document.getElementById("url").value);
    setMyURL(document.getElementById("url").value);
    document.getElementById("url").value = "";
  };

  useEffect(() => {
    try {
      fetch(`${myURL}/cam0`).then(function (response) {
        if (response.status === 200) {
          setErrorMsg(false);
          let myInterval = setInterval(() => {
            imagesFunc();
            getSensorData();
            addData(dataTest);
          }, 1000);
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
        <button onClick={getData}>Export</button>
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
