/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import ProductionHouseHome from "views/ProductionHouseHome";
import ArtistProfile from "views/ArtistPages/ArtistProfile";
import ArtistDetails from "views/ArtistPages/ArtistDetails";

const dashboardRoutes = [

  {
    path: "/tablelist",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: TableList,
    layout: "/artist"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/artist"
  },
  {
    path: "/table",
    name: "View Blogs",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/artist"
  },
  {
    path: "/typography",
    name: "Find Advertisments",
    icon: "nc-icon nc-paper-2",
    component: TableList,
    layout: "/artist"
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin"
  // },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: TableList,
    layout: "/artist"
  },
  {
    path: "/artistprofile",
    name: "Profile",
    icon: "nc-icon nc-bell-55",
    component: ArtistProfile,
    layout: "/artist"
  },
  {
    path: "/artistdetail",
    name: "artistdetail",
    icon: "nc-icon nc-bell-55",
    component: ArtistDetails,
    layout: "/artist"
  },
  
];

export default dashboardRoutes;
