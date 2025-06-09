import React from "react";

export interface TPack {
  name: string;
  imageURL: string;
  description: string;
}

const PackCard = (prop: TPack) => {
  console.log(prop);
  console.log("prop");
  console.log(prop.imageURL);

  return (
    <div className="border rounded hover:border-red-300 hover:border-1">
      <img src={prop.imageURL} alt="" />
    </div>
  );
};

export default PackCard;
