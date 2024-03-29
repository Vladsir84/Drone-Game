import { useState, useEffect } from "react";
import { getTokenChunk } from "../utils";
import CaveUI from "./CaveUI";
import DroneUI from "./DroneUI";
import CountersUI from "./CountersUI";
import { useSelector } from "react-redux";

const GameUI = () => {
  const initId = window.localStorage.getItem("initId");
  const loading = useSelector((state) => state?.init.loading);

  const [gameToken, setGameToken] = useState("");
  const [caveData, setCaveData] = useState([]);
  const [droneIndex, setDroneIndex] = useState(0);

  useEffect(() => {
    if (!loading && initId) {
      const tokenPromises = [1, 2, 3, 4].map((chunkNo) =>
        getTokenChunk(initId, chunkNo)
      );

      Promise.all(tokenPromises).then((chunks) => {
        const token = chunks.map((data) => data.chunk).join("");
        setGameToken(token);
      });
    }
  }, [initId, loading]);

  useEffect(() => {
    const socket = new WebSocket("wss://cave-drone-server.shtoa.xyz/cave");

    socket.addEventListener("open", () => {
      const playerInfo = `player:${initId}-${gameToken}`;
      socket.send(playerInfo);
    });

    socket.onmessage = function (event) {
      const message = event.data;
      setCaveData((prev) => [...prev, message]);
    };
  }, [initId, gameToken]);

  const caveDataFin = caveData.map((item) => {
    const [left, right] = item.split(",").map(Number);
    return { left, right };
  });

  return !loading ? (
    <>
      <CountersUI droneIndex={droneIndex} setDroneIndex={setDroneIndex} />
      <div>
        <DroneUI />
        <CaveUI
          caveData={caveDataFin}
          droneIndex={droneIndex}
          setDroneIndex={setDroneIndex}
        />
      </div>
    </>
  ) : (
    <div className="loader-wrapper">
      <div className="loader">Loading...</div>
    </div>
  );
};

export default GameUI;
