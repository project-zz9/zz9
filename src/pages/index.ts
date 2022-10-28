import Home from "./home";
import Registration from "./registration";
import Invitation from "./invitation";
import Guestbook from "./guestbook";
import Management from "./management";
import SignIn from "./sign-in";
import { FC } from "react";

type Page = {
  path: string;
  name: string;
  auth: boolean;
  Component: FC;
};

export const HOME_PATH = "/home";
export const REGISTRATION_PATH = "/registration";
export const INVITATION_PATH = "/invitation/:uuid";
export const GUESTBOOK_PATH = "/guestbook/:uuid";
export const SIGNIN_PATH = "/sign-in";
export const MANAGEMENT_PATH = "/management";

export const pages: Page[] = [
  {
    path: HOME_PATH,
    name: "Home",
    auth: false,
    Component: Home,
  },
  {
    path: REGISTRATION_PATH,
    name: "Registration",
    auth: false,
    Component: Registration,
  },
  {
    path: INVITATION_PATH,
    name: "Invitation",
    auth: false,
    Component: Invitation,
  },
  {
    path: GUESTBOOK_PATH,
    name: "Guestbook",
    auth: false,
    Component: Guestbook,
  },
  {
    path: SIGNIN_PATH,
    name: "SignIn",
    auth: false,
    Component: SignIn,
  },
  {
    path: MANAGEMENT_PATH,
    name: "Management",
    auth: true,
    Component: Management,
  },
];
