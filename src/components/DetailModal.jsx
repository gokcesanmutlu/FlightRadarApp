import axios from "axios";
import React, { useEffect, useState } from "react";
import { options2 } from "../constant";
import Loader from "./Loader";
import { useDispatch } from 'react-redux';
import { setPath } from "../redux/slices/flightSlice";

const DetailModal = ({ close, detailId }) => {
  const [d, setDetail] = useState(null);
  //detay verisini tek yerde kullanacağımız için state'te tutmak uygun
  const dispatch = useDispatch()

  useEffect(() => {
    setDetail(null)
    
    axios
      .get(
        `https://flight-radar1.p.rapidapi.com/flights/detail?flight=${detailId}`,
        options2
      )
      .then((res) => {
        setDetail(res.data);
        dispatch(setPath(res.data.trail));
      })
      .catch((err) => console.log(err));
  }, [detailId]);


  return (
    <div className="detail-outer">
      <div className="detail-inner">
        <p className="close-area">
          <span onClick={close}>X</span>
        </p>
        {!d ? (
          <Loader />
        ) : !d.airport.destination || !d.airport.origin ? (
          <p className="warn">This flight's info is secret.</p>
        ) : (
          <>
            <h2>{d.aircraft.model.code}</h2>
            <h2>{d.aircraft.model.text}</h2>
            <p>
              <span>Tail Code:</span>
              <span>{d.aircraft.registration}</span>
            </p>

            <img src={d.aircraft.images?.large[0].src} alt="plane-pic" />

            <p>
              <span>Company:</span>
              <span>{d.airline.short}</span>
            </p>

            <p>
              <span>Launch:</span>
              <span>{d.airport.origin.name}</span>
            </p>

            <p>
              <span>Target:</span>
              <span>{d.airport.destination?.website}</span>
            </p>

            <p>
              <span>Target:</span>
              <a target="_blank" href={d.airport.destination.website}>
                {d.airport.destination.name}
              </a>
            </p>

            <p className={`status ${d.status.icon}`}>
              <span>{d.status.text}</span>
            </p>
            {/* p değil span ile yapınca tam ortalamadı. nedenini anlamadım ama başka projelerde de bu durumla karşılaşırsam aklımda olmalı */}
          </>
        )}
      </div>
    </div>
  );
};

export default DetailModal;
