const env = {
  appwrite: {
    ENDPOINT_URL: String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT_URL),
    PROJECT_ID: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    API_KEY: String(process.env.NEXT_PUBLIC_APPWRITE_API_KEY),
  },
};

export default env;
