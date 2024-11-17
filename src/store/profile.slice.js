import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  profiles: [],
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProfiles: (state, action) => {
      state.profiles = action.payload;
    }
  },
})

export const { setLoading, setProfiles } = profileSlice.actions

export default profileSlice.reducer;
