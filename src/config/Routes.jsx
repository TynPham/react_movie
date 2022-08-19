
import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Detail from "../pages/Detail";

const publicRoute = [
  {
    path: "/:category/search/:keyword",
    component: Catalog ,
  },
  {
    path: "/:category/:id",
    component: Detail,
  },
  {
    path: "/:category",
    component: Catalog,
  },
  {
    path: "/",
    component: Home,
  },
];

export default publicRoute;
