import { useState, FC } from "react";

import {
  Grid,
  Flex,
  Card,
  Text,
  Input,
  Button,
  Spinner,
  Heading,
  GridItem,
  CardBody,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useForm,
  useFieldArray,
  Controller,
  FormProvider,
} from "react-hook-form";

import UserDetails from "./UserDetails";

import type { UserFormData } from "../types/user";

const validationSchema: Yup.ObjectSchema<any> = Yup.object().shape({
  loading: Yup.boolean(),
  firstName: Yup.string()
    .matches(/^[A-Za-z]+$/, "First Name is incorrect")
    .required("First name is required"),
  lastName: Yup.string()
    .matches(/^[A-Za-z]+$/, "Last Name is incorrect")
    .required("Last name is required"),
  gender: Yup.object().shape({
    value: Yup.string().required("Gender is required"),
    label: Yup.string().nullable(),
  }),
  dateOfBirth: Yup.date()
    .required("Date of birth is required")
    .test(
      "isValidDate",
      "Invalid date, please enter a valid date",
      (value) => !isNaN(value?.getTime())
    ),
  techStack: Yup.array()
    .of(Yup.string().required("Tech stack field cannot be empty"))
    .min(1, "At least one tech stack is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .min(
      13,
      "Phone Number must be at least 13 characters including +CountryCode"
    )
    .max(
      13,
      "Phone Number must be at most 13 characters including +CountryCode"
    )
    .matches(
      /^(\+91\d{10})$/,
      "Invalid phone number format make sure you've added country code with +"
    )

    .required("Phone number is required"),
});

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const UserForm: FC = () => {
  const hookFormMethods = useForm<UserFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      techStack: ["React"],
    },
  });

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = hookFormMethods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "techStack",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    setIsLoading(true);
    setValue("loading", true);
    setTimeout(() => {
      setIsLoading(false);
      setValue("loading", false);
    }, 3000);
  };

  return (
    <>
      <Heading textAlign="center">User Details</Heading>
      <Card mt={4}>
        <CardBody>
          <Heading as="h4" size="md" mb={8}>
            Basic Details
          </Heading>
          <FormProvider {...hookFormMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid
                gap={8}
                templateColumns={[
                  "repeat(1, 1fr)",
                  "repeat(2, 1fr)",
                  "repeat(2, 1fr)",
                ]}
              >
                <GridItem>
                  <FormControl isInvalid={!!errors.firstName}>
                    <FormLabel>First Name</FormLabel>
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field }) => <Input {...field} />}
                    />
                    <Text color="red.500">{errors.firstName?.message}</Text>
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl isInvalid={!!errors.lastName}>
                    <FormLabel>Last Name</FormLabel>
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => <Input {...field} />}
                    />
                    <Text color="red.500">{errors.lastName?.message}</Text>
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl isInvalid={!!errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => <Input type="email" {...field} />}
                    />
                    <Text color="red.500">{errors.email?.message}</Text>
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl isInvalid={!!errors.phoneNumber}>
                    <FormLabel>Phone Number</FormLabel>
                    <Controller
                      name="phoneNumber"
                      control={control}
                      render={({ field }) => <Input type="tel" {...field} />}
                    />
                    <Text color="red.500">{errors.phoneNumber?.message}</Text>
                  </FormControl>
                </GridItem>
              </Grid>
              <Heading as="h4" size="md" my={8}>
                Other Information
              </Heading>
              <Grid
                gap={8}
                templateColumns={[
                  "repeat(1, 1fr)",
                  "repeat(2, 1fr)",
                  "repeat(2, 1fr)",
                ]}
              >
                <GridItem>
                  <FormControl isInvalid={!!errors.gender}>
                    <FormLabel>Gender</FormLabel>
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <Select options={genderOptions} {...field} />
                      )}
                    />
                    <Text color="red.500">
                      {errors.gender ? "Please Select A Gender" : null}
                    </Text>
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl isInvalid={!!errors.dateOfBirth}>
                    <FormLabel>Date of Birth</FormLabel>
                    <Controller
                      name="dateOfBirth"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="date"
                          {...field}
                          value={field.value as unknown as string}
                        />
                      )}
                    />
                    <Text color="red.500">{errors.dateOfBirth?.message}</Text>
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel>Tech Stack</FormLabel>
                    {fields.map((item, index) => (
                      <Flex key={item.id} alignItems="center" mt={2}>
                        <Controller
                          name={`techStack.${index}`}
                          control={control}
                          render={({ field }) => <Input {...field} />}
                        />
                        {index !== 0 && (
                          <Button
                            colorScheme="red"
                            ml={2}
                            onClick={() => remove(index)}
                          >
                            X
                          </Button>
                        )}
                      </Flex>
                    ))}
                    <Button
                      mt={2}
                      size="sm"
                      colorScheme="green"
                      onClick={() => append("")}
                    >
                      Add Tech Stack
                    </Button>
                    <Text color="red.500">{errors.techStack?.message}</Text>
                  </FormControl>
                </GridItem>
              </Grid>

              <Button
                mt={8}
                type="submit"
                colorScheme="blue"
                isLoading={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? <Spinner /> : "Submit"}
              </Button>
            </form>
            <UserDetails />
          </FormProvider>
        </CardBody>
      </Card>
    </>
  );
};

export default UserForm;
