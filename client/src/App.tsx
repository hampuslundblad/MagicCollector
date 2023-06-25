import { Button, Typography } from "@mui/material";
import CardTable from "./components/CardTable";
import Header from "./components/Header";
import PriceChart from "./components/PriceChart";
import AddCardDialog from "./components/AddCardDialog";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  UPDATE_PRICE_HISTORY,
  GET_COLLECTION,
  GetCollectionResponse,
  EDIT_QUANTITY,
  CREATE_COLLECTION,
} from "./api/queries";

import Spinner from "./components/Spinner/Spinner";
import { Card } from "./types/Card";
import { TableData } from "./components/DemoTable";
import DemoTable from "./components/DemoTable";
import EditCardDialog from "./components/EditCardDialog";
import DeleteCardDialog from "./components/DeleteCardDialog";
import { editQuantityQuery } from "./services/add-card-service";
const ID = "64976654e543b80790c2cf5a";

function App() {
  const [editPriceHistory, {}] = useMutation(UPDATE_PRICE_HISTORY);
  const [editCardQuantity, {}] = useMutation(EDIT_QUANTITY);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { loading, error, data } = useQuery(GET_COLLECTION, {
    variables: { id: ID },
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState("");
  const handleClickOpen = () => {
    setDialogOpen(true);
  };
  const handleClickClosed = () => {
    setDialogOpen(false);
    updateTable();
  };
  const handleOnEditCard = (value: any) => {
    setEditDialogOpen(true);
  };
  const handleOnEditClose = () => {
    setEditDialogOpen(false);
  };
  const handleEditDialog = async (quantity: number) => {
    console.log(quantity);
    const query = editQuantityQuery(selectedCard, quantity);
    const response = await editCardQuantity({ variables: query });
    if (response?.data.editQuantity) {
      setEditDialogOpen(false);
      updateTable();
    }
  };
  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
  };
  const handleOnDeleteCard = () => {
    setDeleteDialogOpen(true);
  };
  const handleSelectedCard = (name: string) => {
    setSelectedCard(name);
  };
  if (loading) {
    return (
      <>
        <Header />
        <Spinner className={`ml-auto mr-auto mt-auto mb-auto`}></Spinner>
      </>
    );
  }
  if (error) {
    return (
      <>
        <Header />
        <div> error </div>
        <Button onClick={handleClickOpen} variant="contained">
          Add card
        </Button>
        <AddCardDialog isOpen={dialogOpen} handleClose={handleClickClosed} />
      </>
    );
  } else {
    const cards = parseData(data);

    return (
      <div>
        <Header />
        <PriceChart priceHistory={data.collection.priceHistory} />

        <DemoTable
          data={cards}
          onEditCard={handleOnEditCard}
          onDeleteCard={handleOnDeleteCard}
          handleSelectedCard={handleSelectedCard}
        />
        <div>
          <Button onClick={handleClickOpen} variant="contained">
            Add card
          </Button>
          <Button
            onClick={() => {
              editPriceHistory({
                variables: {
                  id: ID,
                  editPriceHistory: {
                    price: "123",
                  },
                },
              });
              updateTable();
            }}
            className="ml-10 mr-10"
            variant="contained"
          >
            Update price history
          </Button>
        </div>
        <EditCardDialog
          open={editDialogOpen}
          selectedValue={selectedCard}
          handleClose={handleOnEditClose}
          handleEdit={handleEditDialog}
        ></EditCardDialog>
        <AddCardDialog isOpen={dialogOpen} handleClose={handleClickClosed} />
        <DeleteCardDialog
          open={deleteDialogOpen}
          selectedValue={selectedCard}
          handleClose={handleDeleteClose}
          handleDelete={function (quantity: number): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    );
  }
}

function parseData(array: GetCollectionResponse): TableData[] {
  let cards: Card[] = [];
  let result: TableData[] = [];
  array.collection.cards.forEach(function (card: any) {
    cards.push({
      name: card.name,
      quantity: card.quantity,
      priceTotal: card.price,
      set: card.set,
      foil: card.foil,
    });
  });
  cards.forEach(function (item) {
    result.push({
      name: item.name,
      quantity: item.quantity,
      priceTotal: Number((Number(item.priceTotal) * item.quantity).toFixed(2)),
      set: item.set,
      foil: `${item.foil}`,
    });
  });

  return result;
}

const updateTable = () => {
  window.location.reload();
};

export default App;
