import { searchCard } from "../api/scryfall"

export function formatMutateQuery(name: string, quantity: string, foil: string, price: string){
    const formatedFoil = foil === "true" ? true : false 
    const query = {
        editCollectionInput : {
            cards : {
                name : name,
                quantity : Number(quantity),
                foil :  formatedFoil,
                price: price

            }
        },
        editCollectionId2: "64843d01b6603439d2b2af3a",
    }
    return query
}
export async function fetchCardPrice(name : string) : Promise<string>{
    const response = await searchCard(name)
    return response.price
}