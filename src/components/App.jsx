import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from "./Navigation/Navigation";
import Loader from './Loader/Loader';

const Homepage = lazy(() => import('../Pages/HomePage/Home'));
const Movies = lazy(() => import('../Pages/Movies/Movies'));
const MovieDetailsPage = lazy(() => import('../Pages/MovieDetailsPage/MovieDetailsPage'));
const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'));

export default function App() { 

  return (
    <>
      <Navigation />
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="/movies/:movieId/cast" element={<Cast />} />
            <Route path="/movies/:movieId/reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<Homepage />} />
        </Routes>
      </Suspense>      
    </>
  );
};
