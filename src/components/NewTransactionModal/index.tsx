import * as Dialog from "@radix-ui/react-dialog";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import {
  CloseButton,
  Content,
  OverLay,
  TransactionsTypeButton,
  TransactionType,
} from "./styled";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useContextSelector } from "use-context-selector";

import { TransactionsContext } from "../../contexts/TransactionsContext";

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(["income", "outcome"]),
});

type NewTransactionsFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
  const createdTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createdTransaction;
    }
  );
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<NewTransactionsFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  });

  async function handleCreateNewTransaction(data: NewTransactionsFormInputs) {
    const { description, category, price, type } = data;
    await createdTransaction({
      description,
      price,
      category,
      type,
    });

    reset();
  }

  return (
    <Dialog.Portal>
      <OverLay>
        <Content>
          <Dialog.Title>Nova transação</Dialog.Title>
          <CloseButton>
            <X />
          </CloseButton>
          <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
            <input
              {...register("description")}
              type="text"
              placeholder="Descrição"
              required
            />
            <input
              {...register("price", { valueAsNumber: true })}
              type="number"
              placeholder="Preço"
              required
            />
            <input
              {...register("category")}
              type="text"
              placeholder="Categoria"
              required
            />

            <Controller
              control={control}
              name="type"
              render={({ field }) => {
                return (
                  <TransactionType
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <TransactionsTypeButton variant="income" value="income">
                      <ArrowCircleUp size={24} />
                      Entrada
                    </TransactionsTypeButton>
                    <TransactionsTypeButton variant="outcome" value="outcome">
                      <ArrowCircleDown size={24} />
                      Saída
                    </TransactionsTypeButton>
                  </TransactionType>
                );
              }}
            />

            <button disabled={isSubmitting} type="submit">
              Cadastrar
            </button>
          </form>
        </Content>
      </OverLay>
    </Dialog.Portal>
  );
}
