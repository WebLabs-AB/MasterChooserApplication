import { useState } from "react";
import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Stack from "@mui/material/Stack";
import { InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { CourseTable } from "../Components/CourseTable";
import { ProfileReq } from "../Components/ProfileReq";
import { GeneralReq } from "../Components/GeneralReq";
import { CourseData } from "../Assets/Interfaces";

export const StudentChooseMasterPage: React.FC = () => {
  const date = "Termin 7 HT 2022";
  const tabs = ["Create master schema", "See your master schema", "Profile"];
  const specialisations = [
    "All",
    "AI och maskininlärning",
    "Industriell ekonomi",
    "International Software Engineering",
    "Medicinsk informatik",
    "Programmering och algoritmer",
    "Spelprogrammering",
    "Storskalig mjukvaruutveckling",
    "Säkra system",
  ];
  const [currentSpec, setCurrentSpec] = useState("All");
  const fields = [
    "All",
    "Computer Science",
    "Computer Science and Engineering",
    "Information Technology",
  ];
  const [currentField, setCurrentField] = useState("All");

  const courseNames = [
    "Design och programmering av datorspel",
    "Avancerad interaktionsdesign",
    "Interaktionsprogrammering",
    "Mjukvarutekniskt entreprenörskap",
  ];

  const courseFields = [
    ["TDDD23", courseNames[0], "6", "A1X", "1", "2", "O"],
    ["TDDD53", courseNames[1], "6", "A1X", "1", "1", "V"],
    ["TDDC73", courseNames[2], "6", "G2X", "2", "2", "O"],
    ["TDDE02", courseNames[3], "6", "A1X", "2", "2", "V"],
  ];

  const courses: CourseData[] = courseFields.map((e) => {
    const data: CourseData = {
      code: e[0],
      name: e[1],
      hp: e[2],
      level: e[3],
      period: e[4],
      block: e[5],
      vof: e[6],
    };
    return data;
  });

  const handleSpecChange = (e: SelectChangeEvent) => {
    setCurrentSpec(e.target.value);
  };

  const handleFieldChange = (e: SelectChangeEvent) => {
    setCurrentField(e.target.value);
  };

  return (
    <Container>
      <Tabs value={0}>
        <Tab label={tabs[0]} />
        <Tab label={tabs[1]} />
        <Tab label={tabs[2]} />
      </Tabs>
      <Stack direction="row">
        <Stack direction="column">
          <InputLabel id="spec-label">Specialisation</InputLabel>
          <Select
            labelId="spec-label"
            label="Specialisation"
            value={currentSpec}
            onChange={handleSpecChange}
          >
            {specialisations.map((e) => (
              <MenuItem value={e}>{e}</MenuItem>
            ))}
          </Select>
        </Stack>
        <Stack direction="column">
          <InputLabel>Field of study</InputLabel>
          <Select
            label="Field of study"
            value={currentField}
            onChange={handleFieldChange}
          >
            {fields.map((e) => (
              <MenuItem value={e}>{e}</MenuItem>
            ))}
          </Select>
        </Stack>
      </Stack>
      <Stack direction="row">
        <Stack direction="column">
          <h2>{date}</h2>
          <h3>Specialisation: {currentSpec}</h3>
          <CourseTable courses={courses} />
        </Stack>
        <Stack direction="column">
          <ProfileReq />
          <GeneralReq />
        </Stack>
      </Stack>
    </Container>
  );
};
