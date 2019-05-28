import React, { useState } from 'react';

// Material
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
        margin: theme.spacing(4),
        display: 'flex',
        justifyContent: 'center',
    },
}));

const ChoreList = props => {
    const styles = useStyles();
    return (
        <div>
        <Paper className={styles.root}>
            <Typography variant="h1">
                Chore List
            </Typography>
        </Paper>
        </div>
    )
}
export default ChoreList;