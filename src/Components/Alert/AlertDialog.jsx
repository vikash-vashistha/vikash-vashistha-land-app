import { AlertDialog, AlertDialogContent, Slide } from "@chakra-ui/react";
import * as React from "react";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ setHandleError, errors, title }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    setHandleError(false);
  };

  return (
    <div>
      <AlertDialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
    { /*   <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogContent>
          {errors.map(({ param, msg }) => (
            <AlertDialogContentText id="alert-dialog-slide-description">
              <l1>
                {<b>{param} :</b>} {msg}
              </l1>
            </AlertDialogContentText>
          ))}
        </AlertDialogContent>
        <AlertDialogActions>
        <button onClick={handleClose}>Close</button>
      </AlertDialogActions>
          */}
      </AlertDialog>
    </div>
  );
}
