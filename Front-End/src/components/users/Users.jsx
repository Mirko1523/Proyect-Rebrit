export const UsersApi = async () =>{
try{
    const response = await fetch("http://localhost:3001/api/users")
    if(!response){
        throw error('error');
    }
    return await response.json;
}catch(error){
    console.log('error al obtener usuarios', error)
    throw error;
}

}