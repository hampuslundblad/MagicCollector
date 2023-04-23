import { Button } from "@mui/material";
import CardTable from "./components/CardTable";
import Header from "./components/Header";
import PriceChart from "./components/PriceChart";
import AddCardDialog from "./components/AddCardDialog";
import { useState } from "react";

function createData(
  name: string,
  quantity: number,
  priceTotal: number,
  foil: string,
  set: string
) {
  return { name, quantity, priceTotal, foil, set };
}
const rows = [
  createData("Savage Knuckleblade", 2, 6.0, "yes", "2x2"),
  createData("Nissa, Vital Force", 5, 9.0, "no", "2x2"),
  createData("Smuggler's Copter", 10, 16.0, "no", "2x2"),
  createData("Meren of Clan Nel Toth", 1, 3.7, "no", "2x2"),
  createData("Gingerbread", 1, 16.0, "no", "2x2"),
];

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClickOpen = () => {
    setDialogOpen(true);
  };
  const handleClickClosed = () => {
    setDialogOpen(false);
  };
  return (
    <div>
      <Header />
      <PriceChart />
      <CardTable data={rows} />
      <Button onClick={handleClickOpen} variant="contained">
        Add card
      </Button>
      <AddCardDialog isOpen={dialogOpen} handleClose={handleClickClosed} />
    </div>
  );
}

export default App;
