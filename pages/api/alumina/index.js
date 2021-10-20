import dbConnect from "../../../lib/dbConnect";
import { validateEmail, validationCheck } from "../../../lib/validationCheck";
import Alumina from "../../../model/alumina";

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;
  switch (method) {
    case "GET": {
      const { name, company, year } = req.query;
      try {
        const search = {};
        if (name) {
          search.name = { $regex: name, $options: "i" };
        }

        if (year && year != "null") {
          search.passingYear = {
            $eq: year,
          };
        }

        if (company && company != "null" && company != "undefined") {
          search.companyName = { $eq: company };
        }
        console.log("search: ", search);
        const alumina = await Alumina.find(search, { chatsMessage: 0 });
        res.status(200).json({ data: alumina });
      } catch (err) {
        console.log("26:", err);
        res.status(500).json({ err: err.message });
      }
      break;
    }
    case "POST":
      const {
        image,
        name,
        passingYear,
        workExperience,
        passingYearResult,
        aluminaContacts,
        projectsLinks,
        aluminaDetail,
        aluminaInterest,
        companyName,
        currentPosition,
      } = req.body;
      const validation = validationCheck({
        image,
        name,
        passingYear,
        workExperience,
        passingYearResult,
        aluminaContacts,
        aluminaDetail,
        companyName,
        currentPosition,
      });
      if (!validation.status) {
        res
          .status(400)
          .json({ err: `Please provide a ${validation?.errorAt}` });
        return;
      }

      if (!validateEmail(aluminaContacts.emailId)) {
        res.status(400).json({ err: "Invalid email address" });
        return;
      }
      try {
        await Alumina.create({
          image,
          name,
          passingYear,
          workExperience,
          passingYearResult,
          aluminaContacts,
          projectsLinks,
          aluminaInterest,
          aluminaDetail,
          companyName,
          currentPosition,
        });
        const alumina = await Alumina.find({}, { chatsMessage: 0 });
        res.status(200).json({ data: alumina });
      } catch (err) {
        console.log(err);
        res.status(500).json({ err: err.message });
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
        await Alumina.deleteMany({
          _id: {
            $in: usersIds,
          },
        });
        const alumina = await Alumina.find({}, { chatsMessage: 0 });
        res.status(200).json({ data: alumina });
      } catch (err) {
        console.log(err);
        res.status(500).json({ err: err.message });
      }
      break;
    default:
      res.status(500).json({ err: "Invalid method" });
      break;
  }
};

export default handler;
