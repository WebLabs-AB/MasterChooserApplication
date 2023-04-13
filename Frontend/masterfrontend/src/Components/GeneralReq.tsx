import Stack from "@mui/material/Stack";

const currentA1X = 6;
const currentG1X = 0;

export const GeneralReq: React.FC = () => {
  return (
    <Stack>
      <h3>General Requirements</h3>
      <p>{currentA1X} of at least 60 A1X</p>
      <p>{currentG1X}</p>
    </Stack>
  );
};
