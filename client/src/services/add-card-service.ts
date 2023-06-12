import { searchCard } from "../api/scryfall";

const ID = "64843d01b6603439d2b2af3a";
type CardAndPrice = {
  name: string;
  price: string;
};
type priceHistory = {
  price: string;
  date: string;
};

export function formatMutateQuery(
  name: string,
  quantity: string,
  foil: string,
  price: string
) {
  const formatedFoil = foil === "true" ? true : false;
  const query = {
    editCollectionInput: {
      cards: {
        name: name,
        quantity: Number(quantity),
        foil: formatedFoil,
        price: price,
      },
    },
    editCollectionId2: ID,
  };
  return query;
}

export function formatPriceHistoryQuery(price: string) {
  const query = {
    id: ID,
    editPriceHistory: {
          price: price,
    },
  };
  return query;
}
export async function fetchCardPriceAndName(
  name: string
): Promise<CardAndPrice> {
  const response = await searchCard(name);
  return { price: response.price, name: response.name };
}
