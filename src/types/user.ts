export type UserFormData = {
  firstName: string;
  loading?: boolean;
  lastName: string;
  gender: {
    value: string;
    label: string | null;
  };
  dateOfBirth: Date;
  techStack: any[];
  email: string;
  phoneNumber: string;
};
