import dbConnect from "../../../lib/dbConnect";
import User from "../../../model/user";
import Alumina from "../../../model/alumina";

const handler = async (req, res) => {
  if (req.headers.authorization === process.env.AUTH_KEY) {
    await dbConnect();
    const { method } = req;
    const { userId } = req.query;

    await User.findOne({ _id: userId }).then((user) => {
      if (!user) {
        res.status(404).json({ err: "User not found" });
        return;
      }
    });
    switch (method) {
      case "PATCH":
        console.log("body: ", req.body.admin);
        if (!req.body) {
          res.status(400).json({ err: "Invalid Data" });
          return;
        }

        await User.findOneAndUpdate(
          { _id: userId },
          { isAdmin: req.body.admin }
        );
        const users = await User.find(
          {},
          {
            name: 1,
            email: 1,
            image: 1,
            isAdmin: 1,
            createdAt: 1,
          }
        );
        res.status(200).json({ data: users });
        break;
      case "PUT": {
        const { name, email, image } = req.body;
        if (!name || !email || !image) {
          res.status(400).json({ err: "Invalid body" });
          return;
        }

        if (!email.includes("@")) {
          res.status(400).json({ err: "Invalid email" });
          return;
        }

        await User.findOneAndUpdate({ _id: userId }, { name, email, image });
        await Alumina.updateMany(
          {},
          {
            $set: {
              "chatsMessage.$[elem].name": name,
              "chatsMessage.$[elem].image": image,
            },
          },
          {
            multi: true,
            arrayFilters: [{ "elem.userId": userId }],
          }
        );

        res.status(200).json({ data: "Updated successfully" });
        break;
      }
      default:
        res.status(500).json({ err: "Invalid method" });
        break;
    }
  } else {
    res.status(400).json({ err: "Invalid Authorization" });
  }
};

export default handler;
