import { useState, useEffect } from "react"
import {  ICreateJobDto ,ICompany} from "../../Types/Global.Types"
import TextField from "@mui/material/TextField"
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useNavigate } from "react-router-dom"
import httpModule from "../../Helper/Http.Modul";
import "./Jobs.scss"
import "../../global.scss"
import Companies from "../Companies/Companies.Page"

const jobLevels = ["Intern", "Junior", "MidLevel", "Senior", "TeamLead", "Cto", "Architect"]

export default function AddCompanies() {

const [jobs, setJobs] = useState<ICreateJobDto>({
  title:"",
  jobLevel:"",
  companyId:"",
})
const [companies, setCompanies] = useState<ICompany[]>([]);
const redirect = useNavigate();

const handleClickSaveBtn = () => {
  if (jobs.title === "" || jobs.jobLevel === "" || jobs.companyId === "") {
     alert("ادخل الحقول المطلوبة");
     return;
  }
  httpModule
     .post("/Job/Create", jobs)
     .then((responst) => redirect("/jobs"))
     .catch((error) => console.log(error));
};



const handleClickBack = () => {
  redirect("/jobs")
};
useEffect(() => {
  httpModule
     .get<ICompany[]>("/Company/GetAll")
     .then((response) => {
        setCompanies(response.data);
     })
     .catch((error) => {
        alert("Error");
        console.log(error);
     });
}, []);
  return (
    <div className="content">
      <div className="add-company">
        <h1>اضف وظيفة</h1>
        <TextField 
        autoComplete="off"
        label="الوظيفة"
        variant="outlined"
        value={jobs.title}
        onChange={(e)=>setJobs({...jobs,title:e.target.value})}
        />
        <FormControl fullWidth>
          <InputLabel >الخبرة</InputLabel>
          <Select
            value={jobs.jobLevel}
            label="الخبرة"
            onChange={(e)=>setJobs({...jobs,jobLevel:e.target.value})}
          >
            {jobLevels.map((jobLevel, index) => (
              <MenuItem key={index} value={jobLevel}>
                {jobLevel}
              </MenuItem>
            ))}

            </Select>

            </FormControl>
            <FormControl fullWidth>
               <InputLabel>الشركة</InputLabel>
               <Select
                  value={jobs.companyId}
                  label="Company"
                  onChange={(e) => setJobs({ ...jobs, companyId: e.target.value })}
               >
                  {companies.map((item) => (
                     <MenuItem key={item.id} value={item.id}>
                          {item.name}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>

          <div className="btn">
          <Button variant="outlined" color="primary" onClick={handleClickSaveBtn}>
            Save
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClickBack}>Back</Button>
          </div>

      </div>
    </div>
  )
}
