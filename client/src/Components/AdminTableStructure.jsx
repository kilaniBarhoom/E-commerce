import * as MUI from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
export default function AdminTableStructure({ rows, columns }) {
  return (
    <MUI.Box className="w-fit rounded-lg">
      <DataGrid
        rows={rows}
        columns={columns}
        // onRowSelectionModelChange={(newRowSelectionModel) => {
        //   setRowSelected(newRowSelectionModel);
        // }}
        className=" w-fit md:max-w-screen-xl sm:max-w-screen-sm overflow-x-scroll text-neutral-600"
        // rowSelectionModel={rowsSelected}
        // rowHeight={70}
        disableRowSelectionOnClick
        density="comfortable"
        sx={{
          //   "& .MuiDataGrid-iconSeparator": {
          //     display: "none",
          //   },
          "& .MuiDataGrid-columnHeader": {
            bgcolor: "#70a9fe",
            color: "#000",
            fontWeight: 800,

            // padding: 0,

            // borderRight: `1px solid rgba(0, 0, 0, 0.5)`,
          },
          // "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
          //   borderRight: `1px solid #000`,
          // },
          "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
            borderBottom: `none`,
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: `rgba(0, 0, 0, 0.1)`,
          },
          "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#70a9fe",
            borderTop: "none",
            color: "#fff",
            height: "10px",
          },
        }}
        columnHeaderHeight={35}
      />
    </MUI.Box>
  );
}

AdminTableStructure.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  rowsSelected: PropTypes.array,
  setRowSelected: PropTypes.func,
};
