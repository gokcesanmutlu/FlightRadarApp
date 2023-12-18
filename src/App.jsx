import { useEffect, useState } from "react";
import Header from "./components/Header";
import MapView from "./pages/MapView";
import ListView from "./pages/ListView";
import { getFlights } from "./redux/actions/flightAction";
import { useDispatch } from "react-redux";
import DetailModal from "./components/DetailModal";

function App() {
  const dispatch = useDispatch();
  const [isMapView, setIsMapView] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailId, setDetailId] = useState(null);

  // uçuş verilerini birden fazla bileşende kullanacağımız için onu store'da tutmamız gerek
  useEffect(() => {
    setInterval(() =>
      dispatch(getFlights())
      , 5000);

  }, []);

  const openModal = (id) => {
    setIsModalOpen(true);
    setDetailId(id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDetailId(null);
  };

  return (
    <>
      <Header />
      {/* burada && kullanırsak uyarı verir çünkü sen bana bi class veriyosun arka planda : da var bende ama sen buna dair bir şey belirtmiyorsun diye*/}

      <div className="view-buttons">
        <button
          className={isMapView ? "active" : ""}
          onClick={() => setIsMapView(true)}
        >
          Harita Görünümü
        </button>
        <button
          className={isMapView ? "" : "active"}
          onClick={() => setIsMapView(false)}
        >
          Liste Görünümü
        </button>
      </div>

      {isMapView ? (
        <MapView openModal={openModal} />
      ) : (
        <ListView openModal={openModal} />
      )}

      {/* her iki sayfada da kullanabilmek için modalı app.jsxde tuttuk */}
      {isModalOpen && <DetailModal close={closeModal} detailId={detailId} />}
    </>
  );
}

export default App;
