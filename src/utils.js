import axios from "axios";

export const options = [
  { id: 0, value: 0 },
  { id: 1, value: 1 },
  { id: 2, value: 2 },
  { id: 3, value: 3 },
  { id: 4, value: 4 },
  { id: 5, value: 5 },
  { id: 6, value: 6 },
  { id: 7, value: 7 },
  { id: 8, value: 8 },
  { id: 9, value: 9 },
  { id: 10, value: 10 },
];

export const getEndpoints = (startPoint, endPoint) => {
  if (startPoint.length !== endPoint.length) {
    throw new Error("Points sizes are not the same");
  }
  const res = [];
  for (let i = 0; i < startPoint.length; i++) {
    res.push(startPoint[i] + endPoint[i]);
  }
  return res;
};

export const getTokenChunk = async (id, chunkNo) => {
  const res = await axios.get(
    `https://cave-drone-server.shtoa.xyz/token/${chunkNo}`,
    {
      params: { id },
    },
  );
  return res.data;
};
