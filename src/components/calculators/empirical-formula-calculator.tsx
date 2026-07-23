"use client";

import { FormEvent, useMemo, useState } from "react";

import {
  atomicMasses,
  type ElementSymbol,
} from "@/lib/chemistry/atomic-masses";
import {
  calculateEmpiricalFormula,
  type EmpiricalFormulaBasis,
  type EmpiricalFormulaDetails,
} from "@/lib/calculators/empirical-formula";
import type { CalculationResult } from "@/types/calculator";

type ElementRow = {
  id: number;
  symbol: ElementSymbol;
  amount: string;
};

const elementSymbols = Object.keys(
  atomicMasses,
).sort((first, second) => first.localeCompare(second)) as ElementSymbol[];

const initialRows: ElementRow[] = [
  { id: 1, symbol: "C", amount: "40" },
  { id: 2, symbol: "H", amount: "6.7" },
  { id: 3, symbol: "O", amount: "53.3" },
];

function FormulaDisplay({ formula }: { formula: string }) {
  const parts = formula.match(/[A-Z][a-z]?|\d+/g) ?? [formula];

  return (
    <>
      {parts.map((part, index) =>
        /^\d+$/.test(part) ? (
          <sub key={`${part}-${index}`}>{part}</sub>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        ),
      )}
    </>
  );
}

function createRow(id: number, usedSymbols: Set<ElementSymbol>): ElementRow {
  const symbol =
    elementSymbols.find((candidate) => !usedSymbols.has(candidate)) ??
    elementSymbols[0];

  return {
    id,
    symbol,
    amount: "",
  };
}

export function EmpiricalFormulaCalculator() {
  const [basis, setBasis] =
    useState<EmpiricalFormulaBasis>("percentage");
  const [rows, setRows] = useState<ElementRow[]>(initialRows);
  const [nextId, setNextId] = useState(4);
  const [result, setResult] =
    useState<CalculationResult<EmpiricalFormulaDetails> | null>(null);
  const [error, setError] = useState("");

  const totalAmount = useMemo(
    () =>
      rows.reduce((total, row) => {
        const amount = Number(row.amount);

        return Number.isFinite(amount) ? total + amount : total;
      }, 0),
    [rows],
  );

  function updateRow(
    id: number,
    field: "symbol" | "amount",
    value: string,
  ) {
    setRows((currentRows) =>
      currentRows.map((row) =>
        row.id === id
          ? {
              ...row,
              [field]:
                field === "symbol"
                  ? (value as ElementSymbol)
                  : value,
            }
          : row,
      ),
    );
    setResult(null);
    setError("");
  }

  function addRow() {
    if (rows.length >= 12) {
      setError("You can enter no more than 12 elements.");
      return;
    }

    const usedSymbols = new Set(rows.map((row) => row.symbol));

    setRows((currentRows) => [
      ...currentRows,
      createRow(nextId, usedSymbols),
    ]);
    setNextId((currentId) => currentId + 1);
    setResult(null);
    setError("");
  }

  function removeRow(id: number) {
    if (rows.length <= 2) {
      setError("At least two elements are required.");
      return;
    }

    setRows((currentRows) =>
      currentRows.filter((row) => row.id !== id),
    );
    setResult(null);
    setError("");
  }

  function changeBasis(newBasis: EmpiricalFormulaBasis) {
    setBasis(newBasis);
    setResult(null);
    setError("");
  }

  function loadExample(
    newBasis: EmpiricalFormulaBasis,
    exampleRows: ElementRow[],
  ) {
    setBasis(newBasis);
    setRows(exampleRows);
    setNextId(
      Math.max(...exampleRows.map((row) => row.id)) + 1,
    );
    setResult(null);
    setError("");
  }

  function resetCalculator() {
    setBasis("percentage");
    setRows(initialRows);
    setNextId(4);
    setResult(null);
    setError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);

    try {
      const calculatedResult = calculateEmpiricalFormula({
        basis,
        elements: rows.map((row) => ({
          symbol: row.symbol,
          amount: Number(row.amount),
        })),
      });

      setResult(calculatedResult);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "The empirical formula could not be calculated.",
      );
    }
  }

  return (
    <div className="space-y-8">
      <form
        className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
        onSubmit={handleSubmit}
      >
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-950">
            Enter the composition
          </h2>
          <p className="text-sm leading-6 text-slate-600">
            Choose whether your data represents masses or percentage
            composition, then enter each element.
          </p>
        </div>

        <fieldset className="mt-6">
          <legend className="text-sm font-semibold text-slate-900">
            Composition basis
          </legend>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {(["percentage", "mass"] as const).map((option) => (
              <label
                className={`cursor-pointer rounded-2xl border p-4 transition ${
                  basis === option
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                key={option}
              >
                <input
                  checked={basis === option}
                  className="mr-3"
                  name="composition-basis"
                  onChange={() => changeBasis(option)}
                  type="radio"
                />
                <span className="font-semibold capitalize text-slate-950">
                  {option}
                </span>
                <span className="mt-1 block text-sm text-slate-600">
                  {option === "percentage"
                    ? "Values should total approximately 100%."
                    : "Enter all masses using the same unit."}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-8 space-y-4">
          <div className="hidden grid-cols-[1fr_1fr_auto] gap-3 px-1 text-sm font-semibold text-slate-700 sm:grid">
            <span>Element</span>
            <span>{basis === "percentage" ? "Percentage (%)" : "Mass"}</span>
            <span className="sr-only">Actions</span>
          </div>

          {rows.map((row, index) => (
            <div
              className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
              key={row.id}
            >
              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-800 sm:sr-only">
                  Element {index + 1}
                </span>
                <select
                  aria-label={`Element ${index + 1}`}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  onChange={(event) =>
                    updateRow(row.id, "symbol", event.target.value)
                  }
                  value={row.symbol}
                >
                  {elementSymbols.map((symbol) => (
                    <option key={symbol} value={symbol}>
                      {symbol} — {atomicMasses[symbol]}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-800 sm:sr-only">
                  {basis === "percentage" ? "Percentage" : "Mass"} for{" "}
                  {row.symbol}
                </span>
                <input
                  aria-label={`${
                    basis === "percentage" ? "Percentage" : "Mass"
                  } for ${row.symbol}`}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  inputMode="decimal"
                  min="0"
                  onChange={(event) =>
                    updateRow(row.id, "amount", event.target.value)
                  }
                  placeholder={
                    basis === "percentage" ? "e.g. 40.0" : "e.g. 12.5"
                  }
                  required
                  step="any"
                  type="number"
                  value={row.amount}
                />
              </label>

              <button
                className="rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={rows.length <= 2}
                onClick={() => removeRow(row.id)}
                type="button"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <button
            className="rounded-xl border border-blue-200 px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
            onClick={addRow}
            type="button"
          >
            Add another element
          </button>

          {basis === "percentage" ? (
            <p
              className={`text-sm font-semibold ${
                Math.abs(totalAmount - 100) <= 0.5
                  ? "text-emerald-700"
                  : "text-amber-700"
              }`}
            >
              Current total: {totalAmount.toFixed(2)}%
            </p>
          ) : null}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
            type="submit"
          >
            Calculate empirical formula
          </button>

          <button
            className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            onClick={resetCalculator}
            type="button"
          >
            Reset
          </button>
        </div>

        {error ? (
          <div
            aria-live="polite"
            className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800"
            role="alert"
          >
            {error}
          </div>
        ) : null}
      </form>

      <section
        aria-label="Example compositions"
        className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-8"
      >
        <h2 className="text-xl font-bold text-slate-950">
          Try an example
        </h2>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:border-blue-400"
            onClick={() =>
              loadExample("percentage", [
                { id: 1, symbol: "C", amount: "40" },
                { id: 2, symbol: "H", amount: "6.7" },
                { id: 3, symbol: "O", amount: "53.3" },
              ])
            }
            type="button"
          >
            CH₂O percentage example
          </button>

          <button
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:border-blue-400"
            onClick={() =>
              loadExample("mass", [
                { id: 1, symbol: "Fe", amount: "11.169" },
                { id: 2, symbol: "O", amount: "4.7997" },
              ])
            }
            type="button"
          >
            Fe₂O₃ mass example
          </button>
        </div>
      </section>

      {result ? (
        <section
          aria-live="polite"
          className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 sm:p-8"
        >
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-800">
            Empirical formula
          </p>

          <div className="mt-2 text-4xl font-black text-slate-950">
            <FormulaDisplay formula={result.details.empiricalFormula} />
          </div>

          <p className="mt-3 text-sm text-slate-700">
            Empirical formula mass:{" "}
            <strong>{result.formattedValue} g/mol</strong>
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[650px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-emerald-200 text-slate-700">
                  <th className="px-3 py-3">Element</th>
                  <th className="px-3 py-3">Amount</th>
                  <th className="px-3 py-3">Atomic mass</th>
                  <th className="px-3 py-3">Moles</th>
                  <th className="px-3 py-3">Ratio</th>
                  <th className="px-3 py-3">Subscript</th>
                </tr>
              </thead>
              <tbody>
                {result.details.elements.map((element) => (
                  <tr
                    className="border-b border-emerald-100 text-slate-800"
                    key={element.symbol}
                  >
                    <td className="px-3 py-3 font-bold">
                      {element.symbol}
                    </td>
                    <td className="px-3 py-3">
                      {element.amount.toLocaleString()}
                    </td>
                    <td className="px-3 py-3">
                      {element.atomicMass.toLocaleString()}
                    </td>
                    <td className="px-3 py-3">
                      {element.moles.toPrecision(6)}
                    </td>
                    <td className="px-3 py-3">
                      {element.normalizedRatio.toFixed(4)}
                    </td>
                    <td className="px-3 py-3 font-bold">
                      {element.subscript}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-2xl bg-white/70 p-4">
            <h3 className="font-bold text-slate-950">
              Calculation method
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {result.details.formula}. Whole-number multiplier:{" "}
              {result.details.multiplier}.
            </p>
          </div>
        </section>
      ) : null}
    </div>
  );
}
