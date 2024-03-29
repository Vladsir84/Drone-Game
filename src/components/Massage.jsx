import "../styles/massage.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Massage = ({ droneIndex }) => {
  const navigate = useNavigate();

  const gameStatus = useSelector((state) => state.game.gameStatus);
  const verticalSpeedState = useSelector((state) => state.drone.verticalSpeed);
  const complexity = useSelector((state) => state.init.user.complexity);

  return (
    <div
      className="massage-wrapper"
      style={{ borderColor: gameStatus === "passed" ? "green" : "red" }}
    >
      <h2
        className="massage-win-text"
        style={{ color: gameStatus === "passed" ? "green" : "red" }}
      >
        {gameStatus === "passed" ? "You Win!" : "Game Over"}
      </h2>
      <p
        className="massage-win-subtext"
        style={{ color: gameStatus === "passed" ? "green" : "red" }}
      >
        Your score is:{" "}
        {Math.floor(
          droneIndex * 0.1 + (verticalSpeedState + Number(complexity))
        )}
      </p>
      <button
        className="message-btn"
        onClick={() => navigate("/")}
        style={{ backgroundColor: gameStatus === "passed" ? "green" : "red" }}
      >
        To Start Menu
      </button>
    </div>
  );
};

export default Massage;
