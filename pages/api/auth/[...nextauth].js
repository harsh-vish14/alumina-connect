import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import User from "../../../model/user";
import dbConnect from "../../../lib/dbConnect";
import { verifyPassword } from "../../../lib/auth";
// import Adapters from "next-auth/adapters";
(async () => {
  await dbConnect();
})();
export default NextAuth({
  session: {
    jws: true,
  },
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_KEY,
    }),
    Providers.Credentials({
      async authorize(credentials) {
        let userDetails;
        await User.findOne({ email: credentials.email }).then((user) => {
          if (!user) {
            throw new Error("User not found");
            return;
          }
          userDetails = user;
        });
        const isCorrect = await verifyPassword(
          credentials.password,
          userDetails.password
        );

        if (!isCorrect) {
          throw new Error("Invalid Password");
          return;
        }
        return {
          email: userDetails.email,
          name: userDetails.email,
          image: userDetails.email,
          userID: userDetails._id,
          isAdmin: userDetails.isAdmin,
        };
      },
    }),
  ],

  callbacks: {
    session: async (session, user) => {
      console.log("call back is running");
      session.id = user.id;
      let foundUser = false;
      let userDetails = null;
      const userLogin = await User.findOne({ email: user.email }).then(
        (user) => {
          userDetails = user;
          if (user) {
            foundUser = true;
          }
          console.log("foundOne: ", user);
        }
      );
      console.log(foundUser);
      if (!foundUser) {
        let id = "";
        const userDetails = await User.create({
          email: user.email,
          name: user.name,
          image: user.picture,
        }).then((user) => {
          console.log("createdUser: ", user);
        });
        console.log("userDetails: ", userDetails);
        return {
          user: {
            // userID: userDetails._id,
            email: user.email,
            name: user.name,
            image: user.picture,
          },
        };
      }
      return {
        user: {
          userID: userDetails._id,
          email: userDetails.email,
          name: userDetails.name,
          image: userDetails.image,
          isAdmin: userDetails.isAdmin,
        },
      };
    },
  },
});
