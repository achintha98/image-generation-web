import React from "react";

export interface TImage {
  name: string;
  imageURL: string;
  status: string;
}

const ImageCard = (prop: TImage) => {
  return (
    <div>
      <img src={props.imageURL}></img>
    </div>
  );
};

export default ImageCard;
