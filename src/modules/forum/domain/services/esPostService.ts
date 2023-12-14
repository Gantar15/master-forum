import { Client } from "@elastic/elasticsearch";
import { TextUtils } from "../../../../shared/utils/TextUtils";

export class ESPostService {
  private esConnection: Client;

  constructor(esConnection: Client) {
    this.esConnection = esConnection;
  }

  async createIndex() {
    const indexName = process.env.ELASTICSEARCH_INDEX;

    // Define the custom analyzer
    const analyzerConfig = {
      analysis: {
        analyzer: {
          case_insensitive_analyzer: {
            type: "custom",
            tokenizer: "standard",
            filter: ["lowercase"],
          },
        },
      },
    };

    // Define the index mapping
    const indexConfig = {
      index: indexName,
      body: {
        mappings: {
          properties: {
            title: { type: "text", analyzer: "case_insensitive_analyzer" },
            text: {
              type: "text",
              analyzer: "case_insensitive_analyzer",
            },
            link: {
              type: "text",
              analyzer: "case_insensitive_analyzer",
            },
            post_id: {
              type: "keyword",
            },
            member_id: {
              type: "keyword",
            },
            category_id: {
              type: "keyword",
            },
            type: {
              type: "keyword",
            },
            slug: {
              type: "keyword",
            },
            points: {
              type: "integer",
            },
            total_num_comments: {
              type: "integer",
            },
          },
        },
        // Include the custom analyzer configuration
        settings: analyzerConfig,
      },
    };

    // Check if the index exists
    const indexExists = await this.esConnection.indices.exists({
      index: indexName,
    });

    console.log(`Index exists: ${indexExists}`);

    if (!indexExists) {
      // Create the index with the specified mapping
      await this.esConnection.indices.create(indexConfig);
    }
  }
  async indexPost(rawPost: any) {
    return await this.esConnection
      .index({
        index: process.env.ELASTICSEARCH_INDEX,
        body: rawPost,
      })
      .then(
        function (resp) {
          console.log("Indexed", resp);
        },
        function (err) {
          console.trace(err.message);
        }
      );
  }

  async updateIndexPost(rawPost: any) {
    const body = await this.esConnection.search({
      index: process.env.ELASTICSEARCH_INDEX,
      body: {
        query: {
          match: { post_id: rawPost.post_id },
        },
      },
    });
    if (body.hits.hits.length > 0) {
      const docId = body.hits.hits[0]._id;

      return await this.esConnection.update({
        index: process.env.ELASTICSEARCH_INDEX,
        id: docId,
        body: {
          doc: rawPost,
        },
      });
    } else {
      console.log("Document not found");
    }
  }

  async search(text: string) {
    const searchText = TextUtils.escapeRegExp(text);
    const body = await this.esConnection.search<any>({
      index: process.env.ELASTICSEARCH_INDEX,
      body: {
        query: {
          bool: {
            should: [
              {
                regexp: {
                  title: `.*${searchText.toLowerCase()}.*`,
                },
              },
              {
                regexp: {
                  text: `.*${searchText.toLowerCase()}.*`,
                },
              },
              {
                regexp: {
                  link: `.*${searchText.toLowerCase()}.*`,
                },
              },
            ],
          },
        },
      },
    });

    const hits = body.hits.hits;
    return hits.map((hit: any) => hit._source);
  }

  async removeIndex(postId: string) {
    this.esConnection.deleteByQuery({
      index: process.env.ELASTICSEARCH_INDEX,
      body: {
        query: {
          match: {
            post_id: postId,
          },
        },
      },
    });
  }
}
