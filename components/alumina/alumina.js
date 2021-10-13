import Image from "next/image";
import { AiFillLinkedin, AiOutlineGithub } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import TagCom from "../tag/tag";
import classes from "./alumina.module.scss";

const Alumina = ({ aluminaData }) => {
  return (
    <div>
      <div className={classes.profileImage}>
        <Image
          src={aluminaData.image}
          alt={aluminaData.name}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div>
        <div className={classes.name}>{aluminaData.name}</div>
      </div>
      <div className={classes.onlineContacts}>
        Online Profiles:{" "}
        <div className={classes.icons}>
          <a href={aluminaData.aluminaContacts.linkedIn} target="blank">
            <AiFillLinkedin style={{ color: "#0077b5" }} />
          </a>
          {aluminaData.aluminaContacts.github && (
            <a href={aluminaData.aluminaContacts.github} target="blank">
              <AiOutlineGithub style={{ color: "#171515" }} />
            </a>
          )}
          {aluminaData.aluminaContacts.website && (
            <a href={aluminaData.aluminaContacts.website} target="blank">
              <CgWebsite />
            </a>
          )}
        </div>
      </div>
      <div className={classes.details}>
        <label>Phone Number: </label>
        <div className={classes.content}>
          {aluminaData.aluminaContacts.number || "NA"}
        </div>
      </div>
      <div className={classes.details}>
        <label>Email: </label>
        <div className={classes.content}>
          {aluminaData.aluminaContacts.emailId}
        </div>
      </div>
      <div className={classes.details}>
        <label>About: </label>
        <div className={classes.content}>{aluminaData.aluminaDetail}</div>
      </div>
      <div className={classes.details}>
        <label>Passing Year: </label>
        <div className={classes.content}>{aluminaData.passingYear}</div>
      </div>
      <div className={classes.details}>
        <label>Passing Year Marks: </label>
        <div className={classes.content}>{aluminaData.passingYearResult}</div>
      </div>
      <div className={classes.details}>
        <label>Work Experience: </label>
        <div className={classes.content}>{aluminaData.workExperience}</div>
      </div>
      <div className={classes.details}>
        <label>Interest: </label>
        <div className={classes.content}>
          {aluminaData.aluminaInterest
            ? aluminaData.aluminaInterest.map((interest) => {
                return <TagCom tagName={interest} />;
              })
            : "NA"}
        </div>
      </div>
      <div className={classes.details}>
        <label>Projects: </label>
        <div className={classes.content}>
          {aluminaData.projectsLinks
            ? aluminaData.projectsLinks.map((project) => {
                return (
                  <a href={project} target="blank">
                    <TagCom tagName={project} />
                  </a>
                );
              })
            : "NA"}
        </div>
      </div>
    </div>
  );
};

export default Alumina;
