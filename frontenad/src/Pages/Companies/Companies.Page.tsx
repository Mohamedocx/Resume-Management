import { useEffect, useState } from "react";
import httpmodul from "../../Helper/Http.Modul";
import "./Companies.scss";
import { ICompany } from "../../Types/Global.Types";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {Add} from "@mui/icons-material"
import CompaniesGrid from "../../Components/Companies/Companies.grid";
export default function Companies() {

  const [companies, setCompanies] = useState<ICompany[]>([])

  const[loading, setLoading] = useState<boolean>(false)
  const redirect = useNavigate()
  useEffect(() => {
    setLoading(true)
    httpmodul.get<ICompany[]>("/Company/GetAll").then((res) => {
      setCompanies(res.data)
      setLoading(false)
    })
    .catch((err) => {
      alert("Error")
      console.log(err)
      setLoading(false)
    })
  }, [])
  // console.log(companies)

  return (

    <div className="content comapnies">
       <h1>الشركات</h1>
        <Button  variant="outlined" onClick={() => redirect("/Companies/add")} >
          <Add/>
        اضف شركة
        </Button>
      <div className="heaing">
      

       <div> {
          loading ? <CircularProgress size={100}/> : companies.length===0 ? <h1>No Companies Found</h1> : <CompaniesGrid data={companies}/>
        }</div>
      </div>
    </div>
  )
}
