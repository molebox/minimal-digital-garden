import React from "react";
import { Link as GatsbyLink } from "gatsby";
import { Flex, Link, Text, Box } from "@chakra-ui/core";
import Layout from "./../components/layout";
import Cubes from "./../components/cubes/cubes";
import SearchBar from "../components/blog/searchbar";
import { useSearchBar } from "./../components/blog/useSearchbar";

export default ({ data }) => {
  const { posts, handleSearchQuery } = useSearchBar(data);
  return (
    <Layout>
      <Text as="h1" hidden>
        Digital Garden
      </Text>
      <Cubes />
      <Link
        fontSize="xl"
        fontWeight={500}
        fontFamily="heading"
        color="brand.black"
        my={5}
        href="https://twitter.com/studio_hungry"
        isExternal
        textDecoration="underline"
      >
        By Rich Haines
      </Link>
      <SearchBar handleSearchQuery={handleSearchQuery} />
      {posts.map(({ id, frontmatter, fields, excerpt }) => (
        <Link
          key={id}
          as={GatsbyLink}
          to={fields.slug}
          p={4}
          borderBottom="solid 2px"
          my={6}
          _hover={{
            backgroundColor: "brand.offWhite",
            cursor: "pointer",
          }}
        >
          <Flex direction="column" wrap="wrap" maxW={500} lineHeight={1} mb={5}>
            <Text
              fontSize={["4xl", "5xl"]}
              fontWeight={800}
              fontFamily="heading"
              color="brand.black"
            >
              {frontmatter.title}
            </Text>
          </Flex>
          <Text
            fontSize={["xl", "2xl"]}
            fontWeight={700}
            fontFamily="heading"
            color="brand.black"
            my={5}
          >
            {frontmatter.description}
          </Text>
          <Text
            fontSize={["md", "xl"]}
            fontWeight={800}
            fontFamily="body"
            color="brand.lightGrey"
          >
            {excerpt}
          </Text>
        </Link>
      ))}
    </Layout>
  );
};

export const query = graphql`
  query BlogIndexQuery {
    allMdx {
      nodes {
        id
        excerpt(pruneLength: 200)
        frontmatter {
          title
          category
          description
        }
        fields {
          slug
        }
      }
    }
  }
`;
