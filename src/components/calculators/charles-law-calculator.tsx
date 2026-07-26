"use client";

import { useState, type FormEvent } from "react";

import {
  calculateCharlesLaw,
  type CharlesLawDetails,
  type CharlesLawVariable,
} from "@/lib/calculators/charles-law";
import {
  type GasVolumeUnit,
  type TemperatureUnit,
} from "@/lib/calculators/ideal-gas-law";
import type { CalculationResult } from "@/types/calculator";

type CharlesLawResult =
  CalculationResult<CharlesLawDetails>;

type Values = Record<CharlesLawVariable, string>;

type Units = {
  initialVolume: GasVolumeUnit;
  initialTemperature: TemperatureUnit;
  finalVolume: GasVolumeUnit;
  finalTemperature: TemperatureUnit;
};

const fields = [
  {
    key: "initialVolume",
    label: "Initial volume",
    symbol: "V₁",
    description: "The gas volume before the temperature change.",
    quantity: "volume",
  },
  {
    key: "initialTemperature",
    label: "Initial temperature",
    symbol: "T₁",
    description: "The gas temperature before the change.",
    quantity: "temperature",
  },
  {
    key: "finalVolume",
    label: "Final volume",
    symbol: "V₂",
    description: "The gas volume after the temperature change.",
    quantity: "volume",
  },
  {
    key: "finalTemperature",
    label: "Final temperature",
    symbol: "T₂",
    description: "The gas temperature after the change.",
    quantity: "temperature",
  },
] as const;

const variableLabels: Record<CharlesLawVariable, string> = {
  initialVolume: "Initial volume",
  initialTemperature: "Initial temperature",
  finalVolume: "Final volume",
  finalTemperature: "Final temperature",
};

const emptyValues: Values = {
  initialVolume: "",
  initialTemperature: "",
  finalVolume: "",
  finalTemperature: "",
};

const defaultUnits: Units = {
  initialVolume: "L",
  initialTemperature: "K",
  finalVolume: "L",
  finalTemperature: "K",
};

const volumeUnits: readonly {
  value: GasVolumeUnit;
  label: string;
}[] = [
  { value: "m3", label: "m³" },
  { value: "L", label: "L" },
  { value: "mL", label: "mL" },
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
    label: "Heat a gas",
    solveFor: "finalVolume" as const,
    values: {
      initialVolume: "2",
      initialTemperature: "300",
      finalVolume: "",
      finalTemperature: "450",
    },
    units: {
      initialVolume: "L",
      initialTemperature: "K",
      finalVolume: "L",
      finalTemperature: "K",
    } satisfies Units,
  },
  {
    label: "Find final temperature",
    solveFor: "finalTemperature" as const,
    values: {
      initialVolume: "500",
      initialTemperature: "20",
      finalVolume: "600",
      finalTemperature: "",
    },
    units: {
      initialVolume: "mL",
      initialTemperature: "C",
      finalVolume: "mL",
      finalTemperature: "C",
    } satisfies Units,
  },
  {
    label: "Mixed units",
    solveFor: "finalVolume" as const,
    values: {
      initialVolume: "1.5",
      initialTemperature: "77",
      finalVolume: "",
      finalTemperature: "373.15",
    },
    units: {
      initialVolume: "L",
      initialTemperature: "F",
      finalVolume: "mL",
      finalTemperature: "K",
    } satisfies Units,
  },
] as const;

function displayVolumeUnit(unit: GasVolumeUnit): string {
  return unit === "m3" ? "m³" : unit;
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
  variable: CharlesLawVariable,
  units: Units,
): string {
  if (
    variable === "initialVolume" ||
    variable === "finalVolume"
  ) {
    return displayVolumeUnit(
      units[variable] as GasVolumeUnit,
    );
  }

  return displayTemperatureUnit(
    units[variable] as TemperatureUnit,
  );
}

export function CharlesLawCalculator() {
  const [solveFor, setSolveFor] =
    useState<CharlesLawVariable>("finalVolume");
  const [values, setValues] =
    useState<Values>(emptyValues);
  const [units, setUnits] =
    useState<Units>(defaultUnits);
  const [result, setResult] =
    useState<CharlesLawResult | null>(null);
  const [error, setError] = useState("");

  function clearFeedback() {
    setResult(null);
    setError("");
  }

  function updateValue(
    variable: CharlesLawVariable,
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
    variable: CharlesLawVariable,
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
      Record<CharlesLawVariable, number>
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
      const calculationResult = calculateCharlesLaw({
        initialVolume: numericValues.initialVolume,
        initialVolumeUnit: units.initialVolume,
        initialTemperature:
          numericValues.initialTemperature,
        initialTemperatureUnit:
          units.initialTemperature,
        finalVolume: numericValues.finalVolume,
        finalVolumeUnit: units.finalVolume,
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
            <h2>Solve Charles&apos;s law</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="charles-law-solve-for">
              Calculate which value?
            </label>

            <select
              id="charles-law-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target.value as CharlesLawVariable,
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
                <label htmlFor={`charles-law-${field.key}`}>
                  {field.label} ({field.symbol})
                </label>

                <div className="input-with-suffix">
                  <input
                    id={`charles-law-${field.key}`}
                    name={field.key}
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min={
                      field.quantity === "volume"
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
                    aria-describedby={`charles-law-${field.key}-help`}
                  />

                  {renderUnitControl(field)}
                </div>

                <p id={`charles-law-${field.key}-help`}>
                  {isSolvedField
                    ? "This is the value being calculated."
                    : field.description}
                </p>
              </div>
            );
          })}
        </div>

        <p className="calculator-unit-note">
          Charles&apos;s law assumes a fixed amount of gas
          at constant pressure. Temperatures are converted
          internally to Kelvin and must remain above
          absolute zero.
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
              Check: V₁ ÷ T₁ and V₂ ÷ T₂ are equal after
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
