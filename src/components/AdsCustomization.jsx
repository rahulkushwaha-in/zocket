// src/AdsCustomization.jsx

import React, { useState } from "react";
import ChangeAdCreativeImage from "./ChangeAdCreativeImage";
import ColorPicker from "./ColorPicker";
import CanvasComponent from "./CanvasComponent";

/* This file is storing an object that represents
the initial data for customizing an advertisement. It includes the following properties: */

const templateData = {
  caption: {
    text: "1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs",
    position: { x: 50, y: 50 },
    font_size: 44,
    text_color: "#FFFFFF",
    max_characters_per_line: 31,
  },
  cta: {
    text: "Shop Now",
    position: { x: 190, y: 320 },
    text_color: "#FFFFFF",
    background_color: "#FFFFFF",
  },
  image_mask: { x: 56, y: 442, width: 970, height: 600 },
  urls: {
    mask: "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_mask.png",
    stroke:
      "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Mask_stroke.png",
    design_pattern:
      "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Design_Pattern.png",
      userImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/1200px-A_black_image.jpg",
  },
  
  backgroundColor: "#0369A1",
};


const AdsCustomization = () => {
  const [data, setData] = useState(templateData);

/**
 * The function `handleCaptionChange` updates the `text` property of the `caption` object in the `data`
 * state based on the value of an input event.
 */
  const handleCaptionChange = (event) => {
    setData({
      ...data,
      caption: { ...data.caption, text: event.target.value },
    });
  };

/**
 * The function `handleCtaChange` updates the text value of the cta object within the data state based
 * on the input event.
 */
  const handleCtaChange = (event) => {
    setData({ ...data, cta: { ...data.cta, text: event.target.value } });
  };

/**
 * The function `handleBackgroundColorChange` updates the background color in the `data` object with
 * the provided color.
 */
  const handleBackgroundColorChange = (color) => {
    setData({ ...data, backgroundColor: color });
  };

/**
 * The handleImageChange function updates the userImage URL in the data state object and logs the
 * updated URLs.
 */
  const handleImageChange = (imageUrl) => {
    setData({ ...data, urls: { ...data.urls, userImage:imageUrl } });
    console.log(data.urls)
  };

  return (
    <div className="mx-auto px-20 w-full lg:grid grid-cols-5 ">
     {/* The code snippet is rendering a `CanvasComponent` within a `div` element with
     specific styling classes applied to it. Here's what it's doing: */}
      <div className="col-span-2 py-20 my-10">
        <CanvasComponent data={data} />
      </div>
      <div className="w-full col-span-3 my-10 grid font-poppins">
        <div className="pt-10">
          <h3 className="w-full font-poppins font-bold text-lg text-center subpixel-antialiased">
            Ad Customization
          </h3>
          <p className="text-gray-400 pd-4 text-center mb-8">
            Customise your ad and get the templates accordingly
          </p>
         {/* The code snippet is rendering a component called `ChangeAdCreativeImage`
         within a `div` element. This component is likely responsible for allowing the user to
         change the creative image of the advertisement.  */}
          <div className="border rounded-xl mx-24 p-3">
            <ChangeAdCreativeImage onImageChange={handleImageChange} />
          </div>
          <div className="mx-24 mt-8">
            <div className="flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <div className="px-6 text-gray-400">Edit contents</div>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>
            <div className="border rounded-xl px-4 p-1 mt-8">
              <p className="text-xs mt-0 text-gray-400">Ad Content</p>
              <input
                type="text"
                className="w-full block outline-none font-bold"
                placeholder="Treat Yourself"
                value={data.caption.text}
                onChange={handleCaptionChange}
              />
            </div>
            <div className="border rounded-xl px-4 p-1 mt-8">
              <p className="text-xs mt-0 text-gray-400">CTA</p>
              <input
                type="text"
                className="w-full block outline-none font-bold"
                placeholder="Contact Us"
                value={data.cta.text}
                onChange={handleCtaChange}
              />
            </div>
           {/* This code is rendering a `ColorPicker` component within a `div` element. The
          `ColorPicker` component allows the user to select a color, and it is configured with the
          following props: */}
            <div className="mt-2">
              <ColorPicker
                selectedColor={data.backgroundColor}
                onColorChange={handleBackgroundColorChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsCustomization;
