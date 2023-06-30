import axios from "axios";
const baseUrl = "https://api.scryfall.com";
const searchCardUrl = "/cards/search";
const searchQuery = "?q=";

export async function searchCard(cardName: string) {
  const result = await axios.get(
    baseUrl + searchCardUrl + searchQuery + cardName
  );
  const image_uri_small = result.data.data[0].image_uris.small;
  const card_name = result.data.data[0].name;
  const price = result.data.data[0].prices.eur;
  const set = result.data.data[0].set;

  //Scryfall requests to use a maximum of 10 request per second
  setTimeout(() => {}, 100);
  return { name: card_name, imageUri: image_uri_small, price: price, set: set };
}
