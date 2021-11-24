import { TeamAction, TeamState } from "../../types/team";

const defaultState: TeamState = {
  data: [],
  loading: false,
  error: "",
};

const teamReducer = (
  state: TeamState = defaultState,
  action: TeamAction
) => {
  switch (action.type) {
    case "GET_TEAMS_START":
      return { ...state, loading: true, error: "" };
    case "GET_TEAMS_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "GET_TEAMS_ERROR":
      return { ...state, loading: false, error: "Error fetching teams" };
    default:
      return state;
  }
};

export default teamReducer;
