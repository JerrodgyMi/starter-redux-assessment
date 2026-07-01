import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSuggestion = createAsyncThunk(
  "suggestion/fetchSuggestion",
  async () => {
    const response = await fetch(
      "http://localhost:3004/api/suggestion"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch suggestion");
    }

    const data = await response.json();
return data.data;
  }
);

const suggestionSlice = createSlice({
  name: "suggestion",
  initialState: {
    suggestion: {},
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestion.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchSuggestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.suggestion = action.payload;
      })
      .addCase(fetchSuggestion.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default suggestionSlice.reducer;

export const selectSuggestion = (state) => state.suggestion;
