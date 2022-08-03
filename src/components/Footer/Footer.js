import { Box, Typography, useTheme } from "@mui/material";

function Footer() {
    const theme = useTheme();

    return (
        <Box
            mt={4}
            style={{
                backgroundColor: theme.palette.grey["900"],
                textAlign: window.innerWidth > 500 ? "right" : "center",
            }}
            sx={{ p: 2 }}
        >
            <Typography>Coffee Chess @ Khaing Khant Htun</Typography>
        </Box>
    );
}

export default Footer;
