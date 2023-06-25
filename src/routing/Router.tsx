import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Suspense } from 'react'
import { routes } from "./routes"
const RenderElement = (props: {
    isPublic?: boolean;
    element: React.LazyExoticComponent<() => React.ReactElement>;
}) => {
    // The reason for writing this here, we can actually check if component is private or public then we can render layout accordingly.
    return (
        <props.element />
    )
}
export const Router = () => {
    return (
        <BrowserRouter>
            <Suspense fallback="Loading...">
                <Routes>
                    {routes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                <>
                                    <RenderElement {...route} />
                                </>
                            }
                        />
                    ))}
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}