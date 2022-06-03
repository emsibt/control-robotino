const Control = (props) => {
  var forward = 0;
  var back = 0;
  var left = 0;
  var right = 0;
  var rotateLeft = 0;
  var rotateRight = 0;

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
  const update = () => {
    const gamepads = navigator.getGamepads();

    if (gamepads[0]) {
      const gamepadState = {
        id: gamepads[0].id,

        axes: [
          gamepads[0].axes[0].toFixed(2),
          gamepads[0].axes[1].toFixed(2),
          gamepads[0].axes[2].toFixed(2),
          gamepads[0].axes[3].toFixed(2),
        ],

        buttons: [
          { button_0: gamepads[0].buttons[0].pressed },
          { button_1: gamepads[0].buttons[1].pressed },
          { button_2: gamepads[0].buttons[2].pressed },
          { button_3: gamepads[0].buttons[3].pressed },
          { button_4: gamepads[0].buttons[4].pressed },
          { button_5: gamepads[0].buttons[5].pressed },
          { button_6: gamepads[0].buttons[6].pressed },
          { button_7: gamepads[0].buttons[7].pressed },
          { button_8: gamepads[0].buttons[8].pressed },
          { button_9: gamepads[0].buttons[9].pressed },
          { button_10: gamepads[0].buttons[10].pressed },
          { button_11: gamepads[0].buttons[11].pressed },
          { button_12: gamepads[0].buttons[12].pressed },
          { button_13: gamepads[0].buttons[13].pressed },
          { button_14: gamepads[0].buttons[14].pressed },
          { button_15: gamepads[0].buttons[15].pressed },
        ],
      };
      const myJSON = JSON.stringify(gamepadState, null, 2);
      document.getElementById("gamepad-display").innerHTML = myJSON;
    }
    if (gamepads[0]) {
      if (gamepads[0].buttons[12].pressed === true) {
        console.log(forward);
        back = left = right = 0;
        forward++;
        if (forward >= 20) {
          fetch(
            "http://1d19-113-185-75-100.ngrok.io/data/omnidrive",
            requestForward
          )
            .then((response) => response.json())
            .then((data) => this.setState({ postId: data.id }));
          forward = forward - 20;
        }
      }
      if (gamepads[0].buttons[13].pressed === true) {
        console.log(back);
        forward = left = right = 0;
        back++;
        if (back >= 20) {
          fetch(
            "http://1d19-113-185-75-100.ngrok.io/data/omnidrive",
            requestBack
          )
            .then((response) => response.json())
            .then((data) => this.setState({ postId: data.id }));
          back -= 20;
        }
      }
      if (gamepads[0].buttons[14].pressed === true) {
        console.log(left);
        back = forward = right = 0;
        left++;
        if (left >= 20) {
          fetch(
            "http://1d19-113-185-75-100.ngrok.io/data/omnidrive",
            requestLeft
          )
            .then((response) => response.json())
            .then((data) => this.setState({ postId: data.id }));
          left -= 20;
        }
      }
      if (gamepads[0].buttons[15].pressed === true) {
        back = left = forward = 0;
        console.log(right);
        right++;
        if (right >= 20) {
          fetch(
            "http://1d19-113-185-75-100.ngrok.io/data/omnidrive",
            requestRight
          )
            .then((response) => response.json())
            .then((data) => this.setState({ postId: data.id }));
          right -= 20;
        }
      }
      if (gamepads[0].buttons[2].pressed === true) {
        right = back = left = forward = rotateRight = 0;
        // console.log(rotateLeft);
        rotateLeft++;
        if (rotateLeft >= 20) {
          fetch(
            "http://1d19-113-185-75-100.ngrok.io/data/omnidrive",
            requestRotateLeft
          )
            .then((response) => response.json())
            .then((data) => this.setState({ postId: data.id }));
          rotateLeft -= 20;
        }
      }
      if (gamepads[0].buttons[1].pressed === true) {
        right = back = left = forward = rotateLeft = 0;
        // console.log(right);
        rotateRight++;
        if (rotateRight >= 20) {
          fetch(
            "http://1d19-113-185-75-100.ngrok.io/data/omnidrive",
            requestRotateRight
          )
            .then((response) => response.json())
            .then((data) => this.setState({ postId: data.id }));
          rotateRight -= 20;
        }
      }
    }
    window.requestAnimationFrame(update);
  };
  window.requestAnimationFrame(update);

  return (
    <div>
      <pre id="gamepad-display"></pre>
      <p id="demo"></p>
    </div>
  );
};
export default Control;
