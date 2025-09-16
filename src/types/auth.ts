import { LoginData, SignupApiData } from "../utils/validationSchemas";

export interface User {
  name: string;
  email: string;
}

export type AuthState = 'IDLE' | 'PROCESSING' | 'DONE'

export interface AuthContextType {
  user: User | null;
  authState: AuthState;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupApiData) => Promise<void>;
  logout: () => void;
}

export interface AuthProviderType { 
  children: React.ReactNode 
}