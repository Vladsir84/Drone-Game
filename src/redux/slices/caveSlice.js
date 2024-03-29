import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFinished: false,
  loading: false,
  cave: [],
  caveWidth: 1000,
  error: null,
  wallIndex: 0,
  wallHeight: 10,
  polyline: {
    left: [],
    right: [],
  },
};

const caveSlice = createSlice({
  name: 'cave',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    setCaveWidth: (state, action) => {
      state.caveWidth = action.payload;
    },
    addCavePoints: (state, action) => {
      const multiplayer = Math.round(state.caveWidth / 500);

      const startIndex = state.polyline.left.length;

      action.payload.forEach((el, index) => {
        // console.log(el);
        const polyline = generatePolyline({
          y: (index + startIndex) * state.wallHeight,
          points: el,
          canvasWidth: state.caveWidth,
          multiplayer,
        });

        state.polyline.left.push(polyline.left);
        state.polyline.right.push(polyline.right);
      });

      state.cave.push(...action.payload);
    },
    finishLoading: (state) => {
      state.isFinished = true;
    },
    updateWallIndex: (state, action) => {
      state.wallIndex = action.payload;
    },
    setWallHeight: (state, action) => {
      state.wallHeight = action.payload;
    },
    resetCaveState: (state) => {
      return {
        ...initialState,
        caveWidth: state.caveWidth,
      };
    },
  },
});

export const {
  finishLoading,
  addCavePoints,
  updateWallIndex,
  resetCaveState,
  setCaveWidth,
  setWallHeight,
} = caveSlice.actions;
export default caveSlice.reducer;

const generatePolyline = ({
  y,
  points,
  canvasWidth,
  multiplayer,
}) => {
  const [leftPoint, rightPoint] = points;

  const centerOfCanvas = Math.round(canvasWidth / 2);

  const leftX = centerOfCanvas + leftPoint * multiplayer;
  const rightX = centerOfCanvas - rightPoint * multiplayer;

  const leftPolyline = [leftX, y];
  const rightPolyline = [canvasWidth - rightX, y];

  return {
    left: leftPolyline,
    right: rightPolyline,
  };
};
