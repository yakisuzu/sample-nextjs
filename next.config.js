const path = require("path")

function to(...paths) {
  return path.join(__dirname, ...paths)
}

const API_URL = {
  mock: "http://localhost:8087",
  back: "http://localhost:8080",
}
const useMock = process.env.URL === "mock"

module.exports = {
  assetPrefix: "",
  webpack: (config, options) => {
    config.resolve.alias["@"] = to("src")
    return config;
  },
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    API_URL: useMock ? API_URL.mock : API_URL.back,
    API_ACCESS_KEY: "TODO",
  },
  reactStrictMode: true,
}
