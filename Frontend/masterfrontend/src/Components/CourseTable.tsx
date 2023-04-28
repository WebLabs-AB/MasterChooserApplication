import * as React from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";

import { CourseData } from "../Assets/Interfaces";

interface HeadCell {
  disablePadding: boolean;
  id: keyof CourseData;
  label: string;
  numeric: boolean;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells: readonly HeadCell[] = [
  {
    id: "code",
    numeric: false,
    disablePadding: true,
    label: "Course Code",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Course Name",
  },
  {
    id: "hp",
    numeric: true,
    disablePadding: false,
    label: "HP",
  },
  {
    id: "level",
    numeric: false,
    disablePadding: false,
    label: "Level",
  },
  {
    id: "block",
    numeric: true,
    disablePadding: false,
    label: "Block",
  },
  {
    id: "vof",
    numeric: false,
    disablePadding: false,
    label: "VOF",
  },
];

interface Props {
  courses: CourseData[];
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof CourseData
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
}

export const CourseTable: React.FC<Props> = (props) => {
  const { onSelectAllClick, order, orderBy, numSelected, onRequestSort } =
    props;
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <th
              key={headCells.id}
              aria-sort={
                active
                  ? ({ asc: "ascending", desc: "descending" } as const)[order]
                  : undefined
              }
            ></th>
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
