// @flow
import { head, last, path, isEmpty } from "ramda";
import type {
  TransactionResponseRaw,
  StartingEndBalance,
} from "./transactionsBetsHistory.types";

export function getStartingEndBalanceFromTransactions(
  transactions: Array<TransactionResponseRaw>,
  walletAmountFallback: number = 0
): StartingEndBalance {
  if (isEmpty(transactions)) {
    return {
      startingBalanceAmount: walletAmountFallback,
      endBalanceAmount: walletAmountFallback,
    };
  }
  // API returns a sorted list, from the latest transaction to the oldest
  return {
    startingBalanceAmount: path(
      ["balanceBefore", "amount"],
      last(transactions)
    ),
    endBalanceAmount: path(["balanceAfter", "amount"], head(transactions)),
  };
}
