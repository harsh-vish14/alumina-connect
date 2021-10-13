import mongoose from "mongoose";

const AluminaSchema = new mongoose.Schema(
  {
    image: { type: String, required: [true, "Please provide a image"] },
    name: { type: String, required: [true, "Please provide a alumina name"] },
    passingYear: {
      type: String,
      required: [true, "Please provide Passing Year of alumina"],
    },
    workExperience: {
      type: String,
      required: [true, "Please provide work Experience of alumina in years"],
    },
    passingYearResult: {
      type: String,
      required: [
        true,
        "Please provide Passing Year Percentage of alumina passing year",
      ],
    },
    aluminaContacts: {
      number: { type: String, default: null },
      emailId: { type: String, required: [true, "Please provide Email ID"] },
      linkedIn: {
        type: String,
        required: [true, "Please provide LinkedIn Link"],
      },
      github: { type: String, default: null },
      website: { type: String, default: null },
    },
    aluminaDetail: {
      type: String,
      required: [true, "Please provide details about alumina"],
    },
    projectsLinks: [{ type: String }],
    aluminaInterest: [{ type: String }],
    chatsMessage: [
      {
        userId: { type: String },
        name: { type: String },
        image: { type: String },
        dateAndTime: { type: Date },
        message: { type: String },
      },
    ],
  },
  { timestamps: true }
);

mongoose.models = {};

const Alumina = mongoose.model("alumina", AluminaSchema);
export default Alumina;
