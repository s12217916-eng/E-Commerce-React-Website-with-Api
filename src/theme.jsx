import { createTheme } from '@mui/material/styles';
const getTheme = (mode) =>{
    return createTheme({
    palette :{
        mode : mode,
        primary :{
            main : '#ff0000',
            contrastText : '#fff',
            dark : '#ff0000',
            light : '#00ff00'
        }
    },
    typography :{
        fontFamily : 'cursive',
        h2 :{
            fontSize : '4rem',
            fontWeight : 950
        }
    },
    spacing :8,
})}
export default getTheme;