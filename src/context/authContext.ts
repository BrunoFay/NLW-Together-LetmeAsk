import { createContext } from "react";
import { IAuthContext } from "../types/Iauth";

const authContext = createContext({} as IAuthContext)
export default authContext