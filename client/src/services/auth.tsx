import { Component, createContext, createEffect, useContext } from "solid-js";
import { useLocalStorage } from "../utils/useLocalStorage";
import { useApi } from "./api";

function createAuthStore() {
  const api = useApi();

  const [state, setState] = useLocalStorage("auth", {
    token: "",
    error: "",
    user: null,
  });

  createEffect(() => state.token && api.setToken(state.token));

  return [
    state,
    {
      isAuthenticated(): boolean {
        return !!state.token;
      },
      async login(form: { email: string; password: string }) {
        try {
          const token = await api.login(form);
          setState({ token });

          const user = await api.me();
          setState({ user });
        } catch (e) {
          setState("error", e.message);
        }
      },
      logout() {
        setState({
          token: "",
          error: "",
          user: null,
        });
      },
    },
  ] as const;
}

const AuthContext = createContext<ReturnType<typeof createAuthStore>>();

export const AuthProvider: Component<{ url: string }> = (props) => {
  return (
    <AuthContext.Provider value={createAuthStore()}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
