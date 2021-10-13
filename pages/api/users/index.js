import dbConnect from "../../../lib/dbConnect";
import User from "../../../model/user";
import { hashPassword } from "../../../lib/auth";

const handler = async (req, res) => {
  await dbConnect();
  if (req.headers.authorization === process.env.AUTH_KEY) {
    const { method } = req;

    switch (method) {
      case "GET":
        const { name, email, admin } = req.query;
        try {
          const search = {};
          if (name) {
            search.name = { $regex: name, $options: "i" };
          }
          if (email) {
            search.email = { $regex: email, $options: "i" };
          }
          if (admin) {
            search.isAdmin = admin === "true";
          }

          const users = await User.find(search, {
            name: 1,
            email: 1,
            image: 1,
            isAdmin: 1,
            createdAt: 1,
          });
          res.status(200).json({ data: users });
        } catch (err) {
          console.log(err);
          res.status(500).json({ err: "Server Error Occurred" });
        }
        break;
      case "DELETE":
        const { usersIds } = req.body;
        console.log(req.body);
        if (!usersIds) {
          res.status(400).json({ err: "Invalid Body" });
          return;
        }
        try {
          await User.deleteMany({
            _id: {
              $in: usersIds,
            },
          });
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
        } catch (err) {
          console.log(err);
          res.status(500).json({ err: "Server error Occurred" });
        }
        break;
      case "POST":
        {
          const { name, email, password, image } = req.body;
          console.log("body: ", req.body);
          if (!email || !password || !name || !image) {
            res.status(422).json({ err: "Fill all required fields." });
            return;
          }
          if (!email.includes("@")) {
            res
              .status(422)
              .json({ err: "Please provide a valid email address." });
            return;
          }
          if (password.trim().length < 7) {
            res.status(422).json({ err: "Small password" });
            return;
          }

          await User.findOne({ email }).then((user) => {
            if (user) {
              res.status(422).json({ err: "Email ID is already in used" });
              return;
            }
          });
          const hashedPassword = await hashPassword(password);
          await User.create({
            email,
            name,
            password: hashedPassword,
            image,
          });

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
        }
        break;
      default:
        res.status(500).json({ err: "Invalid method" });
        break;
    }
  } else {
    res.status(400).json({ err: "Invalid Authorization" });
  }
};

export default handler;
