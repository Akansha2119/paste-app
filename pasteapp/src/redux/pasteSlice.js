import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const getInitialPastes = () => {
  try {
    const stored = localStorage.getItem("pastes");
    if (!stored || stored === "undefined") return [];  // handle undefined or empty
    return JSON.parse(stored);
  } catch (error) {
    console.error("Error parsing localStorage pastes:", error);
    return [];
  }
};

const initialState = {
  value: getInitialPastes(),
};

export const pasteSlice = createSlice({
  name: 'pastes',
  initialState,
  reducers: {
    addPaste: (state, action) => {
      const paste = action.payload;
      state.value.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.value));
      toast.success("Paste created successfully!");
    },
    removePaste: (state, action) => {
      state.value = state.value.filter(paste => paste.id !== action.payload.id);
      localStorage.setItem("pastes", JSON.stringify(state.value));
      toast.success("Paste removed successfully!");
    },
    resetAllPastes: (state) => {
      state.value = [];
      localStorage.removeItem("pastes");
      toast.success("All pastes cleared!");
    },
    updateTopaste: (state, action) => {
      const updated = action.payload;
      const index = state.value.findIndex(p => p.id === updated.id);
      if (index !== -1) {
        state.value[index] = updated;
        localStorage.setItem("pastes", JSON.stringify(state.value));
        toast.success("Paste updated successfully!");
      }
    }
  },
});

export const { addPaste, removePaste, resetAllPastes, updateTopaste } = pasteSlice.actions;
export default pasteSlice.reducer;
