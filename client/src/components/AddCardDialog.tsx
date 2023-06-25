import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import {
  FormControl,
  Input,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { fetchCardInfo, formatMutateQuery } from "../services/add-card-service";
import { useMutation } from "@apollo/client";
import { EDIT_COLLECTION } from "../api/queries";
import { AxiosError } from "axios";

type AddCardDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
};
export const AddCardDialog = (props: AddCardDialogProps) => {
  const [open, setOpen] = useState(false);
  const [foil, setFoil] = useState("false");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [apiError, setApiError] = useState(false);
  const [editCollection, { data, loading, error }] =
    useMutation(EDIT_COLLECTION);

  useEffect(() => setOpen(props.isOpen), [props.isOpen]);

  const handleFoilChange = (event: SelectChangeEvent) => {
    setFoil(event.target.value as string);
  };
  const handleNameChange = (event: any) => {
    setName(event.target.value as string);
  };
  const handleQuantityChange = (event: any) => {
    setQuantity(event.target.value as string);
  };
  const handleClose = () => {
    props.handleClose();
    setOpen(false);
  };
  const handleAdd = async () => {
    try {
      const response = await fetchCardInfo(name);
      const query = formatMutateQuery(
        response.name,
        quantity,
        foil,
        response.price,
        response.set
      );
      await editCollection({ variables: query });
      console.log(error);
      handleClose();
    } catch (error) {
      if (error instanceof AxiosError) {
        setApiError(true);
      }
      return;
    }
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        {error && (
          <DialogContent>
            Something went wrong while adding {name} to your collection, please
            try again
          </DialogContent>
        )}
        {apiError && (
          <DialogContent>Sorry but couldn't find {name}</DialogContent>
        )}
        {loading && <DialogContent> Loading...</DialogContent>}
        <DialogTitle>Add card</DialogTitle>
        <DialogContent>
          <DialogContentText>Name</DialogContentText>
          <Input
            required
            autoFocus
            margin="dense"
            id="name"
            onChange={handleNameChange}
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText>Quantity</DialogContentText>
          <Input margin="dense" id="Quantity" onChange={handleQuantityChange} />
        </DialogContent>
        <DialogContent>
          <DialogContentText>Foil</DialogContentText>

          <FormControl sx={{ mt: 2, minWidth: 120 }} margin="dense" required>
            <Select value={foil} label="" onChange={handleFoilChange}>
              <MenuItem value="false">false</MenuItem>
              <MenuItem value="true">true</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          {!loading && <Button onClick={handleAdd}>Add</Button>}
          {!loading && <Button onClick={handleClose}>Cancel</Button>}
          {loading && <Button disabled> Add </Button>}
          {loading && <Button disabled> Cancel </Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AddCardDialog;
