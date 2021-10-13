import Alumina from "../../model/alumina";
import AluminaComponent from "../../components/alumina/alumina";
const aluminaWithId = ({ data }) => {
  console.log(data);
  return <AluminaComponent aluminaData={data} />;
};

export const getStaticProps = async (context) => {
  const { alumina } = context.params;
  const aluminaId = alumina;
  const aluminaDetails = await Alumina.findOne(
    {
      "aluminaContacts.linkedIn": { $regex: aluminaId, $options: "i" },
    },
    { chatsMessage: 0 }
  );

  if (!aluminaDetails) {
    console.log("Not found nooooo!");
    return {
      notFound: true,
    };
  }
  console.log("Found Yaaa!: ", aluminaDetails);
  return {
    props: { data: JSON.parse(JSON.stringify(aluminaDetails)) },
    revalidate: 10900,
  };
};
export const getStaticPaths = async (context) => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
export default aluminaWithId;
