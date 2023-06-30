import { searchCard } from "../api/scryfall";

const ID = "64976654e543b80790c2cf5a";
type CardInfo = {
  name: string;
  price: string;
  set: string;
  imageUri: string;
};

export function editQuantityQuery(
  email: string,
  name: string,
  quantity: number
) {
  return {
    email: email,
    editQuantityInput: {
      name: name,
      quantity: Number(quantity),
    },
  };
}

export function formatEditCollectionQuery(
  email: string,
  name: string,
  quantity: string,
  foil: string,
  price: string,
  set: string
) {
  const formatedFoil = foil === "true" ? true : false;
  const query = {
    editCollectionInput: {
      email: email,
      cards: {
        name: name,
        quantity: Number(quantity),
        foil: formatedFoil,
        price: price,
        set: set,
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
export async function fetchCardInfo(name: string): Promise<CardInfo> {
  const response = await searchCard(name);
  return {
    price: response.price,
    name: response.name,
    set: response.set,
    imageUri: response.imageUri,
  };
}
