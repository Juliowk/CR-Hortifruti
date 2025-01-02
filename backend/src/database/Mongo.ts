import { MongoClient, Db } from "mongodb";

import dotenv from "dotenv";
dotenv.config();

export const MongoConnect = {
  client: undefined as unknown as MongoClient,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    try {
      const url = process.env.DB_URL_MONGO || "mongodb://localhost:27017/";
      
      const client = new MongoClient(url);
      await client.connect();

      const db = client.db("products");

      try {
        await db.command({ ping: 1 });
        console.log("Connected to database!");
      } catch (pingError) {
        console.log("Database connection failed during ping:", pingError);
        throw new Error("Unable to ping the database. It might be down.");
      }

      this.client = client;
      this.db = db;
    } catch (error) {
      console.log("Failed to connect to the database:", error);

      if (this.client) {
        await this.client.close();
      }

      throw new Error("Unable to establish a database connection.");
    }
  },
};
