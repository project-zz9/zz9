import Home from "./home";
import Registration from "./registration";
import Invitation from "./invitation";
import Guestbook from "./guestbook";
import Management from "./management";

type Page = {
  path: string;
  name: string;
  auth: boolean;
  component: JSX.Element;
};

const pages: Page[] = [
  {
    path: "/home",
    name: "Home",
    auth: false,
    component: Home(),
  },
  {
    path: "/registration",
    name: "Registration",
    auth: false,
    component: Registration(),
  },
  {
    path: "/invitation/:uuid",
    name: "Invitation",
    auth: false,
    component: Invitation(),
  },
  {
    path: "/guestbook/:uuid",
    name: "Guestbook",
    auth: false,
    component: Guestbook(),
  },
  {
    path: "/management",
    name: "Management",
    auth: true,
    component: Management(),
  },
];

export const unprotectedPage = pages.filter(({ auth }) => !auth);
export const protectedPage = pages.filter(({ auth }) => auth);
