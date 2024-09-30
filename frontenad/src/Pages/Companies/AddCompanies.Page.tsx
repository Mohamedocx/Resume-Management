import { useState } from "react"
import { ICreateCompanyDto } from "../../Types/Global.Types"
import TextField from "@mui/material/TextField"
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useNavigate } from "react-router-dom"
import httpModule from "../../Helper/Http.Modul";
import "./Companies.scss"
import "../../global.scss"
export default function AddCompanies() {


const [company, setCompany] = useState<ICreateCompanyDto>({name:"",size:""})
const redirect = useNavigate();

const handleClickSaveBtn = () => {
  if (company.name === "" || company.size === "") {
     alert("Fill all fields");
     return;
  }
  httpModule
     .post("/Company/Create", company)
     .then((responst) => redirect("/companies"))
     .catch((error) => console.log(error));
};


const handleClickBack = () => {
  redirect("/companies")
};
  return (
    <div className="content">
      <div className="add-company">
        <h1>Add New Company</h1>
        <TextField 
        autoComplete="off"
        label="Company Name"
        variant="outlined"
        value={company.name}
        onChange={(e)=>setCompany({...company,name:e.target.value})}
        />
        <FormControl fullWidth>
          <InputLabel >حجم الشركة </InputLabel>
          <Select
            value={company.size}
            label="Company Size"
            onChange={(e)=>setCompany({...company,size:e.target.value})}
          >
            <MenuItem value="Smal">Smal</MenuItem>
            <MenuItem value="Medium">Medum</MenuItem>
            <MenuItem value="Large">Large</MenuItem>
           
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
