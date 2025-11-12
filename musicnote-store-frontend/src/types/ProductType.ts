export const ProductType = {
    ALBUM: "ALBUM",
    SONG: "SONG",
    SHEET: "SHEET",
} as const;

export type ProductType = typeof ProductType[keyof typeof ProductType];