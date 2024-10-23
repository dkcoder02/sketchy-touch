import { db, dbId } from "../name";
import { databases } from "./config";
import createDrawingsCollection from "./drawing.collection";

export default async function getOrCreateDB() {
  try {
    await databases.get(dbId);
    console.log("Database connection");
  } catch (error) {
    try {
      await databases.create(dbId, db);
      //create collections
      await Promise.all([createDrawingsCollection()]);
      console.log("Database connected");
    } catch (error) {
      console.log("Error creating databases or collection", error);
    }
  }

  return databases;
}
