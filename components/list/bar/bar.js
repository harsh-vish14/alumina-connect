import { AiFillLinkedin } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi";
import Image from "next/image";
import classes from "./bar.module.scss";
const Bar = ({ name, year, image, linkedIn, onClick }) => {
  return (
    <div className={classes.bar} onClick={onClick}>
      <div className={classes.image}>
        <Image
          src={image}
          alt={name}
          height={70}
          width={70}
          objectFit="cover"
        />
      </div>
      <div className={classes.details}>
        <div className={classes.name}>{name}</div>
        <div className={classes.year}>{year}</div>
      </div>
      <div className={classes.arrow}>
        <FiChevronRight />
      </div>
    </div>
  );
};
export default Bar;
