import create from 'zustand';
import { UserData } from '../clientTypes';

interface AppState {
  username: string;
  secret: string;
  isLoggedIn: boolean;
  logInUser: (username: string, secret: string, userData: UserData) => void;
  logOutUser: () => void;
  userData: UserData;
  // updateUserData: () => void;
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
}));

export default useAppStore;
