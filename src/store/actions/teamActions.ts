import { Team, TeamDispatch, TeamForm } from "../../types/team";
import api from "../../utils/api";

export const getTeams = () => async (dispatch: TeamDispatch) => {
  dispatch({ type: "GET_TEAMS_START" });
  try {
    const response = await api().get<Team[]>("/teams");
    dispatch({ type: "GET_TEAMS_SUCCESS", payload: response.data });
  } catch {
    dispatch({ type: "GET_TEAMS_ERROR" });
  }
};
