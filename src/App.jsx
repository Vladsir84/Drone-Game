import GameUI from "./components/GameUI";
import StartMenu from "./components/StartMenu";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartMenu />} />
      <Route path="/game" element={<GameUI />} />
    </Routes>
  );
}

export default App;
