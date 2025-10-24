import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ViewMode = 'list' | 'grid';

export interface UIState {
  viewMode: ViewMode;
}

const initialState: UIState = {
  viewMode: 'grid',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setViewMode(state, action: PayloadAction<ViewMode>) {
      state.viewMode = action.payload;
    },
  },
});

export const { setViewMode } = uiSlice.actions;
export default uiSlice.reducer;
