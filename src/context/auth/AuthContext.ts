import type { AuthContextType } from "@/context/auth/authContext.type.ts";
import { type Context, createContext } from "react";

export const AuthContext: Context<AuthContextType | undefined> = createContext<AuthContextType | undefined>(undefined);
