import React from "react";
import grade from "../../assets/12_result.pdf";

export default function AssignmentTable() {
  return (
    <div className="py-10 h-full px-4">
      <div className="mx-auto">
        <h1 className="text-center text-2xl my-2 text-darkPurple">
          Report Card
        </h1>
        <div className="flex justify-center items-center  ">
          <iframe
            src={grade}
            className="h-screen w-1/3"
            title="Iframe Example"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
