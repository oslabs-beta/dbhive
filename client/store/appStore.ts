// zustand store for global state
import { create } from 'zustand';
import { UserData } from '../clientTypes';

interface AppState {
  username: string;
  secret: string;
  isLoggedIn: boolean;
  logInUser: (username: string, secret: string, userData: UserData) => void;
  logOutUser: () => void;
  userData: UserData;
  updateUserData: (userData: UserData) => void;
}

const useAppStore = create<AppState>()((set) => ({
  username: '',
  secret: '',
  isLoggedIn: false,
  logInUser: (username, secret, userData) =>
    set(() => ({
      username: username,
      secret: secret,
      isLoggedIn: true,
      userData: userData,
    })),
  logOutUser: () =>
    set(() => ({
      username: '',
      secret: '',
      isLoggedIn: false,
      userData: {
        decryption: 'isValid',
        dbs: [],
      },
    })),
  userData: {
    decryption: 'isValid',
    dbs: [],
  },
  updateUserData: (userData) =>
    set(() => ({
      userData: userData,
    })),
}));

export default useAppStore;
