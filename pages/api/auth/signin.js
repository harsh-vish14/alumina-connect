import { hashPassword } from "../../../lib/auth";
import User from "../../../model/user";
import dbConnect from "../../../lib/dbConnect";
import { passwordCheck, validateEmail } from "../../../lib/validationCheck";

const handler = async (req, res) => {
  await dbConnect();
  if (
    req.method === "POST" &&
    req.headers.authorization === process.env.AUTH_KEY
  ) {
    const { name, email, password } = req.body;
    console.log("body: ", req.body);
    if (!email || !password || !name) {
      res.status(422).json({ err: "Fill all required fields." });
      return;
    }
    if (!email.includes("@")) {
      res.status(422).json({ err: "Please provide a valid email address." });
      return;
    }
    if (!validateEmail(email)) {
      res.status(422).json({ err: "Please provide a valid email address." });
      return;
    }
    const passwordValidation = passwordCheck(password);
    if (!passwordValidation.status) {
      res.status(422).json({ err: passwordValidation.response });
      return;
    }

    await User.findOne({ email }).then((user) => {
      if (user) {
        res.status(422).json({ err: "Email ID is already in used" });
      }
    });
    const hashedPassword = await hashPassword(password);
    await User.create({
      email,
      name,
      password: hashedPassword,
      image:
        "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg",
    });
    res.status(200).json({ message: "Registered user successfully" });
  } else {
    res.status(400).json({ err: "Invalid Authorization" });
  }
};

export default handler;
