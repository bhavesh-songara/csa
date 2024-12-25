import queryFetcher from "@/lib/queryFetcher";
import config from "@/config";
import { IAgent } from "@/model/AgentModel";

export class AgentService {
  static BASE = `${config.appUrl}/api/agent`;

  static async getAllAgents(): Promise<{
    data: Array<
      IAgent & {
        _id: string;
      }
    >;
  }> {
    return await queryFetcher({
      url: this.BASE,
    });
  }

  static async getAgent(id: string): Promise<{
    agent: IAgent & {
      _id: string;
    };
  }> {
    return await queryFetcher({
      url: `${this.BASE}/${id}`,
    });
  }
}
