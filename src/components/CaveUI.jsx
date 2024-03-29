import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Massage from "./Massage";
import { startMove } from "../redux/slices/droneSlice";
import { addCavePoints } from "../redux/slices/caveSlice";
import { gameFailed, gamePassed } from "../redux/slices/gameSlice";
import { getEndpoints } from "../utils";

const CaveUI = ({ caveData, droneIndex, setDroneIndex }) => {
  const dispatch = useDispatch();

  const [topPosition, setTopPosition] = useState(0);
  const [startPoint, setStartPoint] = useState([]);
  const [endPoint, setEndPoint] = useState([]);

  const [rectValues, setRectValues] = useState([]);

  const caveWidth = 500;
  const wallHeight = 10;

  const svgHeight = caveData.length * wallHeight;

  const droneVerticalSpeed = useSelector((state) => state.drone.verticalSpeed);
  const speed = 100 / droneVerticalSpeed;

  const dronePosition = useSelector((state) => state.drone.dronePosition);

  const gameStatus = useSelector((state) => state.game.gameStatus);

  // const caveCoord = useSelector((state) => state.cave);
  // console.log(caveCoord);

  const endPoints = getEndpoints(startPoint, endPoint);
  // console.log(endPoints);

  const moveUp = () => {
    if (topPosition > -10040 && gameStatus !== "failed") {
      const interval = setInterval(() => {
        setTopPosition((prevState) => prevState - 20);
        setDroneIndex((prevState) => prevState + 1);
        // console.log("dronePos:", Math.abs(dronePosition.startPoint.x));
        // console.log("startPoint:", startPoint[droneIndex]);
        if (
          // (dronePosition.startPoint.x !== 0 ||
          //   dronePosition.endPoint.x !== 0 ||
          //   dronePosition.apex.x !== 0) &&
         Math.abs(dronePosition.startPoint.x) > startPoint[droneIndex]
        ) {
          console.log("Game Over");
          // dispatch(gameFailed());
        }

        // setRectValues([...rectValues, [XValue, YValue]]);
        dispatch(startMove());
        // dispatch(addCavePoints(rectValues));
      }, speed);
      return () => clearInterval(interval);
    }
  };

  useEffect(() => {
    if (topPosition > -10040 && gameStatus !== "failed") {
      const moveUpInterval = moveUp();
      return () => {
        moveUpInterval();
      };
    } else {
      gameStatus === "failed" ? dispatch(gameFailed()) : dispatch(gamePassed());
    }
  }, [speed, droneVerticalSpeed, topPosition]);

  useEffect(() => {
    setEndPoint(
      caveData.map((data) => (!isNaN(data.left) ? data.right - data.left : 0))
    );
    setStartPoint(
      caveData.map((data) =>
        !isNaN(data.left)
          ? data.left < 0
            ? caveWidth / 2 - Math.abs(data.left)
            : caveWidth / 2 + Number(data.left)
          : 0
      )
    );
  }, [caveData, wallHeight, caveWidth]);

  // console.log("Start:", startPoint);
  // console.log("End:", endPoint);

  const rects = caveData.map((data, index) => {
    const rectY = index * wallHeight;
    const isNumericLeft = !isNaN(data.left);

    const grayRect = (
      <rect
        x={0}
        y={rectY}
        width={caveWidth}
        height={wallHeight}
        fill="gray"
        key={`${index}-gray`}
      />
    );

    const whiteRect = (
      <rect
        x={
          isNumericLeft
            ? data.left < 0
              ? caveWidth / 2 - Math.abs(data.left)
              : caveWidth / 2 + Number(data.left)
            : 0
        }
        y={rectY}
        width={isNumericLeft ? data.right - data.left : 0}
        height={wallHeight}
        fill="white"
        key={index}
      />
    );

    return [grayRect, whiteRect];
  });

  return (
    <>
      <div
        className="cave-wrapper"
        style={{
          top: `${topPosition}px`,
        }}
      >
        <svg width={caveWidth} height={svgHeight} id="cave">
          <rect x={0} y={0} width={caveWidth} height={svgHeight} fill="gray" />
          {rects.flat()}
        </svg>
      </div>
      {gameStatus !== "in_progress" && <Massage droneIndex={droneIndex} />}
    </>
  );
};

export default CaveUI;
