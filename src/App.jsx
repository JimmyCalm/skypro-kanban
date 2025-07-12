import "./App.css";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import PopExit from "./components/Popups/PopExit";
import PopNewCard from "./components/Popups/PopNewCard";
import PopBrowse from "./components/Popups/PopBrowse";
import PopUser from "./components/Popups/PopUser";

function App() {
  return (
    <div className="wrapper">
      <PopExit />
      <PopNewCard />
      <PopBrowse />
      <Header />
      <Main />
      <PopUser />
    </div>
  );
}

export default App;

//просто комментарий