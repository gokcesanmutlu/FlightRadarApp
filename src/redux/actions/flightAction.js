import { createAsyncThunk } from "@reduxjs/toolkit";
import { options } from "../../constant";
import axios from "axios";

export const getFlights = createAsyncThunk("flights/getFlights", async () => {
    // api isteği at
    const res = await axios.request(options)

    // gelen veriyi formatla/ gelen veri dizi şeklinde karışık geliyo neyin ne olduğu belli değil
   const refinedData = res.data.aircraft.map((i) => ({
    // id, kuyruk kodu, enlemi , boylamı
        id: i[0],
        code: i[1],
        lat: i[2],
        lng: i[3],
    }))

    console.log(refinedData)
    //formatlanan veriyi slice'a aktar
    return refinedData;
})