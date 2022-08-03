import { Box, CircularProgress } from "@mui/material";

function Loader({ loading }) {
    return (
        <>
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }} my={4}>
                    <CircularProgress />
                </Box>
            ) : (
                <></>
            )}
        </>
    );
}

export default Loader;
