import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Restaurant } from './restaurant.entity';

interface SearchResponse {
  hits: {
    hits: Array<{
      _source: Restaurant;
      _id: string;
      _score: number;
    }>;
  };
}

@Injectable()
export class RestaurantService {
  private readonly index = 'restaurants';

  constructor(private readonly elasticsearchService: ElasticsearchService) {
    this.createIndex();
  }

  private async createIndex() {
    try {
      const exists = await this.elasticsearchService.indices.exists({
        index: this.index
      });

      if (!exists) {
        await this.elasticsearchService.indices.create({
          index: this.index,
          body: {
            mappings: {
              properties: {
                name: {
                  type: "text",
                  analyzer: "standard",
                  fields: {
                    keyword: {
                      type: "keyword",
                      normalizer: "lowercase"
                    }
                  }
                },
                cuisine: { type: "text" },
                location: { type: "text" },
                rating: { type: "float" },
                priceRange: { type: "keyword" }
              }
            },
            settings: {
              analysis: {
                normalizer: {
                  lowercase: {
                    type: "custom",
                    filter: ["lowercase"]
                  }
                }
              }
            }
          }
        });
      }
    } catch (error) {
      console.error('Index creation error:', error);
    }
  }

  async search(query: string) {
    if (!query.trim() || query.length < 3) {
      return [];
    }

    const { hits } = await this.elasticsearchService.search<SearchResponse>({
      index: this.index,
      body: {
        query: {
          bool: {
            should: [
              {
                match: {
                  name: {
                    query: query,
                    fuzziness: "AUTO",
                    operator: "or",
                    prefix_length: 1
                  }
                }
              },
              {
                wildcard: {
                  name: {
                    value: `*${query}*`
                  }
                }
              },
              {
                match: {
                  cuisine: {
                    query: query,
                    fuzziness: "AUTO"
                  }
                }
              },
              {
                match: {
                  location: {
                    query: query,
                    fuzziness: "AUTO"
                  }
                }
              }
            ],
            minimum_should_match: 1
          }
        }
      }
    });

    return hits.hits.map(hit => ({
      ...hit._source,
      id: hit._id,
      score: hit._score,
    }));
  }

  async indexRestaurant(restaurant: Restaurant) {
    return this.elasticsearchService.index({
      index: this.index,
      body: restaurant,
    });
  }

  async deleteRestaurant(id: string) {
    return this.elasticsearchService.delete({
      index: this.index,
      id: id
    });
  }

  async getAllRestaurants() {
  
    const { hits } = await this.elasticsearchService.search<SearchResponse>({
      index: this.index,
      body: {
        query: {
          match_all: {}
        }
      }
    });


    return hits.hits.map(hit => ({
      ...hit._source,
      id: hit._id
    }));
  }
} 