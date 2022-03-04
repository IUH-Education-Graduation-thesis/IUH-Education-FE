const config = {
  IS_LOCAL: process.env.NODE_ENV === 'dev',
  IS_PROD: process.env.NODE_ENV === 'prod',
  PORT: 6969,
  HOST_ADDRESS: "http://52.77.233.218",
};

config.GRAPHQL_URL = `${config.HOST_ADDRESS}/graphql`;

module.exports = config;
