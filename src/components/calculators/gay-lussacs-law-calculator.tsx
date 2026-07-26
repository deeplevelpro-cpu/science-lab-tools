"use client";

import { useState, type FormEvent } from "react";

import {
  calculateGayLussacsLaw,
  type GayLussacsLawDetails,
  type GayLussacsLawVariable,
} from "@/lib/calculators/gay-lussacs-law";
import {
  type PressureUnit,
  type TemperatureUnit,
} from "@/lib/calculators/ideal-gas-law";
import type { CalculationResult } from "@/types/calculator";

type GayLussacsLawResult =
  CalculationResult<GayLussacsLawDetails>;

type Values = Record<GayLussacsLawVariable, string>;

type Units = {
  initialPressure: PressureUnit;
  initialTemperature: TemperatureUnit;
  finalPressure: PressureUnit;
  finalTemperature: TemperatureUnit;
};

const fields = [
  {
    key: "initialPressure",
    label: "Initial pressure",
    symbol: "P₁",
    description: "The gas volume before the temperature change.",
    quantity: "pressure",
  },
  {
    key: "initialTemperature",
    label: "Initial temperature",
    symbol: "T₁",
    description: "The gas temperature before the change.",
    quantity: "temperature",
  },
  {
    key: "finalPressure",
    label: "Final pressure",
    symbol: "P₂",
    description: "The gas volume after the temperature change.",
    quantity: "pressure",
  },
  {
    key: "finalTemperature",
    label: "Final temperature",
    symbol: "T₂",
    description: "The gas temperature after the change.",
    quantity: "temperature",
  },
] as const;

const variableLabels: Record<GayLussacsLawVariable, string> = {
  initialPressure: "Initial pressure",
  initialTemperature: "Initial temperature",
  finalPressure: "Final pressure",
  finalTemperature: "Final temperature",
};

const emptyValues: Values = {
  initialPressure: "",
  initialTemperature: "",
  finalPressure: "",
  finalTemperature: "",
};

const defaultUnits: Units = {
  initialPressure: "atm",
  initialTemperature: "K",
  finalPressure: "atm",
  finalTemperature: "K",
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

const temperatureUnits: readonly {
  value: TemperatureUnit;
  label: string;
}[] = [
  { value: "K", label: "K" },
  { value: "C", label: "°C" },
  { value: "F", label: "°F" },
];

const examples = [
  {
    label: "Heat a sealed gas",
    solveFor: "finalPressure" as const,
    values: {
      initialPressure: "1",
      initialTemperature: "300",
      finalPressure: "",
      finalTemperature: "600",
    },
    units: {
      initialPressure: "atm",
      initialTemperature: "K",
      finalPressure: "atm",
      finalTemperature: "K",
    } satisfies Units,
  },
  {
    label: "Find final temperature",
    solveFor: "finalTemperature" as const,
    values: {
      initialPressure: "100",
      initialTemperature: "27",
      finalPressure: "150",
      finalTemperature: "",
    },
    units: {
      initialPressure: "kPa",
      initialTemperature: "C",
      finalPressure: "kPa",
      finalTemperature: "C",
    } satisfies Units,
  },
  {
    label: "Mixed units",
    solveFor: "finalPressure" as const,
    values: {
      initialPressure: "760",
      initialTemperature: "32",
      finalPressure: "",
      finalTemperature: "212",
    },
    units: {
      initialPressure: "mmHg",
      initialTemperature: "F",
      finalPressure: "atm",
      finalTemperature: "F",
    } satisfies Units,
  },
] as const;

function displayPressureUnit(
  unit: PressureUnit,
): string {
  return unit;
}

function displayTemperatureUnit(
  unit: TemperatureUnit,
): string {
  if (unit === "C") {
    return "°C";
  }

  if (unit === "F") {
    return "°F";
  }

  return "K";
}

function displayUnit(
  variable: GayLussacsLawVariable,
  units: Units,
): string {
  if (
    variable === "initialPressure" ||
    variable === "finalPressure"
  ) {
    return displayPressureUnit(
      units[variable] as PressureUnit,
    );
  }

  return displayTemperatureUnit(
    units[variable] as TemperatureUnit,
  );
}

export function GayLussacsLawCalculator() {
  const [solveFor, setSolveFor] =
    useState<GayLussacsLawVariable>("finalPressure");
  const [values, setValues] =
    useState<Values>(emptyValues);
  const [units, setUnits] =
    useState<Units>(defaultUnits);
  const [result, setResult] =
    useState<GayLussacsLawResult | null>(null);
  const [error, setError] = useState("");

  function clearFeedback() {
    setResult(null);
    setError("");
  }

  function updateValue(
    variable: GayLussacsLawVariable,
    value: string,
  ) {
    setValues((current) => ({
      ...current,
      [variable]: value,
    }));
    clearFeedback();
  }

  function updatePressureUnit(
    variable: "initialPressure" | "finalPressure",
    unit: PressureUnit,
  ) {
    setUnits((current) => ({
      ...current,
      [variable]: unit,
    }));
    clearFeedback();
  }

  function updateTemperatureUnit(
    variable:
      | "initialTemperature"
      | "finalTemperature",
    unit: TemperatureUnit,
  ) {
    setUnits((current) => ({
      ...current,
      [variable]: unit,
    }));
    clearFeedback();
  }

  function changeSolveFor(
    variable: GayLussacsLawVariable,
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
      Record<GayLussacsLawVariable, number>
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
      const calculationResult = calculateGayLussacsLaw({
        initialPressure: numericValues.initialPressure,
        initialPressureUnit: units.initialPressure,
        initialTemperature:
          numericValues.initialTemperature,
        initialTemperatureUnit:
          units.initialTemperature,
        finalPressure: numericValues.finalPressure,
        finalPressureUnit: units.finalPressure,
        finalTemperature:
          numericValues.finalTemperature,
        finalTemperatureUnit:
          units.finalTemperature,
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
    setSolveFor("finalPressure");
    setValues({ ...emptyValues });
    setUnits({ ...defaultUnits });
    clearFeedback();
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
      | "initialTemperature"
      | "finalTemperature";

    return (
      <select
        aria-label={`${field.label} unit`}
        value={units[variable]}
        onChange={(event) =>
          updateTemperatureUnit(
            variable,
            event.target.value as TemperatureUnit,
          )
        }
      >
        {temperatureUnits.map((unit) => (
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
            <h2>Solve Gay-Lussac&apos;s law</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="gay-lussacs-law-solve-for">
              Calculate which value?
            </label>

            <select
              id="gay-lussacs-law-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target.value as GayLussacsLawVariable,
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
                <label htmlFor={`gay-lussacs-law-${field.key}`}>
                  {field.label} ({field.symbol})
                </label>

                <div className="input-with-suffix">
                  <input
                    id={`gay-lussacs-law-${field.key}`}
                    name={field.key}
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min={
                      field.quantity === "pressure"
                        ? "0"
                        : undefined
                    }
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
                    aria-describedby={`gay-lussacs-law-${field.key}-help`}
                  />

                  {renderUnitControl(field)}
                </div>

                <p id={`gay-lussacs-law-${field.key}-help`}>
                  {isSolvedField
                    ? "This is the value being calculated."
                    : field.description}
                </p>
              </div>
            );
          })}
        </div>

        <p className="calculator-unit-note">
          Gay-Lussac&apos;s law assumes a fixed amount of gas
          in a rigid container at constant volume.
          Temperatures are converted internally to Kelvin
          and must remain above absolute zero.
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
              {fields.map((field) => (
                <div key={field.key}>
                  <dt>
                    {field.label} ({field.symbol})
                  </dt>
                  <dd>
                    {values[field.key]}{" "}
                    {displayUnit(field.key, units)}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="calculator-unit-note">
              Check: P₁ ÷ T₁ and P₂ ÷ T₂ are equal after
              converting both temperatures to Kelvin.
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
              other three values, and choose the volume and
              temperature units.
            </p>
          </>
        )}
      </section>
    </div>
  );
}
