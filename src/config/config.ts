type AppConfig = {
  ssr?: {
    dbUrl?: string;
    dbEnableSsl: boolean;
  };
  dev: boolean;
  appRoute: string;
  serverApiRoute: string;
  serverApiGraphRoute: string;
};

const dev = process.env.NODE_ENV !== 'production';

const buildConfig = (): AppConfig => {
  const port = process.env.NEXT_PUBLIC_PORT ?? process.env.PORT ?? 3000;

  const appRoute = process.env.NEXT_PUBLIC_PROD_WEB_ROOT
    ? process.env.NEXT_PUBLIC_PROD_WEB_ROOT
    : `http://localhost:${port}`;

  const dbUrl = process.env.DATABASE_URL;
  const dbEnableSsl = process.env.DB_SSL ? process.env.DB_SSL === 'ENABLED' : false;

  return {
    dev,
    ssr: { dbUrl, dbEnableSsl },
    appRoute,
    serverApiRoute: `${appRoute}/api`,
    serverApiGraphRoute: `${appRoute}/api/graphql`,
  };
};

const config = buildConfig();

export { config };
