import type { AuthContextType } from "@auth/context/authContextType.ts";
import { type Context, createContext } from "react";

export const AuthContext: Context<AuthContextType | undefined> = createContext<AuthContextType | undefined>(undefined);
