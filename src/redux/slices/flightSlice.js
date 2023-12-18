import { createSlice } from "@reduxjs/toolkit";
import { getFlights } from "../actions/flightAction";


const initialState = {
    flights: [],
    isLoading: false,
    isError: false,
    path: [],
}

const flightSlice = createSlice({
    name: "flight",
    initialState,
    reducers: {
        // gelen path değerini store'a aktar
        setPath: (state, action) => {
            //eldeki veriyi kütüphnenin talep ettiği formata çevirme
            state.path =  action.payload.map((i)=>[i.lat, i.lng])
        },
        clearPath: (state, action) => {
            state.path = action.payload;
        }
    },
    extraReducers: (builder) => {
        // get flights'in penging durumunda çalışıcak olan fonk. 'un sadece state'i alması yeterli, yapacağı tek sey isLoadingi true'ya çekmek
        builder.addCase(getFlights.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getFlights.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.flights = action.payload;
            //pushlama senaryosu action payloadda 1den fazla eleman olduğunda mümkün değil bizim action.payload dizisinde 300 eleman var, her türlü eşitlememiz gerek
        })
        builder.addCase(getFlights.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
        })
    }
})

export default flightSlice.reducer;
export const { setPath, clearPath } = flightSlice.actions;
