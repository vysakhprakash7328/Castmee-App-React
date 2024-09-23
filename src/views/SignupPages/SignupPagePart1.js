import react from "react";
import { makeStyles } from '@material-ui/core/styles';
import castingimagepart1 from '../../assets/img/casting_image1.avif';

const useStyles  = makeStyles((theme) => ({
    main: {
        backgroundImage: `url(${castingimagepart1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    castimage:{
        width: '100%',
        height: '100vh'
    }
}));

export default function SignupPagePart1() {
    const classes = useStyles();
    return (
        <div className={classes.main}>
            <h1>SignupPagePart1</h1>

        </div>
    );
}