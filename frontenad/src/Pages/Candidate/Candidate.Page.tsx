import { useEffect, useState } from "react";
import httpmodul from "../../Helper/Http.Modul";
import { ICandidate, IJob } from "../../Types/Global.Types";
import { Button, CircularProgress } from "@mui/material";
import { redirect, useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import CandidateGrid from "../../Components/Candidate/Candidate.grid";
import "../../global.scss"
import "./Candidate.scss"
export default function Candidate() {
  const [Candidate, setJobs] = useState<ICandidate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();
  useEffect(() => {
    setLoading(true);
    httpmodul
      .get<ICandidate[]>("/Cadidate/GetAllCandidate")
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching Candidate:", err); // More descriptive error logging
        setLoading(false);
      });
  }, []);

  return (
    <div className="content Candidate">
         <div className="heading">
            <h2>المرشحين</h2>
            <Button variant="outlined" onClick={() => redirect("/Candidate/add")}>
               <Add />
            </Button>
         </div>
         {loading ? <CircularProgress size={100} /> : Candidate.length === 0 ? <h1>No Candidate</h1> : <CandidateGrid data={Candidate} />}
      </div>
    
  );
}
