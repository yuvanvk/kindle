import { ConvexHttpClient } from "@workspace/convex";

export type Bindings = {
    GITHUB_APP_CLIENT_ID: string;
    CONVEX_URL: string;
    CLERK_PUBLISHABLE_KEY: string;
    CLERK_SECRET_KEY: string;
    STATE_SIGNING_SECRET: string;
    GITHUB_APP_ID: string;
    GITHUB_WEBHOOK_SECRET: string;
    GITHUB_APP_PRIVATE_KEY: string;
    FRONTEND_URL: string;
}

export type Variables = {
   convex: ConvexHttpClient; 
}