import Home from "./home";
import Registration from "./registration";
import Invitation from "./invitation";
import Guestbook from "./guestbook";
import Management from "./management";
import { FC } from "react";

type Page = {
  path: string;
  name: string;
  auth: boolean;
  Component: FC;
};

export const pages: Page[] = [
  {
    path: "/home",
    name: "Home",
    auth: false,
    Component: Home,
  },
  {
    path: "/registration",
    name: "Registration",
    auth: false,
    Component: Registration,
  },
  {
    path: "/invitation/:uuid",
    name: "Invitation",
    auth: false,
    Component: Invitation,
  },
  {
    path: "/guestbook/:uuid",
    name: "Guestbook",
    auth: false,
    Component: Guestbook,
  },
  {
    path: "/management",
    name: "Management",
    auth: true,
    Component: Management,
  },
];

// export const unprotectedPage = pages.filter(({ auth }) => !auth);
// export const protectedPage = pages.filter(({ auth }) => auth);
