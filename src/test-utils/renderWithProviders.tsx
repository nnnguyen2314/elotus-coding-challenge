import React, { PropsWithChildren } from 'react';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import uiReducer, { UIState } from '../shared/store/uiSlice';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchProvider } from '../shared/context/SearchContext';

export type RenderProvidersOptions = {
  routeEntries?: MemoryRouterProps['initialEntries'];
  preloadedUI?: Partial<UIState>;
};

const rootReducer = combineReducers({ ui: uiReducer });
export type RootStateForTests = ReturnType<typeof rootReducer>;

export function createTestStore(preloadedUI: Partial<UIState> = {}) {
  const preloadedState: RootStateForTests = {
    ui: { viewMode: 'grid', theme: 'dark', ...preloadedUI } as UIState,
  } as RootStateForTests;
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export function withAllProviders({ routeEntries = ['/'], preloadedUI }: RenderProvidersOptions = {}) {
  const store = createTestStore(preloadedUI);
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

  return function Wrapper({ children }: PropsWithChildren<{}>) {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <SearchProvider>
            <MemoryRouter initialEntries={routeEntries}>{children}</MemoryRouter>
          </SearchProvider>
        </QueryClientProvider>
      </Provider>
    );
  };
}
