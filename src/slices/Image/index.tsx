"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import styled from "styled-components";

/**
 * Props for `Image`.
 */

const Para = styled.p`
  font-size: 200px;
`;
const ImgDiv = styled.div`
  width: 900px;

  /* height: auto; */
  /* overflow: hidden; */

  img {
    width: 100%;
    height: auto;

    /* object-fit: contain; */
  }
`;
export type ImageProps = SliceComponentProps<Content.ImageSlice>;

/**
 * Component for "Image" Slices.
 */
const Image = ({ slice }: ImageProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <ImgDiv>
        <PrismicNextImage field={slice.primary.exhibition_image} />
      </ImgDiv>
    </section>
  );
};

export default Image;
