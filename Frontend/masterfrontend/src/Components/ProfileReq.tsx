import Stack from "@mui/material/Stack";

const currentA1X = 6;
const currentG1X = 0;

export const ProfileReq: React.FC = () => {
  return (
    <Stack>
      <h3>Profile Requirements</h3>
      <p>{currentA1X}/30 A1X</p>
      <p>{currentG1X}/6 G1X</p>
    </Stack>
  );
};
