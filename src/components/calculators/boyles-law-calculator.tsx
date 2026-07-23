"use client";

import { useState, type FormEvent } from "react";

import {
  calculateBoylesLaw,
  type BoylesLawDetails,
  type BoylesLawVariable,
} from "@/lib/calculators/boyles-law";
import {
  type GasVolumeUnit,
  type PressureUnit,
} from "@/lib/calculators/ideal-gas-law";
import type { CalculationResult } from "@/types/calculator";

type BoylesLawResult =
  CalculationResult<BoylesLawDetails>;

type Values = Record<BoylesLawVariable, string>;

type Units = {
  initialPressure: PressureUnit;
  initialVolume: GasVolumeUnit;
  finalPressure: PressureUnit;
  finalVolume: GasVolumeUnit;
};

const fields = [
  {
    key: "initialPressure",
    label: "Initial pressure",
    symbol: "P₁",
    description: "The gas pressure before the change.",
    quantity: "pressure",
  },
  {
    key: "initialVolume",
    label: "Initial volume",
    symbol: "V₁",
    description: "The gas volume before the change.",
    quantity: "volume",
  },
  {
    key: "finalPressure",
    label: "Final pressure",
    symbol: "P₂",
    description: "The gas pressure after the change.",
    quantity: "pressure",
  },
  {
    key: "finalVolume",
    label: "Final volume",
    symbol: "V₂",
    description: "The gas volume after the change.",
    quantity: "volume",
  },
] as const;

const variableLabels: Record<BoylesLawVariable, string> = {
  initialPressure: "Initial pressure",
  initialVolume: "Initial volume",
  finalPressure: "Final pressure",
  finalVolume: "Final volume",
};

const emptyValues: Values = {
  initialPressure: "",
  initialVolume: "",
  finalPressure: "",
  finalVolume: "",
};

const defaultUnits: Units = {
  initialPressure: "atm",
  initialVolume: "L",
  finalPressure: "atm",
  finalVolume: "L",
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

const volumeUnits: readonly {
  value: GasVolumeUnit;
  label: string;
}[] = [
  { value: "m3", label: "m³" },
  { value: "L", label: "L" },
  { value: "mL", label: "mL" },
];

const examples = [
  {
    label: "Compress a gas",
    solveFor: "finalPressure" as const,
    values: {
      initialPressure: "1",
      initialVolume: "2",
      finalPressure: "",
      finalVolume: "1",
    },
    units: {
      initialPressure: "atm",
      initialVolume: "L",
      finalPressure: "atm",
      finalVolume: "L",
    } satisfies Units,
  },
  {
    label: "Find final volume",
    solveFor: "finalVolume" as const,
    values: {
      initialPressure: "200",
      initialVolume: "3",
      finalPressure: "100",
      finalVolume: "",
    },
    units: {
      initialPressure: "kPa",
      initialVolume: "L",
      finalPressure: "kPa",
      finalVolume: "L",
    } satisfies Units,
  },
  {
    label: "Mixed units",
    solveFor: "finalVolume" as const,
    values: {
      initialPressure: "101.325",
      initialVolume: "2",
      finalPressure: "1",
      finalVolume: "",
    },
    units: {
      initialPressure: "kPa",
      initialVolume: "L",
      finalPressure: "atm",
      finalVolume: "mL",
    } satisfies Units,
  },
] as const;

function displayVolumeUnit(unit: GasVolumeUnit): string {
  return unit === "m3" ? "m³" : unit;
}

function displayUnit(
  variable: BoylesLawVariable,
  units: Units,
): string {
  const unit = units[variable];

  if (
    variable === "initialVolume" ||
    variable === "finalVolume"
  ) {
    return displayVolumeUnit(unit as GasVolumeUnit);
  }

  return unit;
}

export function BoylesLawCalculator() {
  const [solveFor, setSolveFor] =
    useState<BoylesLawVariable>("finalPressure");
  const [values, setValues] =
    useState<Values>(emptyValues);
  const [units, setUnits] =
    useState<Units>(defaultUnits);
  const [result, setResult] =
    useState<BoylesLawResult | null>(null);
  const [error, setError] = useState("");

  function updateValue(
    variable: BoylesLawVariable,
    value: string,
  ) {
    setValues((current) => ({
      ...current,
      [variable]: value,
    }));
    setResult(null);
    setError("");
  }

  function updatePressureUnit(
    variable: "initialPressure" | "finalPressure",
    unit: PressureUnit,
  ) {
    setUnits((current) => ({
      ...current,
      [variable]: unit,
    }));
    setResult(null);
    setError("");
  }

  function updateVolumeUnit(
    variable: "initialVolume" | "finalVolume",
    unit: GasVolumeUnit,
  ) {
    setUnits((current) => ({
      ...current,
      [variable]: unit,
    }));
    setResult(null);
    setError("");
  }

  function changeSolveFor(variable: BoylesLawVariable) {
    setSolveFor(variable);
    setValues((current) => ({
      ...current,
      [variable]: "",
    }));
    setResult(null);
    setError("");
  }

  function calculate(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setResult(null);
    setError("");

    const numericValues: Partial<
      Record<BoylesLawVariable, number>
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
      const calculationResult = calculateBoylesLaw({
        initialPressure: numericValues.initialPressure,
        initialPressureUnit: units.initialPressure,
        initialVolume: numericValues.initialVolume,
        initialVolumeUnit: units.initialVolume,
        finalPressure: numericValues.finalPressure,
        finalPressureUnit: units.finalPressure,
        finalVolume: numericValues.finalVolume,
        finalVolumeUnit: units.finalVolume,
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
    setResult(null);
    setError("");
  }

  function resetCalculator() {
    setSolveFor("finalPressure");
    setValues(emptyValues);
    setUnits(defaultUnits);
    setResult(null);
    setError("");
  }

  function renderUnitControl(
    field: (typeof fields)[number],
  ) {
    if (field.quantity === "pressure") {
      const variable = field.key as
        | "initialPressure"
        | "finalPressure";

      return (
        <select
          aria-label={`${field.label} unit`}
          value={units[variable]}
          onChange={(event) =>
            updatePressureUnit(
              variable,
              event.target.value as PressureUnit,
            )
          }
        >
          {pressureUnits.map((unit) => (
            <option key={unit.value} value={unit.value}>
              {unit.label}
            </option>
          ))}
        </select>
      );
    }

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
            <h2>Solve Boyle&apos;s law</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="boyles-law-solve-for">
              Calculate which value?
            </label>

            <select
              id="boyles-law-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target.value as BoylesLawVariable,
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
                <label htmlFor={`boyles-law-${field.key}`}>
                  {field.label} ({field.symbol})
                </label>

                <div className="input-with-suffix">
                  <input
                    id={`boyles-law-${field.key}`}
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
                    aria-describedby={`boyles-law-${field.key}-help`}
                  />

                  {renderUnitControl(field)}
                </div>

                <p id={`boyles-law-${field.key}-help`}>
                  {isSolvedField
                    ? "This is the value being calculated."
                    : field.description}
                </p>
              </div>
            );
          })}
        </div>

        <p className="calculator-unit-note">
          Boyle&apos;s law assumes a fixed amount of gas at
          constant temperature. Pressure and volume values
          are converted internally to SI units.
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
            Calculate {variableLabels[solveFor].toLowerCase()}
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

      <section
        className={`calculator-result ${
          result ? "calculator-result--complete" : ""
        }`}
        aria-live="polite"
        aria-atomic="true"
      >
        {result ? (
          <>
            <p className="calculator-result__eyebrow">
              Calculated {variableLabels[solveFor]}
            </p>

            <div className="calculator-result__value">
              {result.formattedValue}
            </div>

            <p className="calculator-result__formula">
              {result.details.formula}
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Initial pressure (P₁)</dt>
                <dd>
                  {result.details.initialPressure}{" "}
                  {displayUnit("initialPressure", units)}
                </dd>
              </div>

              <div>
                <dt>Initial volume (V₁)</dt>
                <dd>
                  {result.details.initialVolume}{" "}
                  {displayUnit("initialVolume", units)}
                </dd>
              </div>

              <div>
                <dt>Final pressure (P₂)</dt>
                <dd>
                  {result.details.finalPressure}{" "}
                  {displayUnit("finalPressure", units)}
                </dd>
              </div>

              <div>
                <dt>Final volume (V₂)</dt>
                <dd>
                  {result.details.finalVolume}{" "}
                  {displayUnit("finalVolume", units)}
                </dd>
              </div>
            </dl>

            <p className="calculator-unit-note">
              Check: P₁V₁ and P₂V₂ are equal after unit
              conversion.
            </p>
          </>
        ) : (
          <>
            <p className="calculator-result__eyebrow">
              Result
            </p>
            <h2>Your result will appear here</h2>
            <p>
              Select the variable to calculate, enter the
              other three positive values, and choose the
              pressure and volume units.
            </p>
          </>
        )}
      </section>
    </div>
  );
}
