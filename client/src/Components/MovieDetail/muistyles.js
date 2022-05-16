import { makeStyles } from "@mui/material";

const useStyles = makeStyles(theme => {
    return{
        topBox:{
            [theme.breakpoints.down("md")]:{
                flexDirection: "column"
            }
        }
    }
})

export default useStyles