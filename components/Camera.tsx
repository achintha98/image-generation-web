"use client";

import { useAuth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageCard from "./ImageCard";

const Camera = () => {
  const [images, setImages] = useState<TImage[]>([]);
  const { getToken } = useAuth();

  useEffect(() => {
    (async () => {
      const token = await getToken();
      const response = await axios.get("http://localhost:8080/image/bulk", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setImages(response.data.images);
    })();
  }, []);
  return (
    <div>
      {images.map((image) => (
        <ImageCard {...image} />
      ))}
    </div>
  );
};

export default Camera;
