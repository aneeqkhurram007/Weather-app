import Weather from "../weather/Weather";
import "./homepage.css";
const Homepage = ({ setLoginUser }) => {
  return (
    <div>
      <div className="homepage">
        <Weather />
        <div className="button" onClick={() => setLoginUser({})}>
          Logout
        </div>
      </div>
    </div>
  );
};

export default Homepage;
