

import { atom, selector } from "recoil";
import client from "../utils/api";

export const apiState = atom({
  key: "dummyApiAtom", // Unique ID for this atom
  default: [], // Initial state value
});


export const fetcall = selector({

    key: "fetchApi",
    get: async ({ get }) => {
        console.log('start')
        try{
            const res = await client.get('https://jsonplaceholder.typicode.com/todos/');
            console.log('this is the response', res.data)
            return res.data;
        }
        catch(e){
            console.error(e)
            return []
        }
    },
    set: ({ set }, newData) => {
        // Set the API data into the atom state
        set(apiState, newData);
      }
})
