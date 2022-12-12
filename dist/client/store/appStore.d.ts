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
declare const useAppStore: import("zustand").UseBoundStore<import("zustand").StoreApi<AppState>>;
export default useAppStore;
