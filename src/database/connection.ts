import * as mongoose from "mongoose";

export class Database {
  constructor() {
    this._connect();
  }

  async _connect() {
    try {
      await mongoose.connect(
        "mongodb+srv://luizd:hklzKVxvEgfn57h3@database.9tpr8.mongodb.net/?retryWrites=true&w=majority"
      );

      console.log("conectado ao banco de dados");
    } catch (error) {
      console.log("Error conexao mongodb:", error);
    }
  }
}

export const database = new Database();
