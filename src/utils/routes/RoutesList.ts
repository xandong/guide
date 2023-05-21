import React, { lazy } from "react";

interface RouteItem {
  path: string;
  component: React.LazyExoticComponent<React.FC>;
  guarded?: boolean
  routes?: string[];
}

const unguarded: RouteItem[] = [
  {
    path: "/register",
    component: lazy(() => import("../../pages/auth/Register")),
  },
  {
    path: "/login",
    component: lazy(() => import("../../pages/auth/Login")),
  }
]

const guarded: RouteItem[] = [
  {
    path: "/",
    component: lazy(() => import("../../pages/Home")),
    guarded: true,
  },  {
    path: "/profile",
    component: lazy(() => import("../../pages/Profile")),
    guarded: true,
  },
  {
    path: "/check-in",
    component: lazy(() => import("../../pages/CheckIn")),
    guarded: true,
  }
];

const routes: RouteItem[] = unguarded.concat(guarded)
export default routes