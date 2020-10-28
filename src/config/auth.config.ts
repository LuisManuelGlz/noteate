export default () => ({
  jwt: {
    tokenType: process.env.TOKEN_TYPE,
    secretKey: process.env.SECRET_KEY,
    accessTokenLifetime: process.env.ACCESS_TOKEN_LIFETIME,
  },
});
