import { createTheme } from "@mui/material";
import { lightBlue, green, red, yellow, lightGreen } from "@mui/material/colors";

const Mytheme = createTheme({
    palette: {
        primary: {
            light:lightGreen[100],
            dark: lightGreen[900],
            main: lightGreen[200],
        },
        secondary: {
            light: green[100],
            main: green[900],
        },
        error: {
            light: red[400],
            dark: red[900],
            main: '#d50000'
        },
        warning: {
            light: yellow[300],
            dark: '#ffea00',
            main: '#ffff00',
        },
        info: {
            light: lightBlue[100],
            dark: lightBlue[900],
            main: lightBlue[500],
        }
    }
});

export default Mytheme;