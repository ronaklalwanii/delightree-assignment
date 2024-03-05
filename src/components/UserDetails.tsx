import { FC } from "react";

import { Heading, Text, Card, CardBody } from "@chakra-ui/react";

import { useFormContext } from "react-hook-form";

import moment from "moment";
import type { UserFormData } from "../types/user";

const UserDetails: FC = () => {
  const {
    getValues,
    formState: { isSubmitSuccessful },
  } = useFormContext<UserFormData>();

  const formData = getValues();

  return (
    <Card mt={8}>
      <CardBody>
        <Heading as="h4" size="md" mb={8}>
          Form Data:
        </Heading>
        {isSubmitSuccessful && !formData.loading ? (
          <>
            <Text>First Name: {formData.firstName}</Text>
            <Text>Last Name: {formData.lastName}</Text>
            <Text>Gender: {formData?.gender?.value}</Text>
            <Text>
              Date of Birth:{" "}
              {moment(formData.dateOfBirth).format("DD/MMMM/YYYY")}
            </Text>
            <Text>Tech Stack: {formData.techStack.join(", ")}</Text>
            <Text>Email: {formData.email}</Text>
            <Text>Phone Number: {formData.phoneNumber}</Text>
          </>
        ) : (
          <Text>Please Update Values In Form!!!</Text>
        )}
      </CardBody>
    </Card>
  );
};

export default UserDetails;
