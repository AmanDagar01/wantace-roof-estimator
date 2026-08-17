import {
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";
  
  import {
    getCurrentUser,
    login as loginRequest,
    logout as logoutRequest,
  } from "../services/auth.service";
  
  const AuthContext = createContext(null);
  
  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const checkSession = async () => {
        try {
          const result = await getCurrentUser();
  
          setUser(result.user);
        } catch {
          setUser(null);
        } finally {
          setLoading(false);
        }
      };
  
      checkSession();
    }, []);
  
    const login = async (
      email,
      password
    ) => {
      const result = await loginRequest(
        email,
        password
      );
  
      setUser(result.user);
  
      return result;
    };
  
    const logout = async () => {
      try {
        await logoutRequest();
      } finally {
        setUser(null);
      }
    };
  
    return (
      <AuthContext.Provider
        value={{
          user,
          loading,
          login,
          logout,
          isAuthenticated: Boolean(user),
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error(
        "useAuth must be used inside AuthProvider"
      );
    }
  
    return context;
  };