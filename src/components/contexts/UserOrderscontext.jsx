import axios from "axios";
import { createContext } from "react";


export let UserOrdersContext = createContext()

export default function UserOrdersContextProvider(props) {
    async function getUserOrders() {
        return await axios.get(
            "https://ecommerce.routemisr.com/api/v1/orders/user/6407cf6f515bdcf347c09f17")
          .then((response) => {
            console.log("User orders:", response.data);
            return response.data;
          })

    }
    return(
        <UserOrdersContext.Provider value={{getUserOrders}}>
            {props.children}
        </UserOrdersContext.Provider>
    )
}