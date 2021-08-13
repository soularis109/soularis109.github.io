import {ADMIN_ROUTE, MOVIE_ROUTE, MOVIES_ROUTE} from "./utils/consts";
import Films from "./components/Movie/Films";
import FilmsPage from "./components/Movie/FilmsPage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        //Component: Admin
    },
    {
        //path: MOVIES_ROUTE,
        //Component: Admin
    }
]

export const publicRoutes = [
    {
        path: MOVIES_ROUTE,
        Component: Films
    },
    {
        path: MOVIE_ROUTE + '/:id',
        Component: FilmsPage
    },
]