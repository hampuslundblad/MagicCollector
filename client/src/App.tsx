import { Button } from "@mui/material";
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
} from "./api/queries";

import Spinner from "./components/Spinner/Spinner";
import { Card } from "./types/Card";
import EnhancedTable from "./components/DemoTable";
const ID = "64843d01b6603439d2b2af3a";

function App() {
  const [editPriceHistory, {}] = useMutation(UPDATE_PRICE_HISTORY);

  const { loading, error, data } = useQuery(GET_COLLECTION, {
    variables: { id: "64843d01b6603439d2b2af3a" },
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClickOpen = () => {
    setDialogOpen(true);
  };
  const handleClickClosed = () => {
    setDialogOpen(false);
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
    console.log(data.collection.priceHistory);
    return (
      <div>
        <Header />
        <PriceChart priceHistory={data.collection.priceHistory} />

        <EnhancedTable />
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
              window.location.reload();
            }}
            className="ml-10 mr-10"
            variant="contained"
          >
            Update price history
          </Button>
        </div>
        <AddCardDialog isOpen={dialogOpen} handleClose={handleClickClosed} />
      </div>
    );
  }
}

function parseData(array: GetCollectionResponse): Card[] {
  let result: Card[] = [];
  array.collection.cards.forEach(function (card: any) {
    result.push({
      name: card.name,
      quantity: card.quantity,
      priceTotal: card.price,
      set: card.set,
      foil: card.foil,
    });
  });
  return result;
}

export default App;
