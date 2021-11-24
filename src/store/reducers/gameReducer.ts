import { GameAction, GameState } from "../../types/game";

const defaultState: GameState = {
  data: [],
  loading: false,
  error: "",
};

const categoryReducer = (
  state: GameState = defaultState,
  action: GameAction
) => {
  switch (action.type) {
    case "GET_GAMES_START":
      return { ...state, loading: true, error: "" };
    case "GET_GAMES_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "GET_GAMES_ERROR":
      return { ...state, loading: false, error: "Error fetching games" };
    case "ADD_GAME_START":
      return { ...state, loading: true, error: "" };
    case "ADD_GAME_SUCCESS":
      return {
        ...state,
        loading: false,
        data: [action.payload, ...state.data],
      };
    case "ADD_GAME_ERROR":
      return { ...state, loading: false, error: "Error adding game" };
    default:
      return state;
  }
};

export default categoryReducer;
