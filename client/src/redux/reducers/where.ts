import { where as stateType, whereActtion } from "../../utils/types";
const where = (state: stateType = "home", action: whereActtion): stateType => {
  switch (action.type) {
    case "home":
      return "home";

    case "notification":
      return "notification";

    case "profile":
      return "profile";

    case "search":
      return "search";

    case "upload":
      return "upload";

    default:
      return state;
  }
};

export default where;
