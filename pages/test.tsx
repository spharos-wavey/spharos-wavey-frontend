import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";
import { HorizontalRule } from "@mui/icons-material";

export default function SimpleSnackbar() {
  const [open, setOpen] = React.useState(false);
  const vertical = 'top';
  const horizontal = 'center';

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Button onClick={handleClick}>
        Open simple snackbar
      </Button>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        action={action}
        key={`${vertical}${horizontal}`}
        sx={{ marginTop: '40vh' }}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: "70%" }}>
          결제가 완료되었습니다!
        </Alert>
      </Snackbar>
    </div>
  );
}
