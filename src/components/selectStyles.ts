import { ChakraStylesConfig } from "chakra-react-select";

export const selectStyles: ChakraStylesConfig = {
  input: (provided) => ({
    ...provided,
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: "#D9D9D9 !important",
  }),
  menuList: (provided) => ({
    ...provided,
    backgroundColor: "#D9D9D9",
  }),
  option: (provided) => ({
    ...provided,
    color: "#fff",
    fontWeight: 600,
    backgroundColor: "#D9D9D9 !important",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
    fontWeight: 600,
    backgroundColor: "#D9D9D9 !important",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),
};
