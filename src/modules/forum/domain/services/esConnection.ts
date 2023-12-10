import { Client } from "@elastic/elasticsearch";

require("dotenv").config();

const esConnection = new Client({
  node: process.env.ELASTICSEARCH_NODE || "http://localhost:9200",
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME || "elastic",
    password: process.env.ELASTICSEARCH_PASSWORD || "password",
  },
});

export { esConnection };
