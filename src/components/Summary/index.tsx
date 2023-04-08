import { useContext } from "react";
import { SummaryCard, SummaryContainer } from "./styled";
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from "phosphor-react";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { priceFormatter } from "../../utils/formatter";
import { useSummary } from "../../hook/useSummary";

export function Summary() {
  const summary = useSummary();
  return (
    <SummaryContainer>
      <SummaryCard className="">
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>

        <strong>{priceFormatter.format(summary.icome)}</strong>
      </SummaryCard>
      <SummaryCard className="">
        <header>
          <span>Saida</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>

        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </SummaryCard>
      <SummaryCard variant="green" className="">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>

        <strong>{priceFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
