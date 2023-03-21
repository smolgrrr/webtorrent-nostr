import Offers from "./Offers";
import Requests from "./Requests";
import Header from "./Header";

const Browse = () => {

  return (
    <>
    <div>
        <Header/>
        <h2><span>Recent Torrents</span>&nbsp;</h2>
        <div id="main-content">
        <Offers />
        </div>
      </div>
    </>
  );
};

export default Browse;