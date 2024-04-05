import * as React from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { CourseData } from "../Assets/Interfaces";


const columns: GridColDef[] = [
  { field: 'code', headerName: 'Code' },
  { field: 'name', headerName: 'Name', width: 300},
  { field: 'hp', headerName: 'HP'},
  { field: 'level', headerName: 'Level' },
  { field: 'period', headerName: 'Period' },
  { field: 'block', headerName: 'Block' },
  { field: 'vof', headerName: 'VOF'}
];

const getRowId = (row: CourseData) => row.code;


// const columns = [
  //   {label: "Course code", accessor: "code"},
  //   {label: "Course name", accessor: "name"},
  //   {label: "HP", accessor: "hp"},
  //   {label: "Level", accessor: "level"},
  //   {label: "Period", accessor: "period"},
  //   {label: "Block", accessor: "block"},
  //   {label: "VOF", accessor: "vof"}
  // ];
  
interface Props {
  courses: CourseData[];
}
export const CourseTable: React.FC<Props> = (props) => {
  return (
    <div>
      <DataGrid
        rows={props.courses}
        columns={columns}
        initialState={{
        }}
        checkboxSelection
        getRowId={getRowId}
      />
    </div>
  );
};
