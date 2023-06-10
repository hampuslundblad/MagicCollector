import { gql } from "@apollo/client";

export type GetCollectionResponse = {
  collection: {
    cards: [
      name: string,
      quantity: number,
      price: string,
      foil: string,
      set: string
    ];
  };
};


export const GET_COLLECTION = gql`
query Collection($id: ID!)  {
  collection(ID: $id) {
    cards {
      name
      quantity
      foil
      imageUrl
      price
      set
    }
  }
}`;

export const EDIT_COLLECTION = gql`
mutation EditCollection($editCollectionInput: EditCollectionInput, $editCollectionId2: ID!) {
  editCollection(editCollectionInput: $editCollectionInput, ID: $editCollectionId2)
}`