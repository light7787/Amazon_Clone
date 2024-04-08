import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();


export const AuthProvider = ({children})=>{
;
const[UserDetails,setUserDetails]= useState("");
const[product,setProduct]= useState("");


   

    const UserData =(data)=>{
        setUserDetails(data);
       
        return data
    }
   

let userdata=UserDetails;

   const ProductCount = (item)=>{
    setProduct(item);
    return item;
   }
let productcount = product;
 

    return(
      
            <AuthContext.Provider
            value={{ 
               
                UserData,
                userdata,
                ProductCount,
                productcount

            }}
            
            >
                {children}


            </AuthContext.Provider>
    )

        }

        export const useAuth = ()=>{
            const authcontextValue = useContext(AuthContext)
            if(!authcontextValue){
                throw new Error('not passing bhaad me jaa')
            }
            return(
                authcontextValue
            )
        }