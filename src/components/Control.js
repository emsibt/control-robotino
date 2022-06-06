import "./Control.css";

const Control = (props) => {
  let forward = 0;
  let back = 0;
  let left = 0;
  let right = 0;
  let rotateLeft = 0;
  let rotateRight = 0;
  const step = 20;
  const requestForward = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify([1, 0, 0]),
  };
  const requestBack = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify([-1, 0, 0]),
  };
  const requestLeft = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify([0, 1, 0]),
  };
  const requestRight = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify([0, -1, 0]),
  };
  const requestRotateLeft = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify([0, 0, 1]),
  };
  const requestRotateRight = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify([0, 0, -1]),
  };

  // function to call API
  function moving(move, request) {
    if (move >= step) {
      try {
        fetch(`${props.url}/data/omnidrive`, request)
          .then((response) => response.json())
          .then((data) => this.setState({ postId: data.id }));
        // fetch(`${props.url}/items/1`).then(function (response) {
          // console.log(response);
        // });
      } catch (error) {}
      console.log("call API done!");
    }
  }

  const update = () => {
    const gamepads = navigator.getGamepads();

    if (gamepads[0]) {
      const gamepadState = {
        // id: gamepads[0].id,

        // axes: [
        //   gamepads[0].axes[0].toFixed(2),
        //   gamepads[0].axes[1].toFixed(2),
        //   gamepads[0].axes[2].toFixed(2),
        //   gamepads[0].axes[3].toFixed(2),
        // ],

        buttons: [
          // { button_0: gamepads[0].buttons[0].pressed },
          { button_1: gamepads[0].buttons[1].pressed },
          { button_2: gamepads[0].buttons[2].pressed },
          // { button_3: gamepads[0].buttons[3].pressed },
          // { button_4: gamepads[0].buttons[4].pressed },
          // { button_5: gamepads[0].buttons[5].pressed },
          // { button_6: gamepads[0].buttons[6].pressed },
          // { button_7: gamepads[0].buttons[7].pressed },
          // { button_8: gamepads[0].buttons[8].pressed },
          // { button_9: gamepads[0].buttons[9].pressed },
          // { button_10: gamepads[0].buttons[10].pressed },
          // { button_11: gamepads[0].buttons[11].pressed },
          { button_12: gamepads[0].buttons[12].pressed },
          { button_13: gamepads[0].buttons[13].pressed },
          { button_14: gamepads[0].buttons[14].pressed },
          { button_15: gamepads[0].buttons[15].pressed },
        ],
      };
      // const myJSON = JSON.stringify(gamepadState.buttons, null, 2);
      // document.getElementById("gamepad-display").innerHTML = myJSON;
    }
    if (gamepads[0]) {
      if (gamepads[0].buttons[12].pressed === true) {
        document.getElementById("go-forward").style.filter = "grayscale(0)";
        back = right = left = rotateLeft = rotateRight = 0;
        // console.log(forward);
        forward++;
        if (forward >= step) {
          moving(forward, requestForward);
          forward -= step;
        }
      } else
        document.getElementById("go-forward").style.filter = "grayscale(1)";
      if (gamepads[0].buttons[13].pressed === true) {
        document.getElementById("go-back").style.filter = "grayscale(0)";
        forward = right = left = rotateLeft = rotateRight = 0;
        back++;
        if (back >= step) {
          moving(back, requestBack);
          back -= step;
        }
      } else document.getElementById("go-back").style.filter = "grayscale(1)";

      if (gamepads[0].buttons[14].pressed === true) {
        document.getElementById("go-left").style.filter = "grayscale(0)";

        back = right = forward = rotateLeft = rotateRight = 0;
        left++;
        if (left >= step) {
          moving(left, requestLeft);
          left -= step;
        }
      } else document.getElementById("go-left").style.filter = "grayscale(1)";

      if (gamepads[0].buttons[15].pressed === true) {
        document.getElementById("go-right").style.filter = "grayscale(0)";
        back = forward = left = rotateLeft = rotateRight = 0;
        right++;
        if (right >= step) {
          moving(right, requestRight);
          right -= step;
        }
      } else document.getElementById("go-right").style.filter = "grayscale(1)";

      if (gamepads[0].buttons[2].pressed === true) {
        document.getElementById("go-rotate-left").style.filter = "grayscale(0)";

        right = back = left = forward = rotateRight = 0;
        rotateLeft++;
        if (rotateLeft >= step) {
          moving(rotateLeft, requestRotateLeft);
          left -= rotateLeft;
        }
      } else
        document.getElementById("go-rotate-left").style.filter = "grayscale(1)";

      if (gamepads[0].buttons[1].pressed === true) {
        document.getElementById("go-rotate-right").style.filter =
          "grayscale(0)";
        right = back = left = forward = rotateLeft = 0;
        rotateRight++;
        if (rotateRight >= step) {
          moving(rotateRight, requestRotateRight);
          rotateRight -= step;
        }
      } else
        document.getElementById("go-rotate-right").style.filter =
          "grayscale(1)";
    }
    window.requestAnimationFrame(update);
  };
  window.requestAnimationFrame(update);

  return (
    <div className="control">
      <pre id="gamepad-display"></pre>
      <p id="demo"></p>
      <div className="control-left">
        <div className="control-left top">
          <img
            src="/image/icons8-thick-arrow-pointing-up-96.png"
            id="go-forward"
            className="forward"
            alt="forward"
          ></img>
        </div>
        <div className="control-left bottom">
          <img
            src="/image/icons8-left-96.png"
            id="go-left"
            alt="left"
            className="left"
          ></img>
          <img
            src="/image/icons8-thick-arrow-pointing-down-96.png"
            id="go-back"
            alt="back"
            className="back"
          ></img>
          <img
            src="/image/icons8-right-96.png"
            id="go-right"
            alt="right"
            className="right"
          ></img>
        </div>
      </div>
      <div className="control-right">
        <img
          src="/image/icons8-rotate-left-96.png"
          id="go-rotate-left"
          alt="rotate-left"
          className="rotate-left"
        ></img>
        <img
          src="/image/icons8-rotate-right-96.png"
          id="go-rotate-right"
          alt="rotate-right"
          className="rotate-right"
        ></img>
      </div>
    </div>
  );
};
export default Control;
