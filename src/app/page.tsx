import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import { PrismicRichText } from "@prismicio/react";
import Logo from "@/app/components/Logo";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID("page", "home");

  return {
    title: home.data.meta_title,
    description: home.data.meta_description
  };
}

export default async function Index() {
  const client = createClient();
  const home = await client.getByUID("page", "home");
  const allProjects = await client.getAllByType("project");

  const projects = allProjects.map((page, index) => (
    <li key={`single_page_${index}`}>
      <PrismicNextLink field={page} className="p-3">
        {page.data.title}
      </PrismicNextLink>
    </li>
  ));

  return (
    <div>
      <div className="bg-white">
        <nav className="sticky ml-[12.5px] z-30 mix-blend-exclusion top-[12.5px]">
          <div className="mix-blend-exclusion w-25 sticky top-[12.5px] ml-[12.5px] relative float-left">
            <Logo />
          </div>
          <div className="ml-[50%] w-full relative mix-blend-exclusion">
            <p className="mix-blend-exclusion font-sans leading-none text-[#878787] relative float-left">
              <Link href="/">Selected,</Link>&nbsp;
              <Link href="/">Index,</Link>&nbsp;
              <Link href="/">Office</Link>
            </p>
          </div>
        </nav>
        <div>
          <div className="h-screen w-full bg-red-800"></div>
          <div className="h-screen w-full bg-green-800">
            <ol className="text-lg">{projects}</ol>
          </div>
        </div>
      </div>

      {/* <SliceZone slices={home.data.slices} components={components} /> */}
    </div>
  );
}
