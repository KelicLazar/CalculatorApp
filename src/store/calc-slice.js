import { createSlice } from "@reduxjs/toolkit";

const initialCalcState = {
  firstNumber: "",
  secondNumber: "",
  predznak: "",
  znak: "",
};

const calcSlice = createSlice({
  name: "calculator",
  initialState: initialCalcState,
  reducers: {
    updateFirstNum(state, action) {
      if (state.firstNumber === "0" && action.payload.number === "0") {
        return;
      }
      if (state.firstNumber.length > 12) {
        return;
      }
      state.firstNumber = state.firstNumber + action.payload.number;
    },
    updateSecondNum(state, action) {
      if (state.secondNumber === "0" && action.payload.number === "0") {
        return;
      }
      if (state.secondNumber.length > 12) {
        return;
      }
      state.secondNumber = state.secondNumber + action.payload.number;
    },
    updatePredznak(state, action) {
      state.predznak = action.payload.predznak;
      state.firstNumber = "-";
    },
    updateZnak(state, action) {
      state.firstNumber = Number(state.firstNumber);
      state.firstNumber = state.firstNumber.toString();
      state.znak = action.payload.znak;
    },
    calculate(state, action) {
      switch (action.payload.znak) {
        case "+":
          state.firstNumber =
            Number(state.firstNumber) + Number(state.secondNumber);
          state.firstNumber = state.firstNumber.toString();
          state.secondNumber = "";
          state.predznak = "";
          state.znak = "";
          break;
        case "-":
          state.firstNumber =
            Number(state.firstNumber) - Number(state.secondNumber);
          state.firstNumber = state.firstNumber.toString();
          state.secondNumber = "";
          state.predznak = "";
          state.znak = "";
          break;
        case "*":
          state.firstNumber =
            Number(state.firstNumber) * Number(state.secondNumber);
          state.firstNumber = state.firstNumber.toString();
          state.secondNumber = "";
          state.predznak = "";
          state.znak = "";
          break;
        case "÷":
          state.firstNumber =
            Number(state.firstNumber) / Number(state.secondNumber);
          state.firstNumber = state.firstNumber.toString();
          state.secondNumber = "";
          state.predznak = "";
          state.znak = "";
          break;
        default:
          break;
      }
    },
    deleteAll(state) {
      state.firstNumber = "";
      state.secondNumber = "";
      state.predznak = "";
      state.znak = "";
    },
    deleteOne(state) {
      if (state.secondNumber.length) {
        state.secondNumber = state.secondNumber.slice(0, -1);
      } else if (!state.znak) {
        state.firstNumber = state.firstNumber.slice(0, -1);
        if (!state.firstNumber.length) {
          state.predznak = "";
        }
      }
    },
  },
});

export const calcActions = calcSlice.actions;
export default calcSlice.reducer;
