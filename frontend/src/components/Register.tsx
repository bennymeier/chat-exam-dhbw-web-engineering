import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { UserInterface } from '../types';
import UserApi from '../api/user.api';

const initialUser = {
  username: '',
  lastname: '',
  firstname: '',
  mail: '',
  avatar: '',
};
const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<Partial<UserInterface>>(initialUser);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value.trim(),
    }));
  };
  const handleFileRead = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files) {
      const file = event.target.files[0];
      const base64 = await convertBase64(file);
      if (base64 && typeof base64 === 'string') {
        setUser((prevState) => ({
          ...prevState,
          avatar: base64,
        }));
      }
    }
  };

  const convertBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const data = await UserApi.create(user);
      setIsLoading(false);
      setUser(initialUser);
    } catch (err) {
      setIsLoading(true);
      console.warn(err);
    }
  };

  return (
    <Stack mx={'auto'} maxW={'lg'} px={3}>
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'2xl'}
        p={8}
      >
        <Stack spacing={4}>
          <Box>
            <FormControl id="username" isRequired>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                type="text"
                name="username"
                onChange={handleChange}
                value={user.username}
              />
            </FormControl>
          </Box>
          <HStack>
            <Box>
              <FormControl id="firstname" isRequired>
                <FormLabel htmlFor="firstname">First Name</FormLabel>
                <Input
                  type="text"
                  name="firstname"
                  onChange={handleChange}
                  value={user.firstname}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="lastname" isRequired>
                <FormLabel htmlFor="lastname">Last Name</FormLabel>
                <Input
                  type="text"
                  name="lastname"
                  onChange={handleChange}
                  value={user.lastname}
                />
              </FormControl>
            </Box>
          </HStack>
          <FormControl id="mail" isRequired>
            <FormLabel htmlFor="mail">Email address</FormLabel>
            <Input
              type="email"
              name="mail"
              onChange={handleChange}
              value={user.mail}
            />
          </FormControl>
          <FormControl id="avatar">
            <FormLabel htmlFor="avatar">Avatar</FormLabel>
            <Input
              type="file"
              name="avatar"
              onChange={handleFileRead}
              accept="image/png, image/gif, image/jpeg, image/jpg"
            />
          </FormControl>
          <Stack spacing={10} pt={2}>
            <Button
              disabled={
                !user.username &&
                !user.firstname &&
                !user.lastname &&
                !user.mail
              }
              isLoading={isLoading}
              loadingText="Submitting"
              size="lg"
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={handleSubmit}
            >
              Sign up
            </Button>
          </Stack>
          <Stack pt={6}>
            <Text align={'center'}>
              Already a user?{' '}
              <Link
                onClick={() => window.scrollTo({ behavior: 'smooth', top: 0 })}
                color={'blue.400'}
              >
                Login
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Register;
