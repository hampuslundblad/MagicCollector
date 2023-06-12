import { Button } from "@mui/material";
import CardTable from "./components/CardTable";
import Header from "./components/Header";
import PriceChart from "./components/PriceChart";
import AddCardDialog from "./components/AddCardDialog";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_PRICE_HISTORY, GET_COLLECTION, GetCollectionResponse } from "./api/queries";
import { Card } from "./types/Card";
import { formatPriceHistoryQuery } from "./services/add-card-service";


function createData(
  name: string,
  quantity: number,
  priceTotal: string,
  foil: string,
  set: string
) {
  return { name, quantity, priceTotal, foil, set };
}


function App() {
  //const [editPriceHistory, { }] = useMutation(UPDATE_PRICE_HISTORY);

  function isDataLoaded() {
    return !loading && !error
  }
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
    return <div> Loading ... </div>;
  }
  if (error) {
    return <div> error </div>;
  } else {
    const cards = parseData(data)
    console.log(data.collection.priceHistory)
    return (
      <div>
        <Header />
        <PriceChart priceHistory={data.collection.priceHistory} />
        <Button>
          Update price history
        </Button>
        <CardTable data={cards} />
        <Button onClick={handleClickOpen} variant="contained">
          Add card
        </Button>
      
        <AddCardDialog isOpen={dialogOpen} handleClose={handleClickClosed} />
      </div>
    );
  }
}

function parseData(array: GetCollectionResponse) : Card[] {
  let result : Card[] = []
  array.collection.cards.forEach(function (card: any) {
    result.push({
      name: card.name,
      quantity: card.quantity,
      priceTotal: card.price,
      set: card.set,
      foil: card.foil
    });
  });
  return result;
}

export default App;
