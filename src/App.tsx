import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import logo from "./assets/images/logo.svg";
import MangaList from "./Components/MangaList";
import RecentlyReadMangas from "./Components/RecentlyReadMangas";
import { rtkstore } from "./Store/rtkstore";
import SingleManga from "./Components/SingleManga";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <div>
        <div>
          <div className="">
            <img className="" src={logo} alt="" />
          </div>
          <h1>Tike&apos;sReader</h1>
        </div>
        <div>
          <input type="text" />
        </div>
        <div>
          <ul>
            <li>Home</li>
          </ul>
        </div>
      </div>

      <div>
        <Provider store={rtkstore}>
          <RecentlyReadMangas />
        </Provider>
      </div>

      <div>
        <QueryClientProvider client={queryClient}>
          {/* <Manga
            styleType="card"
            title="Kimetsu no Yaiba - Digital Colored Comics"
          /> */}
          <SingleManga title="Solo Leveling" />
          <MangaList />
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;
