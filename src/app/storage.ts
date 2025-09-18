export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");

    if (!serializedState) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    console.log("failed to load state: ", err);
    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify({ auth: state.auth });
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.log("failed to save state: ", err);
  }
};
