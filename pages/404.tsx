import React from "react";
import { GetStaticProps } from "next";

const Custom404 = () => {
  return <h1>404 - Page Not Found</h1>;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {},
  };
};

export default Custom404;
