import React from "react";
import { Link as GatsbyLink } from "gatsby";
import { Link } from "@chakra-ui/core";

const NavigationLink = ({ children, to }) => (
  <Link
    as={GatsbyLink}
    to={to}
    color="brand.darkGrey"
    fontFamily="heading"
    fontSize={["md", "xl"]}
  >
    {children}
  </Link>
);

export default NavigationLink;
