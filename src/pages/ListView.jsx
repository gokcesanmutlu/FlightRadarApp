import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

const ListView = ({openModal}) => {
  const state = useSelector((store) => store.flight);

  // sayfa başına eleman sayısı
  const itemsPerPage = 10;

  // gösterilecek ilk elemanın dizideki yeri
  const [itemOffset, setItemOffset] = useState(0);

  // gösterilecek sonuncu elemanın dizideki yeri
  const endOffset = itemOffset + itemsPerPage;

  //belirlenen aralıktaki elamanları seçme,    , return kısmında current ıtem'i ekrana basıyoruz
  const currentItems = state.flights.slice(itemOffset, endOffset);

  // toplam sayfa sayısını bulma
  const pageCount = Math.ceil(state.flights.length / itemsPerPage);

  // her yeni sayfa seçtiğimde bunu state'e aktarır
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) 
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className="p-4">
      <table className="table table-dark table-hover mt-5">
        <thead>
          <tr>
            <th>id</th>
            <th>Tail Code</th>
            <th>lat</th>
            <th>lng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((flight) => (
            <tr>
              <td>{flight.id}</td>
              <td>{flight.code}</td>
              <td>{flight.lat}</td>
              <td>{flight.lng}</td>
              <td>
                <button onClick={()=>openModal(flight.id)}>Detail</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        className="pagination"
        breakLabel="..."
        nextLabel="next >"
        // seçtiğimiz sayfanın verisini verir 3e bastığımda hadle page fonk'na event olarak 3 gider
        // ardından bu 3 ü itemsperpage ile çarpar. yani 3 . 10=30'dan itibaren görmeye başlıcaz,
        // bunu state'de tutuyo, ardından endoffset hesaplanıyo yani 30'dan kaça kadar görücez
        onPageChange={handlePageClick}
        pageCount={pageCount}
        previousLabel="< previous"
      />
      {/* API sayfalamayı destekliyorsa yani hangi sayfada hangi verilerin olduğuna dair veriyi bize 
      veriyorsa, handlePage isimli bir fonk açar ve burada api isteği atardık örn bana 15. sayfanın verilerini ver derdik işlem biterdi
      ama uçus radari arısı sayfa sayfa verileri vermiyor biz bunu simule etmeliyiz,
      yani her sayfaya tıklandığında veriyi belli başlı bazı noktalardan  kesicez,
      örn 15e tıklanıldığında 60 ve 70 arası veriyi alıcaz gibi
      bunun için react paginetion bize bazı kodlar sunmuş onu listviewin hemen altına yapıştırdık ve 
      kendi projemize uyarladık yukarıda.*/}
    </div>
  );
};

export default ListView;
