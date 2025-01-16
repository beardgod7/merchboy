export enum UserRole {
    USER = 'user',
    SELLER = 'seller',
  }

  export interface IUser extends UserAttributes  {
    id: string;
    email: string;
    role: string;
    ProfileComplete: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export  interface UserAttributes {
    id: string;
    firstName?: string;
    lastName?: string;
    email: string;
    gender?: string;
    phoneNumber?: number;
    password?: string;
    role: string;  
    ProfileComplete: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword?: (password: string) => Promise<boolean>;
  }
  