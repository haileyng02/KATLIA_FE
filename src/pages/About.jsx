import React from "react";
import { image1, image2 } from "../images/about";

const About = () => {
  return (
    <div className="px-[150px] pt-8 text-justify">
      <h1 className="about-title">KATLIA</h1>
      <p className="mt-7">
        The KATLIA brand offers a timeless Parisian style that is cosmopolitan,
        sophisticated and rich in influences. Crafted from fabrics selected for
        their quality and designed for everyday wear, the wardrobe is eminently
        modular—the supple silhouettes and soft color palette allow KATLIA
        outfits to be restyled and accented over time. Pieces from different
        collections and seasons can be paired effortlessly while maintaining the
        space floating around the body as it moves. Some elements are borrowed
        from traditional Asian clothing: deep pockets, sleek design, and the
        allegory of the perfectly proportioned home as a protective shelter for
        a peaceful, self-assured life
      </p>
      <img src={image1} alt="About Katlia" className="mt-4 w-full" />
      <div className="flex justify-between gap-x-[7%] items-start mt-16">
        <p className="flex-1">
          Each collection is designed and developed in Paris’ historic Le Marais
          district, near the flagship PULCHRI boutique on 28 rue de Poitou.
          KATLIA employs a staff of 85 individuals with common principles and a
          passion for garments that are carefully crafted, from the initial
          sketches to delivery at the boutique.
        </p>
        <p className="flex-1">
          KATLIA uses materials woven in Europe and Japan, handpicked for their
          authenticity, durability and originality. 90% of the wardrobe is
          produced in Europe and the remaining 10% in Turkey and Morocco.{" "}
        </p>
      </div>
      <img src={image2} alt="About Katlia" className="mt-8 w-full" />
      <h1 className="about-title mt-8">TIMELINE</h1>
      <p className="mt-8">
        Katlia Fashion is an online fashion shop in Vietnam, established in
        early 2022 by a group of young friends. Katlia Fashion wishes to give
        consumers a better shopping experience, owning beautiful, modern,
        good-quality products at reasonable prices. Katlia Fashion - sustainable
        Vietnamese fashion, always leading the latest trends, will motivate and
        inspire people to dress well and create positive energy for everyone.{" "}
      </p>
    </div>
  );
};

export default About;
