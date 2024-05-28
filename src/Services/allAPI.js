import commonAPI from "./CommonAPI";
import SERVER_URL from "./server_url";

export const addDetailsAPI = async (details)=>{
  return await commonAPI("POST",`${SERVER_URL}/books`,details)
}


export const getDetailsAPI = async ()=>{
  return await commonAPI("GET",`${SERVER_URL}/books`,"")
}

export const removeDetailsAPI = async (details)=>{
  return await commonAPI("DELETE",`${SERVER_URL}/books/${details}`,{})
}


export const updateDetailsAPI = async (bookId,details)=>{
  return await commonAPI("PUT",`${SERVER_URL}/books/${bookId}`,details)
}
