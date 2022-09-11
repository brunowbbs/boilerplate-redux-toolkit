import { RootState } from "../store";

export default function selectUser (state:RootState){
  return state.user.name;
}