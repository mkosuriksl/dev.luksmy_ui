// import { userData } from "./user.modal";

export interface ServicePersonRegistration {
  appKey: string,
  email: string;
  mobile: string,
  password: string,
  spName: string,
  town?: string,
  district?: string,
  state?: string,
  pincode?: string
  address: string;
}
