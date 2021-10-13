import { Card } from "antd";
import Image from "next/image";

const About = () => {
  return (
    <div
      style={{
        margin: "30px",
        paddingBottom: "30px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
          fontSize: "40px",
          fontWeight: "bold",
        }}
      >
        About Us
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <Card
          style={{
            width: 300,
            padding: 10,
            borderRadius: 5,
            boxShadow: "0 7px 30px -10px rgba(150,170,180,0.5)",
          }}
          cover={
            <Image
              src="/team/harsh.jpg"
              alt="Harshkumar Vishwakarma"
              //   layout="fill"
              height={350}
              width={300}
              objectFit="cover"
              objectPosition="center"
            />
          }
        >
          <div style={{ fontWeight: "bold" }}>
            Harshkumar Vishwakarma TE IT A 14
          </div>
        </Card>
        <Card
          style={{
            width: 300,
            padding: 10,
            borderRadius: 5,
            boxShadow: "0 7px 30px -10px rgba(150,170,180,0.5)",
          }}
          cover={
            <Image
              src="/team/surajit.jpg"
              alt="Surajit Mondal"
              //   layout="fill"
              height={350}
              width={300}
              objectFit="cover"
              objectPosition="center"
            />
          }
        >
          <div style={{ fontWeight: "bold" }}>Surajit Mondal TE IT A 21</div>
        </Card>
        <Card
          style={{
            width: 300,
            padding: 10,
            borderRadius: 5,
            boxShadow: "0 7px 30px -10px rgba(150,170,180,0.5)",
          }}
          cover={
            <Image
              src="/team/kiran.jpg"
              alt="Kiran Maharana"
              //   layout="fill"
              height={350}
              width={300}
              objectFit="cover"
              objectPosition="center"
            />
          }
        >
          <div style={{ fontWeight: "bold" }}>Kiran Maharana TE IT A 50</div>
        </Card>
      </div>
    </div>
  );
};

export default About;
