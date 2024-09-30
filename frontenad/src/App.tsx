import { useContext, lazy, Suspense } from "react";
import { ThemeContext } from "./Context/theme.context";
import { NavBar } from "./Components/NavBar/NavBar.Component";
import { Route, Routes } from "react-router-dom";
import CustomLinearProgress from "./Components/custom-linear-progress/CustomLinearProgress.component";
import Candidate from "./Pages/Candidate/Candidate.Page";


// Lazy Loading
const Home = lazy(() => import("./Pages/Home/Home.page"));
const Companies = lazy(() => import("./Pages/Companies/Companies.Page"));
const AddCompanies = lazy(() => import("./Pages/Companies/AddCompanies.Page"));
const Jobs = lazy(() => import("./Pages/Jobs/Jobs.Page"));
const AddJobs = lazy(() => import("./Pages/Jobs/AddJob.Page"));
const AddCandidate = lazy(() => import("./Pages/Candidate/AddCandidate.Page"));
// App Component
function App() {
  const { darkMode } = useContext(ThemeContext);

  console.log(darkMode);

  const appStyle = darkMode ? "app dark" : "app";
  return (
    <div className={appStyle} style={{ direction: "rtl" }}>
      <NavBar />

      <div className="wrapper">
        <Suspense fallback={<CustomLinearProgress />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies">
              <Route index element={<Companies />} />
              <Route path="add" element={<AddCompanies />} />
            </Route>


            <Route path="/jobs">
              <Route index element={<Jobs />} />
              <Route path="add" element={<AddJobs />} />
            </Route>

            <Route path="/candidate">
              <Route index element={<Candidate />} />
              <Route path="add" element={<AddCandidate />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
