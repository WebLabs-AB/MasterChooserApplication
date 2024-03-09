import * as React from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";

import { CourseData } from "../Assets/Interfaces";

interface Props {
  courses: CourseData[];
}

export const CourseTable: React.FC<Props> = (props) => {
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>HP</th>
            <th>Level</th>
            <th>Period</th>
            <th>Block</th>
            <th>VOF</th>
          </tr>
        </thead>
        <tbody>
          {props.courses.map((row) => (
            <tr>
              <td>{row.code}</td>
              <td>{row.name}</td>
              <td>{row.hp}</td>
              <td>{row.level}</td>
              <td>{row.period}</td>
              <td>{row.block}</td>
              <td>{row.vof}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};
