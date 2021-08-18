import React from "react";
import Typical from "react-typical";

function Typicals() {
  return (
    <div style={{ fontSize: 50, textAlign: "center", color: "#3b82b1" }}>
      <p style={{ fontSize: 50, fontWeight: "bolder" }}>
        <Typical
          loop={Infinity}
          wrapper={"p"}
          steps={[
            "Material UI",
            1000,
            "React",
            500,
            "React Redux !",
            500,
            "Redux-thunk!",
            500,
            "JavaScript",
            500,
            "Express",
            500,
            "MongoDB",
            500,
            "NodeJS",
            500,
            "Cors",
            500,
            "Morgan",
            500,
            "JavaScript",
            500,
          ]}
        />

      </p>
    </div>
  );
}

export default Typicals;
