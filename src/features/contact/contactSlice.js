import { getAllThunk } from "./contactThunk";

const initialState = {
    contacts: [],
    contact: null,
    status: promiseStatus.IDLE,
    error: null
};

const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder 
            //? Obtener todos los contactos
            .addCase(getAllThunk.pending, (state) => { pending(state)})
            .addCase(getAllThunk.fulfilled, (state, action) => {
                changeStatus(state, promiseStatus.FULFILLED);
                state.contacts = action.payload;
            })
            addCase(getAllThunk.rejected, (state, action) => {
                rejected(state, action);
            });
    }
});

export default contactSlice.reducer;