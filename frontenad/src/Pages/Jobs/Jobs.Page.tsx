import { useEffect, useState } from "react";
import httpmodul from "../../Helper/Http.Modul";
import "./Jobs.scss"; // Changed from Companies.scss to Jobs.scss
import { IJob } from "../../Types/Global.Types";
import { Button, CircularProgress } from "@mui/material";
import { redirect, useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import JobsGrid from "../../Components/Jobs/Jobs.grid";

export default function Jobs() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();
  useEffect(() => {
    setLoading(true);
    httpmodul
      .get<IJob[]>("/Job/GetAllJobs")
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err); // More descriptive error logging
        setLoading(false);
      });
  }, []);

  return (
    <div className="content jobs">
         <div className="heading">
            <h2>Jobs</h2>
            <Button variant="outlined" onClick={() => redirect("/jobs/add")}>
               <Add />
            </Button>
         </div>
         {loading ? <CircularProgress size={100} /> : jobs.length === 0 ? <h1>No Job</h1> : <JobsGrid data={jobs} />}
      </div>
    
  );
}
