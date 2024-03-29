import { useSelector } from "react-redux";
import "../styles/counter.scss";

const CountersUI = ({ droneIndex }) => {
  const gameStatus = useSelector((state) => state.game.gameStatus);

  const horizontalSpeedState = useSelector(
    (state) => state.drone.horizontalSpeed
  );
  const verticalSpeedState = useSelector((state) => state.drone.verticalSpeed);
  const complexity = useSelector((state) => state.init.user.complexity);

  return (
    <div
      className="counter-wrapper"
      style={{ display: gameStatus !== "in_progress" ? "none" : "flex" }}
    >
      <div>
        <h3 className="counter-text">
          Horizontal Speed: {horizontalSpeedState}
        </h3>
        <h3 className="counter-text">Vertical Speed: {verticalSpeedState}</h3>
      </div>
      <h3>
        Score:{" "}
        {Math.floor(
          droneIndex * 0.1 + (verticalSpeedState + Number(complexity))
        )}
      </h3>
    </div>
  );
};

export default CountersUI;
