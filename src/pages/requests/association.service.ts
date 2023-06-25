import { axiosGet } from "../../axios/method";

export const getOneToOne = async(data:any) => {
    try{
        const response = await axiosGet(`/one-to-one-order`, data)
        if(response.status === 200){
            return response.data;
        }
        return;
    }catch(err){
        console.log("Something went wrong", err);
        
    }
}