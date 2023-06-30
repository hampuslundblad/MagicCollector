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

export const GET_COLLECTION_2 = gql`
  query Query($email: String!) {
    collection2(email: $email) {
      priceHistory {
        date
        price
      }
      cards {
        name
        quantity
        foil
        price
        set
        imageUrl
      }
    }
  }
`;
export const GET_COLLECTION = gql`
  query Query($email: String!) {
    collection(email: $email) {
      cards {
        name
        quantity
        foil
        price
        set
        imageUrl
      }
      priceHistory {
        date
        price
      }
    }
  }
`;

export const EDIT_COLLECTION = gql`
  mutation EditCollection($editCollectionInput: EditCollectionInput) {
    editCollection(editCollectionInput: $editCollectionInput)
  }
`;
export const UPDATE_PRICE_HISTORY = gql`
  mutation Mutation($email: String!) {
    editPriceHistory(email: $email)
  }
`;
export const EDIT_QUANTITY = gql`
  mutation Mutation($email: String!, $editQuantityInput: EditQuantityInput) {
    editQuantity(email: $email, editQuantityInput: $editQuantityInput)
  }
`;
export const CREATE_COLLECTION = gql`
  mutation Mutation {
    createCollection
  }
`;
