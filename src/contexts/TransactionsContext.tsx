import { ReactNode, useEffect, useState, useCallback } from "react";
import { api } from "../server/axios";
import { createContext } from "use-context-selector";
interface Transactions {
  id: number;
  description: string;
  price: number;
  type: "income" | "outcome";
  category: string;
  createdAt: string;
}
interface CreateTreansactionInput {
  description: string;
  category: string;
  price: number;
  type: string;
}

interface TransactionContextType {
  transactions: Transactions[];
  fetchTransactions: (query?: string) => Promise<void>;
  createdTransaction: (data: CreateTreansactionInput) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  async function fetchTransactions(query?: string) {
    const response = await api.get("transactions", {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: query,
      },
    });

    setTransactions(response.data);
  }

  const createdTransaction = useCallback(
    async (data: CreateTreansactionInput) => {
      const { description, category, price, type } = data;
      const responde = await api.post("transactions", {
        description,
        category,
        price,
        type,
        createdAt: new Date(),
      });

      setTransactions((state) => [responde.data, ...state]);
    },
    []
  );

  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createdTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
