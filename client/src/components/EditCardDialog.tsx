import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
} from "@mui/material";
import { MutableRefObject, createRef } from "react";

export interface EditDialogProps {
  open: boolean;
  selectedValue: string;
  handleClose: () => void;
  handleEdit: (quantity: number) => void;
}

const EditCardDialog = (props: EditDialogProps) => {
  const { open, handleClose, handleEdit, selectedValue } = props;
  const quantityRef = createRef();

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Edit {selectedValue}</DialogTitle>
        <DialogContent>
          <DialogContentText>Quantity</DialogContentText>
          <Input
            defaultValue={1}
            margin="dense"
            id="Quantity"
            inputRef={quantityRef}
          />
        </DialogContent>
        <Button
          variant="contained"
          onClick={() =>
            handleEdit(
              Number(
                (quantityRef as MutableRefObject<HTMLInputElement>).current
                  .value
              )
            )
          }
        >
          Update card
        </Button>
        <Button onClick={handleClose}> Cancel </Button>
      </Dialog>
    </>
  );
};

export default EditCardDialog;
