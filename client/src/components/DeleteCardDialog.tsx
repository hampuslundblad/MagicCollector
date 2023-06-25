import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { MutableRefObject, createRef } from "react";

export interface EditDialogProps {
  open: boolean;
  selectedValue: string;
  handleClose: () => void;
  handleDelete: (quantity: number) => void;
}

const DeleteCardDialog = (props: EditDialogProps) => {
  const { open, handleClose, handleDelete, selectedValue } = props;
  const quantityRef = createRef();

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>
          Do you want to remove {selectedValue} from your collection
        </DialogTitle>
        <DialogContent>
          <Button
            variant="contained"
            onClick={() =>
              handleDelete(
                Number(
                  (quantityRef as MutableRefObject<HTMLInputElement>).current
                    .value
                )
              )
            }
          >
            Remove
          </Button>
          <Button onClick={handleClose}> Cancel </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteCardDialog;
