import mongoose from "mongoose";

export const conectDatabase = async () => {
    await mongoose.connect(process.env.DATA_BASE_URL) // fazendo a conexao com o banco de dados
    console.log("Conexao com o banco feita com sucesso")
    return mongoose.connection
}