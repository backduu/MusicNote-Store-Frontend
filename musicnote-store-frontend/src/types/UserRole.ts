export const UserRole = {
    ADMIN: "ADMIN",
    USER: "USER",
    SELLER: "SELLER",
  } as const;
  
export type UserRole = typeof UserRole[keyof typeof UserRole];

