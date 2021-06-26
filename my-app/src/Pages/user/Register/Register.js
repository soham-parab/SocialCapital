import React, { useState } from "react";
import { Button } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Center, Text } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useNavigate } from "react-router";

function Register() {
  const navigate = useNavigate();
  const toast = useToast();
  const [registerValues, setRegisterValues] = useState({
    name: null,
    username: null,
    password: null,
  });

  const [status, setStatus] = useState("idle");

  const inputHandler = (event) => {
    setRegisterValues((registerValues) => {
      registerValues[event.target.name] = event.target.value;
      return { ...registerValues };
    });
  };
  const userRegister = async (event) => {
    console.log("asdasd");
    try {
      setStatus("loading");
      const response = await axios.post(
        `https://socialcapital-rest-api.herokuapp.com/register`,
        {
          username: "sohamppppp",
          password: "passwordddd",
        }
      );
      console.log(response);
      setStatus("idle");
      if (response.data.success) {
        toast({
          position: "top-right",
          title: `Account Created Successfully.`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/login");
      }
    } catch (error) {
      setStatus("idle");
      console.log(error.response);
      toast({
        position: "top-right",
        title: error.response?.data?.message
          ? error.response?.data?.message
          : "Something Went Wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <div>
      {" "}
      <Center pb={10}>
        <Box>
          <Box mb={5} textAlign="center">
            <Heading as="h2" size="lg">
              Sign Up
            </Heading>
          </Box>
          <form>
            <VStack spacing={5}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  size="md"
                  type="text"
                  name="name"
                  values={registerValues["name"]}
                  onChange={inputHandler}
                  placeholder="Enter your name"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  size="md"
                  type="text"
                  name="username"
                  values={registerValues["username"]}
                  onChange={inputHandler}
                  placeholder="Enter your username"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  size="md"
                  type="password"
                  name="password"
                  values={registerValues["password"]}
                  onChange={inputHandler}
                  placeholder="Enter password here"
                />
              </FormControl>
              <Button
                width="full"
                colorScheme="blue"
                type="submit"
                onClick={userRegister}
              >
                {status === "idle" && <span>Sign Up</span>}
                {status === "loading" && <Spinner />}
              </Button>
            </VStack>
          </form>
          <Text m={4} width="100%" textAlign="center">
            Already Have an account ?{" "}
            <Button
              onClick={() => navigate("/login")}
              variant="link"
              colorScheme="blue"
            >
              Log In
            </Button>{" "}
          </Text>
        </Box>
      </Center>
    </div>
  );
}

export default Register;
