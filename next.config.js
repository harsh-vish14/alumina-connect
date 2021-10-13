module.exports = {
  // reactStrictMode: true,
  images: {
    domains: [
      "avatars.dicebear.com",
      "firebasestorage.googleapis.com",
      "thumbs.dreamstime.com",
    ],
  },
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_SECRET_KEY: process.env.GOOGLE_SECRET_KEY,
    MONGODB_URI: process.env.MONGODB_URI,
    AUTH_KEY: process.env.AUTH_KEY,
    DB_APIKEY: process.env.DB_APIKEY,
    DB_AUTHDOMAIN: process.env.DB_AUTHDOMAIN,
    DB_PROJECTID: process.env.DB_PROJECTID,
    DB_STROAGE_BUCKET: process.env.DB_STROAGE_BUCKET,
    DB_MESSAGINGSENDER_ID: process.env.DB_MESSAGINGSENDER_ID,
    DB_APPID: process.env.DB_APPID,
  },
};
