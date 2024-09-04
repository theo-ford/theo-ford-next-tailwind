import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone, PrismicRichText } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Logo from "@/app/components/Logo";

type Params = { uid: string };

/**
 * This page renders a Prismic Document dynamically based on the URL.
 */

export async function generateMetadata({
  params
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("project", params.uid)
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description
  };
}
console.log("hello world");

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("project", params.uid)
    .catch(() => notFound());
  console.log("hello world");
  console.log(page.data.hero_color === "White");
  var x = page.data.hero_color === "Black";
  return (
    <>
      <div
        className={`${page.data.hero_color === "White" ? "bg-white" : "bg-black"}`}
      >
        <nav className="sticky ml-[12.5px] z-30 mix-blend-exclusion top-[12.5px]">
          <div className="mix-blend-exclusion animate-scale w-full relative float-left mt-[2px]">
            <Logo />
          </div>
          <p className="mix-blend-exclusion font-sans leading-none text-white relative float-left">
            <span className="animate-fade opacity-[0]">
              &nbsp; for {page.data.title} in {page.data.location}.{" "}
              {page.data.year}.
            </span>
          </p>
          <div className="ml-[50%] w-full relative  mix-blend-exclusion animate-fade opacity-[0]">
            <p className="mix-blend-exclusion font-sans leading-none text-[#878787] relative float-left">
              <Link href="/">Selected,</Link>&nbsp;
              <Link href="/">Index,</Link>&nbsp;
              <Link href="/">Office</Link>
            </p>
          </div>
        </nav>

        <div className="">
          <div
            className={`w-full h-screen ${page.data.hero_color === "White" ? "bg-white" : "bg-black"} animate-fade opacity-[0]"`}
          ></div>

          <div className="h-screen w-full bg-red-800">
            <SliceZone slices={page.data.slices} components={components} />
          </div>
        </div>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const client = createClient();

  /**
   * Query all Documents from the API, except the homepage.
   */
  const pages = await client.getAllByType("project", {
    predicates: [prismic.filter.not("my.page.uid", "home")]
  });

  /**
   * Define a path for every Document.
   */
  return pages.map((page) => {
    return { uid: page.uid };
  });
}
