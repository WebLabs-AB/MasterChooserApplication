import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Stack from "@mui/material/Stack";
import { InputLabel, MenuItem, Select } from "@mui/material";

import { CourseTable } from "../Components/CourseTable";
import { ProfileReq } from "../Components/ProfileReq";
import { GeneralReq } from "../Components/GeneralReq";
import { courseData } from "../Assets/Interfaces";

function createCourseData(
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
const currentSpec = 6;
const fields = [
  "All",
  "Computer Science",
  "Computer Science and Engineering",
  "Information Technology",
];
const currentField = 0;

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

export const CreateMasterPage: React.FC = () => {
  const courses: courseData[] = courseFields.map((e) => {
    const data: courseData = {
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
          >
            {specialisations.map((e, i) => (
              <MenuItem value={i}>{e}</MenuItem>
            ))}
          </Select>
        </Stack>
        <Stack direction="column">
          <InputLabel>Field of study</InputLabel>
          <Select label="Field of study" value={currentField}>
            {fields.map((e, i) => (
              <MenuItem value={i}>{e}</MenuItem>
            ))}
          </Select>
        </Stack>
      </Stack>
      <Stack direction="row">
        <Stack direction="column">
          <h2>{date}</h2>
          <h3>Specialisation: {specialisations[currentSpec]}</h3>
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
