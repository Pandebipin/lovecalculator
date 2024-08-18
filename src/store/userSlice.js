import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const initialState = {
  name1: "",
  name2: "",
  status: "idle",
  error: null,
};

// Async thunk to save data to Firestore
export const saveLovePercentToFirestore = createAsyncThunk(
  "user/saveLovePercentToFirestore",
  async (loveData, { rejectWithValue }) => {
    try {
      const { name1, name2 } = loveData;
      const docRef = await addDoc(collection(db, "userdata"), {
        name1,
        name2,
      });
      console.log("sucess");
      return { id: docRef.id, ...loveData };
    } catch (error) {
      console.log("error occured red flag", error);
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName1(state, action) {
      state.name1 = action.payload;
    },
    setName2(state, action) {
      state.name2 = action.payload;
    },

    resetData(state) {
      state.name1 = "";
      state.name2 = "";
      state.lovepercent = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveLovePercentToFirestore.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveLovePercentToFirestore.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.name1 = action.payload.name1;
        state.name2 = action.payload.name2;
        // state.lovepercent = action.payload.lovepercent;
      })
      .addCase(saveLovePercentToFirestore.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setName1, setName2, setLovePercent, resetData } =
  userSlice.actions;

export default userSlice.reducer;
