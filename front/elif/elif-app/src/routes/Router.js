import { lazy } from "react";
import { Navigate } from "react-router-dom";
import FileRecognition from "../views/FileRecogniton.js";
import Recognition from "../views/Recognition.js";
import Test from "../views/Test.tsx";
import RegFace from "../views/ui/RegFace.tsx";
import WebCamRecognition from "../views/WebcamRecognition.tsx";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/starter", exact: true, element: <Starter /> },
      {
        path: "/",
        element: <Recognition />,
        children: [
          { path: "/webcam", exact: true, element: <WebCamRecognition /> },
          { path: "/filerec", exact: true, element: <FileRecognition /> },
          { path: "/test", exact: true, element: <Test /> },
          { path: "/reg", exact: true, element: <RegFace /> }
        ] 
      },
      { path: "/about", exact: true, element: <About /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
    ],
  },
];

export default ThemeRoutes;
