import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#1586FD",
        },
        secondary: {
            main: "#666F73",
            light: "#F8F8F8",
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: "contained",
            },
            styleOverrides: {
                root: {
                    padding: "8px 24px",
                },
            },
        },
        MuiContainer: {
            defaultProps: {
                maxWidth: "lg",
            },
        },
    },
    typography: {
        body1: {
            color: "#0B1134CC",
        },
    },
});

theme.shadows[1] = "0px 5px 22px lightgray";
