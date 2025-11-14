export const ProductStatus = {
    ONSALE: "ONSALE",
    SOLDOUT: "SOLDOUT",
    INACTIVE: "INACTIVE"
} as const;

export type ProductStatus = typeof ProductStatus[keyof typeof ProductStatus];
