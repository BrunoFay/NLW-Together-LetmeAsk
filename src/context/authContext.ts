import { createContext } from "react";
import { IAuthContext } from "../types/auth";

const authContext = createContext({} as IAuthContext)
export default authContext