import { Button, Dialog, DialogTitle, Typography } from "@mui/material";

export interface EditDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

const EditCardDialog = (props: EditDialogProps) => {
  const { onClose, selectedValue, open } = props;
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Set backup account</DialogTitle>
      </Dialog>
    </>
  );
};

export default EditCardDialog;
