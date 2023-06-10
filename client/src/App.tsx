import { Button } from "@mui/material";
import CardTable from "./components/CardTable";
import Header from "./components/Header";
import PriceChart from "./components/PriceChart";
import AddCardDialog from "./components/AddCardDialog";
import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { GET_COLLECTION, GetCollectionResponse } from "./api/queries";
import { Card } from "./types/Card";

type GraphQlCard = {
  name: string;
  quantity: number;
  price : string;
  foil: boolean;
  set: string;
}



function createData(
  name: string,
  quantity: number,
  priceTotal: string,
  foil: string,
  set: string
) {
  return { name, quantity, priceTotal, foil, set };
}
// const rows = [
//   createData("Savage Knuckleblade", 2, 6.0, "yes", "2x2"),
//   createData("Nissa, Vital Force", 5, 9.0, "no", "2x2"),
//   createData("Smuggler's Copter", 10, 16.0, "no", "2x2"),
//   createData("Meren of Clan Nel Toth", 1, 3.7, "no", "2x2"),
//   createData("Gingerbread", 1, 16.0, "no", "2x2"),
// ];

function App() {
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
    return (
      <div>
        <Header />
        <PriceChart />
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
  let result : Card[]= []
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
