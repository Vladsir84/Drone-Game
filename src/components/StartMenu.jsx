import { useEffect } from "react";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { options } from "../utils";
import { initData, addUser } from "../redux/slices/initSlice";
import { useNavigate } from "react-router-dom";
import { resetDroneState } from "../redux/slices/droneSlice";
import "../styles/menu.scss";
import { gameInit } from "../redux/slices/gameSlice";

const StartMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    complexity: "0",
  };

  useEffect(() => {
    dispatch(resetDroneState());
    dispatch(gameInit());
    window.localStorage.setItem("initId", "");
  }, []);

  const handleSubmit = (values) => {
    dispatch(initData(values));
    dispatch(addUser(values));
    navigate("/game");
  };

  return (
    <div className="game-menu">
      <img src="drone.png" alt="" className="menu-image"/>
      <h2>Flying in the Cave</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, handleChange }) => (
          <Form>
            <input
              required
              className="name-input"
              placeholder="Enter your name"
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
            <div className="complexity-wrapper">
              <h4>Choose your complexity</h4>
              <select
                className="select"
                value={values.complexity}
                onChange={handleChange}
                name="complexity"
              >
                {options.map((item) => (
                  <option key={item.id} value={item.value}>
                    {item.value}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="menu-btn">
              Start Game
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StartMenu;
