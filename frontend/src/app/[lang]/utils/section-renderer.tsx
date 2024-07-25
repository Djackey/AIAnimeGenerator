import RichText from "../components/RichText";
import ArticleHeading from "../components/index/ArticleHeading"

import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import Email from "../components/Email";

export function sectionRenderer(section: any, index: number, updatedAt: string) {
  switch (section.__component) {
    
    case "sections.heading":
      return <ArticleHeading key={index} data={{ heading: section.heading, updatedAt: updatedAt }} />;

    case "sections.rich-text":
      return <RichText key={index} data={section} />;

    // case "sections.hero":
    //   return <Hero key={index} data={section} />;
    // case "sections.features":
    //   return <Features key={index} data={section} />;
    // case "sections.testimonials-group":
    //   return <Testimonials key={index} data={section} />;
    // case "sections.pricing":
    //   return <Pricing key={index} data={section} />;
    // case "sections.lead-form":
    //   return <Email key={index} data={section} />;
    default:
      return null;
  }
}
