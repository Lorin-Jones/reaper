import { Box, Typography } from "@mui/material"
import { REAPER_LOGO } from "../../assets/constants"
import { makeStyles } from "@mui/styles"

export const Header = () => {
    const classes = useStyles();

    return (
        <Box className={classes.header}>
            <Box
                className={classes.image}
                component={'img'}
                src={REAPER_LOGO}
            />
            <Typography variant="h5">{'A Friendly Fright Night Movie Picker'}</Typography>
        </Box>
    )
}

const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(4)
    },
    image: {
        maxWidth: '300px'
    }
}))