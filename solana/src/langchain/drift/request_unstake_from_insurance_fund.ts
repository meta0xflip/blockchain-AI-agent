import { Tool } from "langchain/tools";
import type { SolanaAgentKit } from "../../agent";

export class SolanaRequestUnstakeFromDriftInsuranceFundTool extends Tool {
  name = "request_unstake_from_drift_insurance_fund";
  description = `Request to unstake tokens from Drift Insurance Fund.
  
  Inputs (JSON string):
  - amount: number, amount to unstake (required)
  - symbol: string, token symbol (required)`;

  constructor(private solanaKit: SolanaAgentKit) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    try {
      const parsedInput = JSON.parse(input);
      const tx = await this.solanaKit.requestUnstakeFromDriftInsuranceFund(
        parsedInput.amount,
        parsedInput.symbol,
      );

      return JSON.stringify({
        status: "success",
        message: `Requested unstake of ${parsedInput.amount} ${parsedInput.symbol} from the Drift Insurance Fund`,
        signature: tx,
      });
    } catch (error: any) {
      return JSON.stringify({
        status: "error",
        message: error.message,
        code: error.code || "REQUEST_UNSTAKE_FROM_DRIFT_INSURANCE_FUND_ERROR",
      });
    }
  }
}
