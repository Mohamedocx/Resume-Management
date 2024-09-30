import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models";
import moment from "moment";
import "./Jobs.grid.scss";
import { IJob } from "../../Types/Global.Types";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "title", headerName: "Job title", width: 200 },
  { field: "jobLevel", headerName: "jobLevel", width: 150 },
  { field: "companyName", headerName: "companyName", width: 150 },
 
 
  {
    field: "createdAt",
    headerName: "Creation Time",
    width: 250,
    renderCell: (params) => moment(params.row.createdAt).fromNow(),
  },
];



interface IJobsProps {
  data: IJob[];
}

const JobsGrid = ({ data }: IJobsProps) => {
  return (
    <Box sx={{ width: "100%", height: "450px" }} className="jobs-grid">
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default JobsGrid;
