import React from "react";
import { Flex, Spacer, Box, Heading, Button } from "@chakra-ui/react";
import "./Home.css";
import { Link } from "react-router-dom";
export function Home() {
  return (
    <div>
      <Flex bg="#E5E7EB">
        <Box p="2" m="5">
          <Link to="/">
            <Heading size="md">SocialCapital</Heading>
          </Link>
        </Box>
        <Spacer />
        <Box m="5">
          <Link to="/register">
            {" "}
            <Button colorScheme="teal" mr="4" bg="#3B82F6">
              Sign Up
            </Button>
          </Link>

          <Link to="/login">
            {" "}
            <Button colorScheme="teal" bg="#3B82F6">
              Log in
            </Button>
          </Link>
        </Box>
      </Flex>
    </div>
  );
}
