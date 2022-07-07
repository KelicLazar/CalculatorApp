import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { calcActions } from "../store/calc-slice";
import classes from "./Calculator.module.css";

const Calculator = () => {
  const firstNumber = useSelector((state) => state.calc.firstNumber);
  const secondNumber = useSelector((state) => state.calc.secondNumber);
  const predznak = useSelector((state) => state.calc.predznak);
  const znak = useSelector((state) => state.calc.znak);
  const dispatch = useDispatch();
  const calcButtons = [
    "AC",
    "DEL",
    "÷",
    "1",
    "2",
    "3",
    "*",
    "4",
    "5",
    "6",
    "+",
    "7",
    "8",
    "9",
    "-",
    ".",
    "0",
    "=",
  ];
  const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const operacije = ["-", "*", "÷", "+"];

  let audio1 = new Audio("/1.mp3");
  let audio2 = new Audio("/2.mp3");
  let audio3 = new Audio("/3.mp3");
  let audio4 = new Audio("/4.mp3");
  let audio5 = new Audio("/5.mp3");
  let audio6 = new Audio("/6.mp3");

  const handleClick = (event) => {
    const randomSoundNumber = Math.floor(Math.random() * 6 + 1);
    console.log(randomSoundNumber);
    switch (randomSoundNumber) {
      case 1:
        audio1.play();
        break;
      case 2:
        audio2.play();
        break;
      case 3:
        audio3.play();
        break;
      case 4:
        audio4.play();
        break;
      case 5:
        audio5.play();
        break;
      case 6:
        audio6.play();
        break;

      default:
        break;
    }

    const realEvent = event.target.innerHTML;

    //CHECKS IF NUMBER IS CLICKED//
    if (nums.includes(Number(realEvent))) {
      if (!znak) {
        dispatch(calcActions.updateFirstNum({ number: realEvent }));
      } else {
        dispatch(calcActions.updateSecondNum({ number: realEvent }));
      }
    } //CHECKS IF OPERATOR IS CLICKED
    else if (operacije.includes(realEvent)) {
      if (!secondNumber) {
        if (firstNumber && firstNumber !== "-") {
          dispatch(calcActions.updateZnak({ znak: realEvent }));
        } else {
          if (predznak === "" && realEvent === "-") {
            dispatch(calcActions.updatePredznak({ predznak: realEvent }));
          }
        }
      } else if (Number(firstNumber) && secondNumber) {
        dispatch(calcActions.calculate({ znak: znak }));
        dispatch(calcActions.updateZnak({ znak: realEvent }));
      }
    } //CHECKS IF EQUAL SIGN IS CLICKED
    else if (realEvent === "=" && firstNumber && secondNumber) {
      dispatch(calcActions.calculate({ znak: znak }));
    }
    //CHECKS IF AC IS CLICKED
    else if (realEvent === "AC") {
      dispatch(calcActions.deleteAll());
    }
    //CHECKS IF DEL IS CLICKED
    else if (realEvent === "DEL") {
      dispatch(calcActions.deleteOne());
    }
    //CHECKS IF . IS CLICKED
    else if (realEvent === "." && !firstNumber.lenght > 0) {
      if (!znak && !firstNumber.includes(".")) {
        dispatch(calcActions.updateFirstNum({ number: realEvent }));
      } else if (znak && !secondNumber.includes(".")) {
        dispatch(calcActions.updateSecondNum({ number: realEvent }));
      }
    }
  };

  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.screen}>
          <div className={classes.topScreen}>{znak && firstNumber + znak}</div>
          <div className={classes.bottomScreen}>
            {znak ? secondNumber : firstNumber}
          </div>
        </div>

        {calcButtons.map((item) => {
          return (
            <button onClick={handleClick} className={classes.key} key={item}>
              {item}
            </button>
          );
        })}
      </div>
      <footer className={classes.footer}>
        <p>
          Sound from <a href="https://www.zapsplat.com/">Zapsplat.com</a>
        </p>
      </footer>
    </React.Fragment>
  );
};

export default Calculator;
