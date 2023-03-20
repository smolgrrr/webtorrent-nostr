import Offers from "./Offers";
import Requests from "./Requests";
import Header from "./Header";

const Home = () => {

  return (
    <>
    <div>
        <Header/>
        <h2><span>Recent Torrents</span>&nbsp;</h2>
        <div id="main-content">
        <Offers />
        <Requests />
        </div>
      </div>
    </>
  );
};

export default Home;