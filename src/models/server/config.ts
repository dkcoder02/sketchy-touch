import env from "@/env";
import { Avatars, Client, Databases, Storage, Users } from "node-appwrite";

const client = new Client();

client
  .setEndpoint(env.appwrite.ENDPOINT_URL) // Your API Endpoint
  .setProject(env.appwrite.PROJECT_ID) // Your project ID
  .setKey(env.appwrite.API_KEY); // Your secret API key

const databases = new Databases(client);
const avatars = new Avatars(client);
const storage = new Storage(client);
const users = new Users(client);

export { client, databases, users, avatars, storage };
