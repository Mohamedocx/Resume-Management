import { useState, useEffect } from "react";
import {
  ICreateJobDto,
  ICompany,
  ICandidate,
  ICreateCandidateDto,
  IJob,
} from "../../Types/Global.Types";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import httpModule from "../../Helper/Http.Modul";
import "./Candidate.scss";
import "../../global.scss";

export default function AddCandidate() {
  const [Candidate, setCandidate] = useState<ICreateCandidateDto>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    coverLitter: "",
    jobId: "",
  });

  const redirect = useNavigate();
  const [job, setJob] = useState<IJob[]>([]);
  const [pdffile, setPdffile] = useState<File | null>();

  useEffect(() => {
    httpModule
      .get<IJob[]>("/Job/GetAllJobs")
      .then((res) => {
        setJob(res.data);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err); // More descriptive error logging
      });
  }, []);

  const handleClickSaveBtn = () => {
    if (
      Candidate.firstName === "" ||
      Candidate.lastName === "" ||
      Candidate.email === "" ||
      Candidate.phone === "" ||
      Candidate.coverLitter === "" ||
      Candidate.jobId === "" ||
      !pdffile
    ) {
      alert("ادخل الحقول المطلوبة");
      return;
    }
    const newforrmCadidateformData=new FormData()
    newforrmCadidateformData.append("firstName",Candidate.firstName)
    newforrmCadidateformData.append("lastName",Candidate.lastName)
    newforrmCadidateformData.append("email",Candidate.email)
    newforrmCadidateformData.append("phone",Candidate.phone)
    newforrmCadidateformData.append("coverLitter",Candidate.coverLitter)
    newforrmCadidateformData.append("jobId",Candidate.jobId)
    newforrmCadidateformData.append("pdffile",pdffile)
      httpModule
         .post("/Cadidate/CreateCandidate", newforrmCadidateformData)
         .then((responst) => redirect("/Candidate"))
         .catch((error) => console.log(error));
  };

  const handleClickBack = () => {
    redirect("/Candidate");
  };
  return (
    <div className="content AddCandidate">
      <div className="AddCandidate">
        <h1>اضف مرشح</h1>
        <FormControl fullWidth>
          <InputLabel>مرشح جديد</InputLabel>
          <Select
            value={Candidate.jobId}
            label="المسمى الوظيفي"
            onChange={(e) =>
              setCandidate({ ...Candidate, jobId: e.target.value })
            }
          >
            {job.map((job, index) => (
              <MenuItem key={index} value={job.id}>
                {job.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          autoComplete="off"
          label="الاسم الاول"
          variant="outlined"
          value={Candidate.firstName}
          onChange={(e) =>
            setCandidate({ ...Candidate, firstName: e.target.value })
          }
        />

        <TextField
          autoComplete="off"
          label="الاسم الاخير"
          variant="outlined"
          value={Candidate.lastName}
          onChange={(e) =>
            setCandidate({ ...Candidate, lastName: e.target.value })
          }
        />

        <TextField
          autoComplete="off"
          label="الايميل"
          variant="outlined"
          value={Candidate.email}
          onChange={(e) =>
            setCandidate({ ...Candidate, email: e.target.value })
          }
        />

        <TextField
          autoComplete="off"
          label="رقم الهاتف"
          variant="outlined"
          value={Candidate.phone}
          onChange={(e) =>
            setCandidate({ ...Candidate, phone: e.target.value })
          }
        />

        <TextField
          autoComplete="off"
          label=" خطاب التوصية"
          variant="outlined"
          value={Candidate.coverLitter}
          onChange={(e) =>
            setCandidate({ ...Candidate, coverLitter: e.target.value })}
            multiline
        />
        <input
          type="file"
          style={{height:"120px"}}
          onChange={(e) =>
            setPdffile(e.target.files ? e.target.files[0] : null)
          }
        />

        <div className="btn">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSaveBtn}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClickBack}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
