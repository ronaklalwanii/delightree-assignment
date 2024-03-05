import { ChakraProvider, Box } from "@chakra-ui/react";

import UserForm from "./components/UserForm";

const App = () => {
  return (
    <ChakraProvider>
      <Box maxWidth="container.lg" mx="auto" p={4}>
        <UserForm />
      </Box>
    </ChakraProvider>
  );
};

export default App;
