import { Game, GameDispatch, GameForm } from "../../types/game";
import api from "../../utils/api";

export const getGames = (weekId: number) => async (dispatch: GameDispatch) => {
  dispatch({ type: "GET_GAMES_START" });
  try {
    const response = await api().get<Game[]>("/fixture/" + weekId);
    dispatch({ type: "GET_GAMES_SUCCESS", payload: response.data });
  } catch {
    dispatch({ type: "GET_GAMES_ERROR" });
  }
};

export const addGame =
  (form: GameForm) => async (dispatch: GameDispatch) => {
    dispatch({ type: "ADD_GAME_START" });
    try {
      const response = await api().post<Game>("/add-game", form);
      dispatch({ type: "ADD_GAME_SUCCESS", payload: response.data });
    } catch {
      dispatch({ type: "ADD_GAME_ERROR" });
    }
  };

  /*
export const updateGame =
  (form: Partial<GameForm>, categoryId: number) =>
  async (dispatch: GameDispatch) => {
    dispatch({ type: "UPDATE_GAME_START" });
    try {
      const response = await api().put<Game>(
        "/categories/" + categoryId,
        form
      );
      dispatch({ type: "UPDATE_GAME_SUCCESS", payload: response.data });
    } catch {
      dispatch({ type: "UPDATE_GAME_ERROR" });
    }
  };

export const deleteGame =
  (categoryId: number) => async (dispatch: GameDispatch) => {
    dispatch({ type: "DELETE_GAME_START" });
    try {
      await api().delete("/categories/" + categoryId);
      dispatch({ type: "DELETE_GAME_SUCCESS", payload: categoryId });
    } catch {
      dispatch({ type: "DELETE_GAME_ERROR" });
    }
  };

  */