import mongoose, { connect } from "mongoose";

const connection = { isConnected: true }; /* creating connection object*/

let uri = process.env.MONGODB_URI;
console.log(process.env.MONGODB_URI);

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

export default async function dbConnect() {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    });

    connection.isConnected = db.connections[0].readyState;
    console.log("-----db isConnected-----", db.connections[0].readyState);
  } catch (err) {
    console.log(err);
  }
}
