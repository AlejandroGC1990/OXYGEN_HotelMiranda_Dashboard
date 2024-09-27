export const promiseStatus = {
  IDLE: "IDLE",
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "REJECTED",
} as const; //? `as const` asegura que los valores sean literales de string y no solo `string`

//? Definición de tipos para el estado
interface State {
  status: keyof typeof promiseStatus;
  error?: string | null; //? Error puede ser opcional o nulo
}

//export const changeStatus = (state, status) => (state.status = status);
export const changeStatus = (state: State, status: keyof typeof promiseStatus) => {
  state.status = status;
};

// export const pending = (state) => changeStatus(state, promiseStatus.PENDING);
export const pending = (state: State) => {
  changeStatus(state, promiseStatus.PENDING);
};

// export const rejected = (state, action) => {
//   changeStatus(state, promiseStatus.REJECTED);
//   state.error = action.error.message;
// };
export const rejected = (state: State, action: { error: { message: string } }) => {
  changeStatus(state, promiseStatus.REJECTED);
  state.error = action.error.message;
};
