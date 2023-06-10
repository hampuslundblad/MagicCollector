import { gql, useMutation } from "@apollo/client";
//import { EDIT_COLLECTION } from "../api/queries";

// export const EDIT_COLLECTION = gql`
// mutation EditCollection($editCollectionInput: EditCollectionInput, $editCollectionId2: ID!) {
//   editCollection(editCollectionInput: $editCollectionInput, ID: $editCollectionId2)
// }`

export function addCard(card: any){
    // query scryfall for price

    // use graphql query to add card to db.
    // const [EditCollection, { data, loading, error }] = useMutation(EDIT_COLLECTION );
    // return {data, loading, error}
}
export function formatMutateQuery(name: string, quantity: number, foil: boolean){
    const query = {
        editCollectionInput : {
            cards : {
                name : name,
                quantity : quantity,
                foil : foil
            }
        },
        editCollectionId2: "64843d01b6603439d2b2af3a",
    }
    return query
}