import * as React from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";

import { CourseData } from "../Assets/Interfaces";

interface Props {
  courses: CourseData[];
}

const columns = [
  {label: "Course code", accessor: "code"},
  {label: "Course name", accessor: "name"},
  {label: "HP", accessor: "hp"},
  {label: "Level", accessor: "level"},
  {label: "Period", accessor: "period"},
  {label: "Block", accessor: "block"},
  {label: "VOF", accessor: "vof"}
];

export const CourseTable: React.FC<Props> = (props) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
          {
            columns.map(({ label, accessor }) => 
              <th key={accessor}>{label}</th>
              )
          }
          </TableRow>
        </TableHead>
        <TableBody>
        {props.courses.map((row) => (
            <TableRow>
              <TableCell>{row.code}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.hp}</TableCell>
              <TableCell>{row.level}</TableCell>
              <TableCell>{row.period}</TableCell>
              <TableCell>{row.block}</TableCell>
              <TableCell>{row.vof}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
