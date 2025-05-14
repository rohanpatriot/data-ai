import { Box } from "@mui/material";
import loginBanner from '@/assets/login_banner.svg';

export default function SharedImage() {
  return (
    <Box
      sx={{
        color: "white",
        textAlign: "center",
        width: "100%",
        height: "100%",
        backgroundImage: `url(${loginBanner})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: 2,
        borderRadius: 4,
      }}
    />
  );
}
