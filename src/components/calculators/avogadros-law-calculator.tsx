"use client";

import { useState, type FormEvent } from "react";

import {
  calculateAvogadrosLaw,
  type AmountUnit,
  type AvogadrosLawDetails,
  type AvogadrosLawVariable,
} from "@/lib/calculators/avogadros-law";
import type { GasVolumeUnit } from "@/lib/calculators/ideal-gas-law";
import type { CalculationResult } from "@/types/calculator";

type AvogadrosLawResult =
  CalculationResult<AvogadrosLawDetails>;

type Values = Record<AvogadrosLawVariable, string>;

type Units = {
  initialVolume: GasVolumeUnit;
  initialAmount: AmountUnit;
  finalVolume: GasVolumeUnit;
  finalAmount: AmountUnit;
};

const fields = [
  {
    key: "initialVolume",
    label: "Initial volume",
    symbol: "V₁",
    description: "The gas volume before the amount changes.",
    quantity: "volume",
  },
  {
    key: "initialAmount",
    label: "Initial amount",
    symbol: "n₁",
    description: "The initial amount of gas.",
    quantity: "amount",
  },
  {
    key: "finalVolume",
    label: "Final volume",
    symbol: "V₂",
    description: "The gas volume after the amount changes.",
    quantity: "volume",
  },
  {
    key: "finalAmount",
    label: "Final amount",
    symbol: "n₂",
    description: "The final amount of gas.",
    quantity: "amount",
  },
] as const;

const variableLabels: Record<
  AvogadrosLawVariable,
  string
> = {
  initialVolume: "Initial volume",
  initialAmount: "Initial amount",
  finalVolume: "Final volume",
  finalAmount: "Final amount",
};

const emptyValues: Values = {
  initialVolume: "",
  initialAmount: "",
  finalVolume: "",
  finalAmount: "",
};

const defaultUnits: Units = {
  initialVolume: "L",
  initialAmount: "mol",
  finalVolume: "L",
  finalAmount: "mol",
};

const volumeUnits: readonly {
  value: GasVolumeUnit;
  label: string;
}[] = [
  { value: "m3", label: "m³" },
  { value: "L", label: "L" },
  { value: "mL", label: "mL" },
];

const amountUnits: readonly {
  value: AmountUnit;
  label: string;
}[] = [
  { value: "mol", label: "mol" },
  { value: "mmol", label: "mmol" },
];

const examples = [
  {
    label: "Double the amount",
    solveFor: "finalVolume" as const,
    values: {
      initialVolume: "2",
      initialAmount: "1",
      finalVolume: "",
      finalAmount: "2",
    },
    units: {
      initialVolume: "L",
      initialAmount: "mol",
      finalVolume: "L",
      finalAmount: "mol",
    } satisfies Units,
  },
  {
    label: "Find final amount",
    solveFor: "finalAmount" as const,
    values: {
      initialVolume: "500",
      initialAmount: "250",
      finalVolume: "1000",
      finalAmount: "",
    },
    units: {
      initialVolume: "mL",
      initialAmount: "mmol",
      finalVolume: "mL",
      finalAmount: "mmol",
    } satisfies Units,
  },
  {
    label: "Mixed units",
    solveFor: "finalVolume" as const,
    values: {
      initialVolume: "500",
      initialAmount: "250",
      finalVolume: "",
      finalAmount: "1",
    },
    units: {
      initialVolume: "mL",
      initialAmount: "mmol",
      finalVolume: "m3",
      finalAmount: "mol",
    } satisfies Units,
  },
] as const;

export function AvogadrosLawCalculator() {
  const [solveFor, setSolveFor] =
    useState<AvogadrosLawVariable>("finalVolume");
  const [values, setValues] =
    useState<Values>(emptyValues);
  const [units, setUnits] =
    useState<Units>(defaultUnits);
  const [result, setResult] =
    useState<AvogadrosLawResult | null>(null);
  const [error, setError] = useState("");

  function clearFeedback() {
    setResult(null);
    setError("");
  }

  function updateValue(
    variable: AvogadrosLawVariable,
    value: string,
  ) {
    setValues((current) => ({
      ...current,
      [variable]: value,
    }));
    clearFeedback();
  }

  function updateVolumeUnit(
    variable: "initialVolume" | "finalVolume",
    unit: GasVolumeUnit,
  ) {
    setUnits((current) => ({
      ...current,
      [variable]: unit,
    }));
    clearFeedback();
  }

  function updateAmountUnit(
    variable: "initialAmount" | "finalAmount",
    unit: AmountUnit,
  ) {
    setUnits((current) => ({
      ...current,
      [variable]: unit,
    }));
    clearFeedback();
  }

  function changeSolveFor(
    variable: AvogadrosLawVariable,
  ) {
    setSolveFor(variable);
    setValues((current) => ({
      ...current,
      [variable]: "",
    }));
    clearFeedback();
  }

  function calculate(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    clearFeedback();

    const numericValues: Partial<
      Record<AvogadrosLawVariable, number>
    > = {};

    for (const field of fields) {
      if (field.key === solveFor) {
        continue;
      }

      const rawValue = values[field.key];
      const numericValue = Number(rawValue);

      if (
        rawValue.trim() === "" ||
        !Number.isFinite(numericValue)
      ) {
        setError(
          `Enter a valid ${field.label.toLowerCase()}.`,
        );
        return;
      }

      numericValues[field.key] = numericValue;
    }

    try {
      const calculationResult =
        calculateAvogadrosLaw({
          initialVolume: numericValues.initialVolume,
          initialVolumeUnit: units.initialVolume,
          initialAmount: numericValues.initialAmount,
          initialAmountUnit: units.initialAmount,
          finalVolume: numericValues.finalVolume,
          finalVolumeUnit: units.finalVolume,
          finalAmount: numericValues.finalAmount,
          finalAmountUnit: units.finalAmount,
          solveFor,
        });

      setResult(calculationResult);
      setValues((current) => ({
        ...current,
        [solveFor]: String(calculationResult.value),
      }));
    } catch (calculationError) {
      setError(
        calculationError instanceof Error
          ? calculationError.message
          : "The calculation could not be completed.",
      );
    }
  }

  function loadExample(
    example: (typeof examples)[number],
  ) {
    setSolveFor(example.solveFor);
    setValues({ ...example.values });
    setUnits({ ...example.units });
    clearFeedback();
  }

  function resetCalculator() {
    setSolveFor("finalVolume");
    setValues({ ...emptyValues });
    setUnits({ ...defaultUnits });
    clearFeedback();
  }

  function renderUnitControl(
    field: (typeof fields)[number],
  ) {
    if (field.quantity === "volume") {
      const variable = field.key as
        | "initialVolume"
        | "finalVolume";

      return (
        <select
          aria-label={`${field.label} unit`}
          value={units[variable]}
          onChange={(event) =>
            updateVolumeUnit(
              variable,
              event.target.value as GasVolumeUnit,
            )
          }
        >
          {volumeUnits.map((unit) => (
            <option key={unit.value} value={unit.value}>
              {unit.label}
            </option>
          ))}
        </select>
      );
    }

    const variable = field.key as
      | "initialAmount"
      | "finalAmount";

    return (
      <select
        aria-label={`${field.label} unit`}
        value={units[variable]}
        onChange={(event) =>
          updateAmountUnit(
            variable,
            event.target.value as AmountUnit,
          )
        }
      >
        {amountUnits.map((unit) => (
          <option key={unit.value} value={unit.value}>
            {unit.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <div className="calculator-panel">
      <form
        className="calculator-form"
        onSubmit={calculate}
        noValidate
      >
        <div className="calculator-form__heading">
          <div>
            <p className="calculator-form__label">
              Enter three known values
            </p>
            <h2>Solve Avogadro&apos;s law</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="avogadros-law-solve-for">
              Calculate which value?
            </label>

            <select
              id="avogadros-law-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as AvogadrosLawVariable,
                )
              }
            >
              {fields.map((field) => (
                <option
                  key={field.key}
                  value={field.key}
                >
                  {field.label} ({field.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="density-fields">
          {fields.map((field) => {
            const isSolvedField =
              field.key === solveFor;

            return (
              <div
                className="form-field"
                key={field.key}
              >
                <label
                  htmlFor={`avogadros-law-${field.key}`}
                >
                  {field.label} ({field.symbol})
                </label>

                <div className="input-with-suffix">
                  <input
                    id={`avogadros-law-${field.key}`}
                    name={field.key}
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min="0"
                    placeholder={
                      isSolvedField
                        ? "Calculated automatically"
                        : "Enter value"
                    }
                    value={values[field.key]}
                    onChange={(event) =>
                      updateValue(
                        field.key,
                        event.target.value,
                      )
                    }
                    disabled={isSolvedField}
                    aria-describedby={
                      `avogadros-law-${field.key}-help`
                    }
                  />

                  {renderUnitControl(field)}
                </div>

                <p
                  id={`avogadros-law-${field.key}-help`}
                >
                  {isSolvedField
                    ? "This is the value being calculated."
                    : field.description}
                </p>
              </div>
            );
          })}
        </div>

        <p className="calculator-unit-note">
          Avogadro&apos;s law assumes constant temperature
          and pressure. Volume and the amount of gas must
          both be greater than zero.
        </p>

        {error ? (
          <div
            className="calculator-error"
            role="alert"
          >
            {error}
          </div>
        ) : null}

        <div className="calculator-actions">
          <button
            className="button button--primary"
            type="submit"
          >
            Calculate{" "}
            {variableLabels[solveFor].toLowerCase()}
          </button>

          <button
            className="button button--secondary"
            type="button"
            onClick={resetCalculator}
          >
            Reset
          </button>
        </div>

        <div className="calculator-examples">
          <span>Try an example:</span>

          {examples.map((example) => (
            <button
              key={example.label}
              type="button"
              onClick={() => loadExample(example)}
            >
              {example.label}
            </button>
          ))}
        </div>
      </form>

      <aside
        className="calculator-result"
        aria-live="polite"
      >
        <p className="calculator-result__label">
          Calculated result
        </p>

        {result ? (
          <>
            <h2>{result.formattedValue}</h2>

            <dl className="calculator-result__details">
              <div>
                <dt>Calculated variable</dt>
                <dd>{variableLabels[solveFor]}</dd>
              </div>

              <div>
                <dt>Rearranged formula</dt>
                <dd>{result.details.formula}</dd>
              </div>

              <div>
                <dt>Initial ratio</dt>
                <dd>
                  {result.details.initialVolumeAmountRatio.toPrecision(
                    6,
                  )}{" "}
                  m³/mol
                </dd>
              </div>

              <div>
                <dt>Final ratio</dt>
                <dd>
                  {result.details.finalVolumeAmountRatio.toPrecision(
                    6,
                  )}{" "}
                  m³/mol
                </dd>
              </div>
            </dl>

            <p className="calculator-result__note">
              The volume-to-amount ratio remains constant
              when temperature and pressure do not change.
            </p>
          </>
        ) : (
          <>
            <h2>Ready to calculate</h2>

            <p>
              Select the unknown value and enter the other
              three values to solve V₁/n₁ = V₂/n₂.
            </p>

            <div className="calculator-result__formula">
              V₁/n₁ = V₂/n₂
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
