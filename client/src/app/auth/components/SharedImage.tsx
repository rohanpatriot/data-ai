import { Box } from "@mui/material";

export default function SharedImage() {
  return (
    <Box
      sx={{
        color: "white",
        textAlign: "center",
        width: "100%",
        height: "100%",
        backgroundImage: "url(/src/assets/login_banner.svg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: 2,
        borderRadius: 4,
      }}
    />
  );
}
