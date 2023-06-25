import { axiosGet } from "../../../axios/method";

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

export const getUsers = async(data:any) => {
    try{
        const response = await axiosGet(`/get-users`, data)
        if(response.status === 200){
            return response.data;
        }
        return;
    }catch(err){
        console.log("Something went wrong", err); 
    }
}

export const getUserOrders = async(userId: number) => {
    try{
        const response = await axiosGet(`/one-to-many-orders/${userId}`)
        if(response.status === 200){
            return response.data;
        }
        return;
    }catch(err){
        console.log("Something went wrong", err); 
    }
}

export const manyToMany = async(data:any) => {
    try{
        const response = await axiosGet(`/many-to-many`, data)
        if(response.status === 200){
            return response.data;
        }
        return;
    }catch(err){
        console.log("Something went wrong", err); 
    }
}

export const manyToManyTag = async(data:any) => {
    try{
        const response = await axiosGet(`/many-to-many-tags`, data)
        if(response.status === 200){
            return response.data;
        }
        return;
    }catch(err){
        console.log("Something went wrong", err); 
    }
}

export const oneToManyPolymorphic = async(data:any) => {
    try{
        const response = await axiosGet(`/polymorphic`, data)
        if(response.status === 200){
            return response.data;
        }
        return;
    }catch(err){
        console.log("Something went wrong", err); 
    }
}

export const manyToManyPolymorphic = async(data:any) => {
    try{
        const response = await axiosGet(`/many-to-many-polymorphic`, data)
        if(response.status === 200){
            return response.data;
        }
        return;
    }catch(err){
        console.log("Something went wrong", err); 
    }
}