import react from 'react';
import ArtistSidebar from "../../components/ArtistComponents/ArtistSidebar";
import ArtistHeader from "../../components/ArtistComponents/ArtistHeader";
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    header: {
        zIndex: 1,
        position: 'fixed',
    }
}));


export default function ArtistProfilePage() {
    const classes = useStyles();
    return (
        <div>
            <ArtistHeader className={classes.header}/>

            <ArtistSidebar className="sidebar"/>

        </div>
    )
}