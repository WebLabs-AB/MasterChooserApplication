import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { courseData } from "../Assets/Interfaces";

function createData(
  code: string,
  name: string,
  hp: number,
  level: string,
  period: number,
  block: number,
  vof: string
) {
  return { code, name, hp, level, period, block, vof };
}

const names = [
  "Design och programmering av datorspel",
  "Avancerad interaktionsdesign",
  "Interaktionsprogrammering",
  "Mjukvarutekniskt entreprenörskap",
];

const rows = [
  createData("TDDD23", names[0], 6, "A1X", 1, 2, "O"),
  createData("TDDD53", names[1], 6, "A1X", 1, 1, "V"),
  createData("TDDC73", names[2], 6, "G2X", 2, 2, "O"),
  createData("TDDE02", names[3], 6, "A1X", 2, 2, "V"),
];

interface Props {
  courses: courseData[];
}

export const CourseTable: React.FC<Props> = (props) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Course Code</TableCell>
            <TableCell>Course Name</TableCell>
            <TableCell>HP</TableCell>
            <TableCell>Level</TableCell>
            <TableCell>Period</TableCell>
            <TableCell>Block</TableCell>
            <TableCell>VOF</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => (
            <TableRow>
              <TableCell>{row.code}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.hp}</TableCell>
              <TableCell>{row.level}</TableCell>
              <TableCell>{row.period}</TableCell>
              <TableCell>{row.block}</TableCell>
              <TableCell>{row.vof}</TableCell>
            </TableRow>
          ))} */}
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
