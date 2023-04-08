import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../contexts/TransactionsContext";

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  const summary = transactions.reduce(
    (acc, transactions) => {
      if (transactions.type === "income") {
        acc.icome += transactions.price;
        acc.total += transactions.price;
      } else {
        acc.outcome += transactions.price;
        acc.total -= transactions.price;
      }
      return acc;
    },
    {
      icome: 0,
      outcome: 0,
      total: 0,
    }
  );

  return summary;
}
