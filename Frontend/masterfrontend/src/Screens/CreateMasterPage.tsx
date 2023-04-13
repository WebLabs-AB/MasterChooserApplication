import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Stack from "@mui/material/Stack";

export const CreateMasterPage: React.FC = () => {
  const tabs = ["Create master schema", "See your master schema", "Profile"];
  return (
    <Container>
      <Tabs value={0}>
        <Tab label={tabs[0]} />
        <Tab label={tabs[1]} />
        <Tab label={tabs[2]} />
      </Tabs>
      <Stack direction="row">
        <Stack direction="column">
          <p>Master</p>
          <select>
            <option>AI och maskininlärning</option>
            <option>Industriell ekonomi</option>
            <option>International Software Engineering</option>
            <option>Medicinsk informatik</option>
            <option>Programmering och algoritmer</option>
            <option>Spelprogrammering</option>
            <option>Storskalig mjukvaruutveckling</option>
            <option>Säkra system</option>
          </select>
        </Stack>
        <Stack direction="column">
          <p>Expertise Area</p>
          <select>
            <option>All</option>
          </select>
        </Stack>
      </Stack>
      <Stack direction="row">
        <Stack direction="column">
          <h2>Termin 7 HT 2022</h2>
          <h3>Inriktining: Spelprogrammering</h3>
        </Stack>
      </Stack>
    </Container>
  );
};
