import React, { useContext } from 'react';
import { Snackbar as Bar } from '@mui/material';
import { UIContext } from "provider/UIProvider";

const SnackBar = () => {
    const { openSnackBar, setOpentSnackBar, messageAlert, setMessageAlert } = useContext(UIContext);
    console.log("bat thong báo nè", messageAlert)
    console.log("bat thong baop roi ne", openSnackBar)
    const handleClose = () => {
        setOpentSnackBar(false);
        setMessageAlert("")
    };

    return (
        < Bar
            open={openSnackBar}
            autoHideDuration={6000}
            onClose={handleClose}
            message={messageAlert}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }
            }
        //action={action}
        />
    );
}

export default SnackBar;