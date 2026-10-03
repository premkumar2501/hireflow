export const TokenKeys = {
    ACCESS_KEY: 'hireflow_access_token',
    REFRESH_KEY: 'hireflow_refresh_token'
} as const;

export type TokenKeys = typeof TokenKeys[keyof typeof TokenKeys];