import { useSelector } from "react-redux";

const Header = () => {
  const state = useSelector((store) => store.flight);
  return (
    <header>
      <div>
        <img src="/plane-l.png" />
        <h3>Flight Radar</h3>
      </div>

      <p>
        {state.isLoading
          ? "We are counting flights..."
          : state.isError
            ? "There is a problem via counting."
            : state.flights.length + " Flight was Found."}
      </p>
    </header>
  );
};

export default Header;
