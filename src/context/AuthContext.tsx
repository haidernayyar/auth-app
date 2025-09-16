import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, AuthProviderType, AuthState, User } from "../types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginData, SignupApiData } from "../utils/validationSchemas";

const USER_SESSION_KEY= '98aafe3b-628d-46c1-b595-05235a1d3433'
const USERS_DB_KEY = '97fe5d63-49cf-45a6-99af-63ab33a4a58a'

export const AuthContext = createContext<AuthContextType | null>(null)
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export const AuthProvider = ({ children }: AuthProviderType) => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [authState, setAuthState] = useState<AuthState>('IDLE');

  useEffect(() => {
    const loadUserFromStorage = async () => {
      setAuthState('PROCESSING')
      try {
        const session = await AsyncStorage.getItem(USER_SESSION_KEY);
        if (session) {
          setUser(JSON.parse(session));
        }
      } catch (e) {
        console.error("Failed to load user session", e);
      } finally {
        setAuthState('DONE')
        setIsLoading(false);
      }
    };
    loadUserFromStorage();
  }, []);

  const login = async (data: LoginData): Promise<void> => {
    try {
      setIsLoading(true);
      const { email, password } = data;
      
      const usersJson = await AsyncStorage.getItem(USERS_DB_KEY);
      if (!usersJson) {
        throw new Error('Unable to initialized the db');
      }
      const users = JSON.parse(usersJson);

      const foundUser = users.find((u: SignupApiData) => u.email === email);
      if (!foundUser) {
        throw new Error('Incorrect email or password.');
      }

      if (foundUser.password !== password) {
        throw new Error('Incorrect email or password.');
      }

      const sessionData = { name: foundUser.name, email: foundUser.email };
      setUser(sessionData);
      await AsyncStorage.setItem(USER_SESSION_KEY, JSON.stringify(sessionData));

    } catch (e) {
      console.error("Failed to log in", e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupApiData): Promise<void> => {
    try {
      setIsLoading(true);
      const { name, email, password } = data;

      const usersJson = await AsyncStorage.getItem(USERS_DB_KEY);
      const users = usersJson ? JSON.parse(usersJson) : [];

      const userExists = users.some((u: SignupApiData) => u.email === email);
      if (userExists) {
        throw new Error('An account with this email already exists.');
      }

      const newUser = { name, email, password };
      users.push(newUser);

      await AsyncStorage.setItem(USERS_DB_KEY, JSON.stringify(users));

      const sessionData = { name, email };
      setUser(sessionData as User);
      await AsyncStorage.setItem(USER_SESSION_KEY, JSON.stringify(sessionData));

    } catch (e) {
      console.error("Failed to sign up", e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(USER_SESSION_KEY);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    authState
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
