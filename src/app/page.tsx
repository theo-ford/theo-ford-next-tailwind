import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextLink } from "@prismicio/next";
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
      <div className="bg-white w-full h-screen">
        <div className="mix-blend-exclusion w-25 sticky top-[12.5px] ml-[12.5px]">
          <Logo />
        </div>
        <ol className="text-lg mt-[500px]">{projects}</ol>
        <div class="h-screen w-full bg-red-800"></div>
      </div>

      {/* <SliceZone slices={home.data.slices} components={components} /> */}
    </div>
  );
}
