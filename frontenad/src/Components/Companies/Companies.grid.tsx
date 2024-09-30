import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models";
import moment from "moment";
import "./Companies.grid.scss";
import { ICompany } from "../../Types/Global.Types";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "size", headerName: "Size", width: 200 },
  {
    field: "CreatedAt",
    headerName: "Creation Time",
    width: 250,
    renderCell: (params) => moment(params.row.createdAt).format("YYYY-MM-DD "),
  },
];
interface ICompaniesProps {
  data: ICompany[];
}
const CompaniesGrid = ({ data }: ICompaniesProps) => {
  return (
    <Box sx={{ width: "100%", height: "450px" }} className="companies-grid">
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default CompaniesGrid;
