import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Stack from "@mui/material/Stack";

import { CourseTable } from "../Components/CourseTable";
import { ProfileReq } from "../Components/ProfileReq";
import { GeneralReq } from "../Components/GeneralReq";
import { InputLabel, MenuItem, Select } from "@mui/material";

export const CreateMasterPage: React.FC = () => {
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
  const date = "Termin 7 HT 2022";

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
          <CourseTable />
        </Stack>
        <Stack direction="column">
          <ProfileReq />
          <GeneralReq />
        </Stack>
      </Stack>
    </Container>
  );
};
