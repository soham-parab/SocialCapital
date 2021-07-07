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
import { login } from "../../../Redux/slices/userSlice";

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const toast = useToast();
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

  async function userLogin(event) {
    try {
      let result = await dispatch(login(loginValues));
      result = unwrapResult(result);
      navigate("/");
      toast({
        position: "bottom-right",
        title: `Logged In Successfully.`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        position: "bottom-right",
        title: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  // async function LoginButtonClicked() {
  //   try {
  //     const response = await axios.post(
  //       "https://socialcapital-rest-api.herokuapp.com/login",
  //       loginValues
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <div>
      <Center alignItems="center" padding={4}>
        <Box>
          <Box mb={5} textAlign="center">
            <Heading as="h2" size="lg">
              Login
            </Heading>
          </Box>
          <form onSubmit={userLogin}>
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
              <Button width="full" colorScheme="blue" type="submit">
                {(user.status === "idle" || user.status === "error") && (
                  <span>Log In</span>
                )}
                {user.status === "loading" && <Spinner />}
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
