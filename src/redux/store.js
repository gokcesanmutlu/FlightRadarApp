import { configureStore } from "@reduxjs/toolkit";
import flightSlice from './slices/flightSlice';

export default configureStore({
    reducer:{
        flight: flightSlice,
    }
})

// 6. satırdaki ilk flight yazılmayabilirdi ama o zaman abone olurken flight yerine flightSlice yazmak gerek
// Özellikle Slice'ların sayısı çoğaldıkça basit isimler vermek erişimi kolaylaştırır