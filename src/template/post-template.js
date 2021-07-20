import React from "react";
import { Text, Flex, useColorModeValue } from "@chakra-ui/react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import getShareImage from "@jlengstorf/get-share-image";
import Header from "./../components/blog/header";
import SEO from "react-seo-component";
import WordCount from "../assets/word-count";
import ReadingTime from "./../assets/reading-time";
import backgroundImage from "../assets/diamonds.png";
import BlogLayout from "../components/blog/blog-layout";
import ToC from "../components/blog/toc";

const PostTemplate = ({ data, pageContext }) => {
  const { frontmatter, body, slug, timeToRead, wordCount, tableOfContents } =
    data.mdx;
  const { title, description, canonical } = frontmatter;
  const { previous, next } = pageContext;
  const titleBox = useColorModeValue("brand.bg", "dark.lightGrey");

  console.log({ tableOfContents });

  const socialImage = getShareImage({
    title: title,
    cloudName: "richardhaines",
    imagePublicID: "social-card/social-card-garden",
    textAreaWidth: 920,
    textLeftOffset: 170,
    titleFontSize: 70,
    titleColor: "1f2127",
    titleExtraConfig: "_bold",
    titleBottomOffset: 150,
    titleGravity: "north_west",
    titleFont: "Jost.ttf",
    textColor: "1F2127",
    version: "v1605269202",
  });

  const domain = "richardhaines.dev";

  const api = "https://i.microlink.io/";
  const cardUrl = `https://cards.microlink.io/?preset=richhaines&headline=${title}&caption=${description}&domain=${domain}&backgroundImage=${backgroundImage}`;
  const image = `${api}${encodeURIComponent(cardUrl)}`;

  return (
    <>
      <BlogLayout>
        <SEO
          title={title}
          titleTemplate={slug}
          titleSeparator={`-`}
          description={description}
          image={socialImage}
          pathname={canonical ? canonical : `https://richardhaines.dev${slug}`}
          twitterUsername="@studio_hungry"
          author="Rich Haines"
          article={true}
        />
        <Header previous={previous} next={next} opacity={0.7} />
        <Flex
          my={6}
          direction={["column", "row", "row"]}
          w="100%"
          justifyContent="space-between"
          align="center"
        >
          <Flex bgColor={titleBox} wrap="wrap" p={3}>
            <Text
              as="h1"
              fontSize={["4xl", "5xl"]}
              color="brand.black"
              fontFamily="heading"
              fontWeight={800}
              lineHeight={1.2}
              my={5}
            >
              {title}
            </Text>
          </Flex>
          <ToC items={tableOfContents.items} />
        </Flex>
        <Flex>
          <Flex p={3} align="center">
            <WordCount />
            <Text fontSize="xl">{wordCount.words} words</Text>
          </Flex>
          <Flex p={3} align="center">
            <ReadingTime />
            <Text fontSize="xl">{timeToRead} minutes</Text>
          </Flex>
        </Flex>

        <MDXRenderer>{body}</MDXRenderer>
        {/* <ShareOnTwitter/> */}
      </BlogLayout>
    </>
  );
};

export default PostTemplate;

export const query = graphql`
  query PostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        category
        description
        canonical
      }
      slug
      body
      excerpt
      timeToRead
      tableOfContents
      wordCount {
        words
      }
    }
  }
`;
