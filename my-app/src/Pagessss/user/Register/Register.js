import React, { useState } from "react";
import { Button } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Center, Text } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useNavigate } from "react-router";

export function Register() {
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
      console.log(registerValues);
      return registerValues;
    });
  };
  const userRegister = async (event) => {
    console.log("asdasd");
    try {
      console.log("response");
      setStatus("loading");
      const response = await axios.post(
        `http://localhost:3005/register`,
        registerValues
      );

      console.log(response);
      setStatus("idle");
    } catch (error) {
      setStatus("idle");
      console.log("error");
    }
  };
  return (
    <div>
      {" "}
      <Center pb={10}>
        <Box>
          <Box mb={5} textAlign="center">
            <Heading as="h2" size="lg" padding="1rem">
              SocialCapital
            </Heading>
            <Heading as="h2" size="lg" padding="2rem">
              Register
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
                color="white"
                backgroundColor="#315CFD"
                colorScheme="dark"
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
              onClick={() => navigate("/")}
              variant="link"
              color="#315CFD"
              fill="#315CFD"
            >
              Log In
            </Button>{" "}
          </Text>
        </Box>
      </Center>
    </div>
  );
}
