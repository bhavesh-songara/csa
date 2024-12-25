import localConfig from "./local.json";
import developmentConfig from "./development.json";
import productionConfig from "./production.json";
import commonConfig from "./common.json";

interface EnvironmentConfig {}

interface CommonConfig {
  appUrl: string;
}

let environmentConfig: EnvironmentConfig;

switch (process.env.NODE_ENV as string) {
  case "production":
    environmentConfig = productionConfig;
    break;
  case "development":
    environmentConfig = developmentConfig;
    break;
  case "local":
    environmentConfig = localConfig;
    break;
  default:
    environmentConfig = developmentConfig;
    break;
}

let config: EnvironmentConfig & CommonConfig = {
  ...commonConfig,
  ...environmentConfig,
};

export default config;
