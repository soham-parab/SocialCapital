import React from "react";
import { useState } from "react";
import {
  Flex,
  Spacer,
  Box,
  Heading,
  Button,
  typography,
} from "@chakra-ui/react";
import { Link, Navigate } from "react-router-dom";
import { FormLabel } from "@chakra-ui/form-control";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Center, Text } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/layout";
import { useNavigate } from "react-router";
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "@chakra-ui/toast";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { useAuth } from "../../../context/authContext";

export function Login() {
  const { auth, setAuth } = useAuth();
  console.log(auth);
  const navigate = useNavigate();

  const [loginValues, setLoginValues] = useState({
    username: null,
    password: null,
  });

  function inputHandler(event) {
    console.log(event.target.value);
    setLoginValues((loginValues) => {
      loginValues[event.target.name] = event.target.value;
      return { ...loginValues };
    });
  }

  async function LoginButtonClicked(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3005/login",
        loginValues
      );
      setAuth(response.data);
      console.log(response.data);
      localStorage.setItem("auth", JSON.stringify(response.data));
      navigate("/feed");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Center alignItems="center" padding={4}>
        <Box>
          <Box mb={5} textAlign="center">
            <Heading as="h2" size="lg">
              SocialCapital
            </Heading>
            <Heading as="h2" size="lg" padding="2rem">
              Login
            </Heading>
          </Box>
          <form>
            <VStack spacing={5}>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  size="md"
                  type="username"
                  name="username"
                  placeholder="Enter username here"
                  values={loginValues["username"]}
                  onChange={inputHandler}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  size="md"
                  type="password"
                  name="password"
                  placeholder="Enter password here"
                  values={loginValues["password"]}
                  onChange={inputHandler}
                />
              </FormControl>
              <Button
                width="full"
                colorScheme="blue"
                type="submit"
                onClick={LoginButtonClicked}
              >
                <span>Log In</span>
              </Button>
            </VStack>
          </form>
          <Text m={4} width="100%" textAlign="center">
            Don't have an account?{" "}
            <Button
              variant="link"
              colorScheme="blue"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </Button>
            {"   "}
          </Text>
        </Box>
      </Center>
    </div>
  );
}
