export default () => ({
  env: process.env.NODE_ENV,
  posgtresUrl: process.env.DB_URL,
  port: Number(process.env.PORT),
});
