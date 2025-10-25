import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ViewMode = 'list' | 'grid';
type ThemeMode = 'light' | 'dark';

export interface UIState {
  viewMode: ViewMode;
  theme: ThemeMode;
}

const initialState: UIState = {
  viewMode: 'grid',
  theme: 'dark',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setViewMode(state, action: PayloadAction<ViewMode>) {
      state.viewMode = action.payload;
    },
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.theme = action.payload;
    },
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
  },
});

export const { setViewMode, setTheme, toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;
