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
  query Collection($id: ID!) {
    collection(ID: $id) {
      cards {
        name
        quantity
        foil
        imageUrl
        price
        set
      }
      priceHistory {
        date
        price
      }
    }
  }
`;

export const EDIT_COLLECTION = gql`
  mutation EditCollection(
    $editCollectionInput: EditCollectionInput
    $editCollectionId2: ID!
  ) {
    editCollection(
      editCollectionInput: $editCollectionInput
      ID: $editCollectionId2
    )
  }
`;
export const UPDATE_PRICE_HISTORY = gql`
  mutation EditCollection($id: ID!, $editPriceHistory: PriceHistoryInput) {
    editPriceHistory(ID: $id, editPriceHistory: $editPriceHistory)
  }
`;
export const EDIT_QUANTITY = gql`
  mutation Mutation($id: ID!, $editQuantityInput: EditQuantityInput) {
    editQuantity(ID: $id, editQuantityInput: $editQuantityInput)
  }
`;
export const CREATE_COLLECTION = gql`
  mutation Mutation {
    createCollection
  }
`;
