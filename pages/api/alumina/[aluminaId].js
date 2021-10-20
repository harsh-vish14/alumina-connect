import dbConnect from "../../../lib/dbConnect";
import { validateEmail, validationCheck } from "../../../lib/validationCheck";
import Alumina from "../../../model/alumina";

const handler = async (req, res) => {
  if (req.headers.authorization === process.env.AUTH_KEY) {
    await dbConnect();
    const { method } = req;
    const { aluminaId } = req.query;
    console.log(req.query);
    await Alumina.findOne({ _id: aluminaId }).then((alumina) => {
      if (!alumina) {
        res.status(404).json({ err: "Alumina not found" });
        return;
      }
    });
    switch (method) {
      case "PUT":
        const {
          image,
          name,
          passingYear,
          workExperience,
          passingYearResult,
          aluminaContacts,
          projectsLinks,
          aluminaDetail,
          companyName,
          currentPosition,
          aluminaInterest,
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
          await Alumina.findOneAndUpdate(
            { _id: aluminaId },
            {
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
            }
          );
          const alumina = await Alumina.find({}, { chatsMessage: 0 });
          res.status(200).json({ data: alumina });
        } catch (err) {
          console.log(err);
          res.status(500).json({ err: "Server Error Occurred" });
        }

        break;
      case "GET":
        await Alumina.findOne({ _id: aluminaId }).then((alumina) => {
          if (!alumina) {
            res.status(404).json({ err: "Alumina not found" });
            return;
          } else {
            res.status(200).json({ data: alumina });
            return;
          }
        });
        break;
      default:
        res.status(500).json({ err: "Invalid method" });
        break;
    }
  }
};

export default handler;
