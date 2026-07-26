"use client";

import { useState, type FormEvent } from "react";

import {
  calculateDaltonsLaw,
  type DaltonLawVariable,
  type DaltonsLawDetails,
} from "@/lib/calculators/daltons-law";
import type { PressureUnit } from "@/lib/calculators/ideal-gas-law";
import type { CalculationResult } from "@/types/calculator";

type DaltonsLawResult =
  CalculationResult<DaltonsLawDetails>;

type PartialPressureInput = {
  value: string;
  unit: PressureUnit;
};

const pressureUnits: readonly {
  value: PressureUnit;
  label: string;
}[] = [
  { value: "Pa", label: "Pa" },
  { value: "kPa", label: "kPa" },
  { value: "bar", label: "bar" },
  { value: "atm", label: "atm" },
  { value: "mmHg", label: "mmHg" },
];

const examples = [
  {
    label: "Air mixture",
    solveFor: "totalPressure" as const,
    partialPressures: [
      { value: "0.78", unit: "atm" as const },
      { value: "0.21", unit: "atm" as const },
      { value: "0.01", unit: "atm" as const },
    ],
    totalPressure: "",
    totalPressureUnit: "atm" as const,
    outputUnit: "atm" as const,
  },
  {
    label: "Find missing gas",
    solveFor: "missingPartialPressure" as const,
    partialPressures: [
      { value: "300", unit: "mmHg" as const },
      { value: "250", unit: "mmHg" as const },
    ],
    totalPressure: "760",
    totalPressureUnit: "mmHg" as const,
    outputUnit: "mmHg" as const,
  },
  {
    label: "Mixed units",
    solveFor: "totalPressure" as const,
    partialPressures: [
      { value: "50", unit: "kPa" as const },
      { value: "0.5", unit: "atm" as const },
    ],
    totalPressure: "",
    totalPressureUnit: "kPa" as const,
    outputUnit: "kPa" as const,
  },
] as const;

function createDefaultPartialPressures(): PartialPressureInput[] {
  return [
    { value: "", unit: "atm" },
    { value: "", unit: "atm" },
  ];
}

export function DaltonsLawCalculator() {
  const [solveFor, setSolveFor] =
    useState<DaltonLawVariable>("totalPressure");
  const [partialPressures, setPartialPressures] =
    useState<PartialPressureInput[]>(
      createDefaultPartialPressures,
    );
  const [totalPressure, setTotalPressure] = useState("");
  const [totalPressureUnit, setTotalPressureUnit] =
    useState<PressureUnit>("atm");
  const [outputUnit, setOutputUnit] =
    useState<PressureUnit>("atm");
  const [result, setResult] =
    useState<DaltonsLawResult | null>(null);
  const [error, setError] = useState("");

  function clearFeedback() {
    setResult(null);
    setError("");
  }

  function changeSolveFor(variable: DaltonLawVariable) {
    setSolveFor(variable);
    setTotalPressure("");
    clearFeedback();
  }

  function updatePartialPressure(
    index: number,
    field: keyof PartialPressureInput,
    value: string,
  ) {
    setPartialPressures((current) =>
      current.map((pressure, pressureIndex) =>
        pressureIndex === index
          ? { ...pressure, [field]: value }
          : pressure,
      ),
    );
    clearFeedback();
  }

  function addPartialPressure() {
    setPartialPressures((current) => [
      ...current,
      { value: "", unit: outputUnit },
    ]);
    clearFeedback();
  }

  function removePartialPressure(index: number) {
    const minimum =
      solveFor === "totalPressure" ? 2 : 1;

    if (partialPressures.length <= minimum) {
      setError(
        solveFor === "totalPressure"
          ? "At least two partial pressures are required."
          : "At least one known partial pressure is required.",
      );
      return;
    }

    setPartialPressures((current) =>
      current.filter(
        (_, pressureIndex) => pressureIndex !== index,
      ),
    );
    clearFeedback();
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearFeedback();

    const parsedPartialPressures = partialPressures.map(
      (pressure, index) => {
        const numericValue = Number(pressure.value);

        if (
          pressure.value.trim() === "" ||
          !Number.isFinite(numericValue)
        ) {
          throw new Error(
            `Enter a valid partial pressure ${index + 1}.`,
          );
        }

        return {
          value: numericValue,
          unit: pressure.unit,
        };
      },
    );

    let parsedTotalPressure: number | undefined;

    if (solveFor === "missingPartialPressure") {
      parsedTotalPressure = Number(totalPressure);

      if (
        totalPressure.trim() === "" ||
        !Number.isFinite(parsedTotalPressure)
      ) {
        setError("Enter a valid total pressure.");
        return;
      }
    }

    try {
      const calculationResult = calculateDaltonsLaw({
        partialPressures: parsedPartialPressures,
        totalPressure: parsedTotalPressure,
        totalPressureUnit,
        outputUnit,
        solveFor,
      });

      setResult(calculationResult);
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
    setPartialPressures(
      example.partialPressures.map((pressure) => ({
        ...pressure,
      })),
    );
    setTotalPressure(example.totalPressure);
    setTotalPressureUnit(example.totalPressureUnit);
    setOutputUnit(example.outputUnit);
    clearFeedback();
  }

  function resetCalculator() {
    setSolveFor("totalPressure");
    setPartialPressures(createDefaultPartialPressures());
    setTotalPressure("");
    setTotalPressureUnit("atm");
    setOutputUnit("atm");
    clearFeedback();
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
              Enter gas pressures
            </p>
            <h2>Solve Dalton&apos;s law</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="daltons-law-solve-for">
              Calculate which value?
            </label>

            <select
              id="daltons-law-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target.value as DaltonLawVariable,
                )
              }
            >
              <option value="totalPressure">
                Total pressure
              </option>
              <option value="missingPartialPressure">
                Missing partial pressure
              </option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="daltons-law-output-unit">
              Result unit
            </label>

            <select
              id="daltons-law-output-unit"
              value={outputUnit}
              onChange={(event) => {
                setOutputUnit(
                  event.target.value as PressureUnit,
                );
                clearFeedback();
              }}
            >
              {pressureUnits.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {solveFor === "missingPartialPressure" && (
          <div className="calculator-input-grid">
            <div className="form-field">
              <label htmlFor="daltons-law-total-pressure">
                Total pressure (Ptotal)
              </label>

              <div className="input-with-unit">
                <input
                  id="daltons-law-total-pressure"
                  type="number"
                  inputMode="decimal"
                  step="any"
                  value={totalPressure}
                  onChange={(event) => {
                    setTotalPressure(event.target.value);
                    clearFeedback();
                  }}
                  placeholder="760"
                />

                <select
                  aria-label="Total pressure unit"
                  value={totalPressureUnit}
                  onChange={(event) => {
                    setTotalPressureUnit(
                      event.target.value as PressureUnit,
                    );
                    clearFeedback();
                  }}
                >
                  {pressureUnits.map((unit) => (
                    <option
                      key={unit.value}
                      value={unit.value}
                    >
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="calculator-form__heading">
          <div>
            <p className="calculator-form__label">
              Gas components
            </p>
            <h3>
              {solveFor === "totalPressure"
                ? "Partial pressures"
                : "Known partial pressures"}
            </h3>
          </div>
        </div>

        <div className="calculator-input-grid">
          {partialPressures.map((pressure, index) => (
            <div
              className="form-field"
              key={`partial-pressure-${index + 1}`}
            >
              <label
                htmlFor={`daltons-law-partial-${index + 1}`}
              >
                Partial pressure {index + 1} (P
                <sub>{index + 1}</sub>)
              </label>

              <div className="input-with-unit">
                <input
                  id={`daltons-law-partial-${index + 1}`}
                  type="number"
                  inputMode="decimal"
                  step="any"
                  value={pressure.value}
                  onChange={(event) =>
                    updatePartialPressure(
                      index,
                      "value",
                      event.target.value,
                    )
                  }
                  placeholder={
                    index === 0 ? "0.78" : "0.21"
                  }
                />

                <select
                  aria-label={`Partial pressure ${
                    index + 1
                  } unit`}
                  value={pressure.unit}
                  onChange={(event) =>
                    updatePartialPressure(
                      index,
                      "unit",
                      event.target.value,
                    )
                  }
                >
                  {pressureUnits.map((unit) => (
                    <option
                      key={unit.value}
                      value={unit.value}
                    >
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="calculator-secondary-button"
                type="button"
                onClick={() => removePartialPressure(index)}
              >
                Remove pressure {index + 1}
              </button>
            </div>
          ))}
        </div>

        <button
          className="calculator-secondary-button"
          type="button"
          onClick={addPartialPressure}
        >
          Add another partial pressure
        </button>

        <div className="calculator-actions">
          <button
            className="calculator-primary-button"
            type="submit"
          >
            Calculate pressure
          </button>

          <button
            className="calculator-secondary-button"
            type="button"
            onClick={resetCalculator}
          >
            Reset
          </button>
        </div>

        <div className="calculator-example-row">
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

        <div
          className="calculator-feedback"
          aria-live="polite"
        >
          {error && (
            <p className="calculator-error" role="alert">
              {error}
            </p>
          )}

          {result && (
            <div className="calculator-result">
              <p className="calculator-result__label">
                {solveFor === "totalPressure"
                  ? "Total pressure"
                  : "Missing partial pressure"}
              </p>

              <p className="calculator-result__value">
                {result.formattedValue}
              </p>

              <div className="calculator-result__details">
                <p>
                  <strong>Formula:</strong>{" "}
                  {result.details.formula}
                </p>
                <p>
                  <strong>Gas components:</strong>{" "}
                  {result.details.componentCount}
                </p>
                <p>
                  Pressure values are converted to pascals
                  internally before the final result is
                  converted to {result.details.outputUnit}.
                </p>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
