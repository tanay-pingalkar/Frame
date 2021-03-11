import { where, whereActtion } from "../../utils/types";

export const setWhere = (payload: where): whereActtion => {
  return {
    type: payload,
  };
};
