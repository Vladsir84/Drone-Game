import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseHorizontalSpeed,
  increaseHorizontalSpeed,
  decreaseVerticalSpeed,
  increaseVerticalSpeed,
} from "../redux/slices/droneSlice";

const DroneUI = () => {
  const [leftPosition, setLeftPosition] = useState(50);
  const dispatch = useDispatch();

  const gameStatus = useSelector((state) => state.game.gameStatus);
  const droneSpeed = useSelector((state) => state.drone.horizontalSpeed);
  // console.log(droneSpeed);

  const leftInterval = useRef(0);
  const rightInterval = useRef(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          // leftInterval.current = setInterval(() => {
            setLeftPosition((prevPosition) => prevPosition - 1);
          // }, 1 * droneSpeed);
          dispatch(decreaseHorizontalSpeed());
          // return () => clearInterval(leftInterval.current);
          break;
        case "ArrowRight":
          // rightInterval.current = setInterval(() => {
            setLeftPosition((prevPosition) => prevPosition + 1);
          // }, 1 * droneSpeed);
          dispatch(increaseHorizontalSpeed());
          // return () => clearInterval(rightInterval.current);
          break;
        case "ArrowUp":
          event.preventDefault();
          dispatch(decreaseVerticalSpeed());
          break;
        case "ArrowDown":
          event.preventDefault();
          dispatch(increaseVerticalSpeed());
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      id="drone"
      style={{
        display: gameStatus !== "in_progress" ? "none" : "flex",
        position: "absolute",
        left: `${leftPosition}%`,
      }}
    >
      <svg
        width="20"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
        className="drone"
      >
        <polygon points="0,0 7.5,15 15,0" fill="green" />
      </svg>
    </div>
  );
};

export default DroneUI;
