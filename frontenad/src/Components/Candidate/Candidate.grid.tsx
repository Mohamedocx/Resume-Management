import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models";
import moment from "moment";
import "./Candidate.grid.scss";
import { ICandidate } from "../../Types/Global.Types";
import { baseUrl } from "../../Constant/Url.Constant";
import { Download, PictureAsPdf } from "@mui/icons-material";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "firstName", headerName: "firstName", width: 200 },
  { field: "lastName", headerName: "lastName", width: 150 },
  { field: "email", headerName: "email", width: 150 },
  { field: "phone", headerName: "phone", width: 150 },
  { field: "coverLitter", headerName: "C V", width: 150 },
 
 
  {
    field: "resumeUrl",
    headerName: "Download",
    width: 250,
    renderCell: (params) => <a href={`${baseUrl}/Cadidate/DownloadResume/${params.row.resumeUrl}` }><PictureAsPdf /></a>,
  },
];



interface ICandidateProps {
  data: ICandidate[];
}

const CandidateGrid = ({ data }: ICandidateProps) => {
  return (
    <Box sx={{ width: "100%", height: "450px" }} className="candidate-grid">
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default CandidateGrid;
