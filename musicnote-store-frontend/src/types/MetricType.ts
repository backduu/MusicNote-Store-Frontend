export const MetricType = {
    VIEW : "VIEW",
    LIKE : "LIKE",
} as const;

export type MetricType = typeof MetricType[keyof typeof MetricType];
