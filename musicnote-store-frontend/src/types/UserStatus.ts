export const UserStatus = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
    SUSPENDED: "SUSPENDED",
    DELETED: "DELETED",
    PENDING: "PENDING",
    BLOCKED: "BLOCKED",
} as const;

export type UserStatus = typeof UserStatus[keyof typeof UserStatus];