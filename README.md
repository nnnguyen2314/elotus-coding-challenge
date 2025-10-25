# Movies App (TMDB)

A responsive React + TypeScript app that lists movies from The Movie Database (TMDB). It demonstrates a feature-first architecture, React Query for data fetching, Redux Toolkit + Thunk for UI state, React Context for search, React Router for navigation, and SCSS styling. Unit tests are provided with Testing Library + Jest. Playwright E2E tests are included.

TMDB docs: https://developer.themoviedb.org/reference/intro/getting-started

## User Stories (implemented)
- User can view a list of movies currently playing in theaters. Poster images load asynchronously and fade in.
- Tab bar for Now Playing and Top Rated movies.
- Search bar to find movies (global, filters both tabs).
- Movie details page on click.
- Loading state while waiting for the API and skeleton/placeholder visuals.
- Error message for network/API errors with retry.
- Responsive layout with list/grid segmented control.
- Lazy-load images, customized hover/highlight.

## Tech Stack & Decisions
- React 19 + TypeScript
- React Router v6
- Redux Toolkit + Redux Thunk (UI state such as view mode)
- React Query v5 (API fetching, caching, retries, status)
- React Context (search query state shared across pages)
- SCSS (no UI library)
- Testing Library + Jest for unit tests

## Architecture (feature-first)
- src/
  - features/movies/
    - components/ UI components (MovieCard, MovieGrid, TabBar, SearchBar, SegmentedToggle)
    - containers/ container components that call hooks and render UI
    - hooks/ logic hooks using React Query (useNowPlaying, useTopRated, useSearchMovies, useMovieDetails)
    - misc/ constants, types
    - store/ (reserved if the feature needs its own slice)
    - index.ts (re-exports)
  - shared/
    - components/ common UI (Loader, ErrorMessage, ImageWithFade)
    - context/ SearchContext
    - store/ root Redux store and slices
    - utils/ api.ts (TMDB fetcher), config.ts (env)
    - styles/ globals.scss
  - App.tsx: routes + layout

## Environment Variables
Create a .env file (or copy .env.sample) in the project root:

```
REACT_APP_TMDB_BASE_URL=https://api.themoviedb.org/3
REACT_APP_TMDB_ACCESS_TOKEN=YOUR_TMDB_BEARER_ACCESS_TOKEN
REACT_APP_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

The app uses TMDB API v4 Bearer authentication. Paste your API Read Access Token (v4) as the value of REACT_APP_TMDB_ACCESS_TOKEN. Do not commit secrets.

## Scripts
- npm start — start dev server at http://localhost:3000
- npm test — run unit tests
- npm run build — production build
- npm run lint — run eslint on src
- npm run e2e — run Playwright E2E tests (headless)
- npm run e2e:ui — run Playwright E2E tests with UI mode
- npm run e2e:install — install Playwright browsers

## How to Run
1. Copy .env.sample to .env and add your TMDB API key.
2. Install dependencies: npm install
3. Start the app: npm start
4. Open http://localhost:3000

## Implementation Notes
- Data fetching is isolated in React Query hooks. Results are cached and keyed by route params and search query.
- Redux Toolkit manages view mode (grid/list); the segmented control dispatches setViewMode.
- SearchContext stores the global search query; both Now Playing and Top Rated pages use it: if a query exists, they show search results instead of the default list.
- Images are lazy-loaded and faded in with CSS transitions; placeholders are shown when no poster exists.
- Error and loading states are handled consistently via shared components.

## Tests
- Unit test sample: MovieCard renders title and year (see src/features/movies/components/__tests__).
- Add more tests for hooks/components as needed.
- E2E: a placeholder npm script is provided; integrate Playwright or Cypress if required.

## Folder Export Rules
- Every folder exposes its public API via an index.ts to keep imports clean. Add exports as you extend features.

## Linting
The project uses the default CRA ESLint config. Run npm run lint.

## Accessibility & Responsiveness
- Semantic roles for loader and error messages.
- Keyboard-focusable cards via link wrappers.
- Responsive grid using CSS grid and minmax.
