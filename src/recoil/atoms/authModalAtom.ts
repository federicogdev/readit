import { atom } from "recoil";

export interface AuthModalState {
  open: boolean;
  // Depending on this the modal will render appropriate input
  // e.g email & password if view is equal login or
  // e.g email, password and confirmPassword if view is equal to register
  view: ModalView;
}

export type ModalView = "login" | "register" | "resetPassword";

const defaultModalState: AuthModalState = {
  open: false,
  view: "login",
};

export const authModalState = atom<AuthModalState>({
  key: "authModalState",
  default: defaultModalState,
});
