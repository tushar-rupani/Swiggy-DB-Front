import {lazy} from "react"
export const routes = [
    {path: "/", element: lazy(() => import("../pages/Home")) ,isPrivate: false}
]