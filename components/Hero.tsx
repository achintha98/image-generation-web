import React from "react";

import { Card, CardContent } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const imageUrls = [
  "https://upload.wikimedia.org/wikipedia/commons/3/38/Gal_Gadot_by_Gage_Skidmore_3.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/38/Gal_Gadot_by_Gage_Skidmore_3.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/38/Gal_Gadot_by_Gage_Skidmore_3.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/38/Gal_Gadot_by_Gage_Skidmore_3.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/38/Gal_Gadot_by_Gage_Skidmore_3.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/38/Gal_Gadot_by_Gage_Skidmore_3.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/38/Gal_Gadot_by_Gage_Skidmore_3.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/38/Gal_Gadot_by_Gage_Skidmore_3.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/38/Gal_Gadot_by_Gage_Skidmore_3.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/38/Gal_Gadot_by_Gage_Skidmore_3.jpg",
];

const Hero = () => {
  return (
    <div className="flex justify-center">
      <div className="max-w-4xl">
        <h1 className="text-4xl p-2 text-center pb-4">
          Generate images for yourself and your family
        </h1>
        <Carousel>
          <CarouselContent>
            {" "}
            {/* 600x400 ratio */}
            {imageUrls.map((url, index) => (
              <CarouselItem key={index} className="basis-1/4">
                <img
                  src={url}
                  alt={`Slide ${index + 1}`}
                  className="w-max-[400px]"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default Hero;
