interface ICreateUserDTO {
  id?:  number;
  name: string;
  email: string;
  password: string;
  driver_license: string;
  picture: string | null;
}

export { ICreateUserDTO }