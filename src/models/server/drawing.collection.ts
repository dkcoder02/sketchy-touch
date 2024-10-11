import { Permission } from "node-appwrite";
import { dbId, drawingsCollection, drawingsCollectionId } from "../name";
import { databases } from "./config";

export default async function createDrawingsCollection() {
  // create collection
  await databases.createCollection(
    dbId,
    drawingsCollectionId,
    drawingsCollection,
    [
      Permission.read("users"),
      Permission.create("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ]
  );
  console.log("Drawing collection is created");

  //creating attributes

  await Promise.all([
    databases.createStringAttribute(
      dbId,
      drawingsCollectionId,
      "owner",
      100,
      true
    ),
    databases.createStringAttribute(
      dbId,
      drawingsCollectionId,
      "drawings",
      50000,
      true
    ),
  ]);
  console.log("Drawing Attributes created");
}
