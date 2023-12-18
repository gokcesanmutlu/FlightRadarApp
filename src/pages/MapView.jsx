import { useDispatch, useSelector } from "react-redux";
import { MapContainer, TileLayer, Popup, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { clearPath } from "../redux/slices/flightSlice";
//yer marker'ını değiştirmek için icon fonksiyonunu çağırıyoruz
import { icon } from "leaflet";

const MapView = ({ openModal }) => {
  const dispatch = useDispatch()
  const state = useSelector((store) => store.flight);

  // bir kütüphanenin fonksiyonunda options diye bi şey görüyorsanız üstüne gelince, bu fonk bizden obje istiyor demektir bu
  //objenin içi boşken ctrl-space yapınca, koyabileceğiniz ayarları size listeler
  const planeIcon = icon({
    iconUrl: "/plane-i.png",
    iconSize:[25,25],
   })

  return (
    <MapContainer center={[38.795069, 35.469991]} zoom={6} scrollWheelZoom={true}>
      {/* MapContainer harita arkasındaki gri alan, tilelayer harita, center:sayfa açıldığında odaklandığı konum
      zoom: sayfa açıklandığındaki yakınlaşma oranı, 
      scrollwheel zoom : mousedaki yuvarlak scroll kısmıyla zoom ayarlansın mı */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {state.flights.map((flight) => (
        <Marker icon={planeIcon} position={[flight.lat, flight.lng]}>
          <Popup>
            <div className="popup">
              <span>Flight Code:{flight.code}</span>
              <button onClick={() => openModal(flight.id)}>
                Detail
              </button>
              <button onClick={() => dispatch(clearPath())}>
                Clean Route
              </button>
            </div>
          </Popup>
        </Marker>
      ))}

      <Polyline positions={state.path} />
    </MapContainer >
  );
};

export default MapView;
