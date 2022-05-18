import { createContext } from "react";
import { IAuthContext } from "../interfaces/Iauth";

const authContext = createContext({} as IAuthContext)
export default authContext