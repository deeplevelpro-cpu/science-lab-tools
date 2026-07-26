"use client";

import { useState, type FormEvent } from "react";

import {
  calculateCombinedGasLaw,
  type CombinedGasLawDetails,
  type CombinedGasLawVariable,
} from "@/lib/calculators/combined-gas-law";
import {
  type GasVolumeUnit,
  type PressureUnit,
  type TemperatureUnit,
} from "@/lib/calculators/ideal-gas-law";
import type { CalculationResult } from "@/types/calculator";

type CombinedGasLawResult =
  CalculationResult<CombinedGasLawDetails>;

type Values = Record<CombinedGasLawVariable, string>;

type Units = {
  initialPressure: PressureUnit;
  initialVolume: GasVolumeUnit;
  initialTemperature: TemperatureUnit;
  finalPressure: PressureUnit;
  finalVolume: GasVolumeUnit;
  finalTemperature: TemperatureUnit;
};

const fields = [
  {
    key: "initialPressure",
    label: "Initial pressure",
    symbol: "P₁",
    quantity: "pressure",
  },
  {
    key: "initialVolume",
    label: "Initial volume",
    symbol: "V₁",
    quantity: "volume",
  },
  {
    key: "initialTemperature",
    label: "Initial temperature",
    symbol: "T₁",
    quantity: "temperature",
  },
  {
    key: "finalPressure",
    label: "Final pressure",
    symbol: "P₂",
    quantity: "pressure",
  },
  {
    key: "finalVolume",
    label: "Final volume",
    symbol: "V₂",
    quantity: "volume",
  },
  {
    key: "finalTemperature",
    label: "Final temperature",
    symbol: "T₂",
    quantity: "temperature",
  },
] as const;

const variableLabels: Record<
  CombinedGasLawVariable,
  string
> = {
  initialPressure: "Initial pressure",
  initialVolume: "Initial volume",
  initialTemperature: "Initial temperature",
  finalPressure: "Final pressure",
  finalVolume: "Final volume",
  finalTemperature: "Final temperature",
};

const emptyValues: Values = {
  initialPressure: "",
  initialVolume: "",
  initialTemperature: "",
  finalPressure: "",
  finalVolume: "",
  finalTemperature: "",
};

const defaultUnits: Units = {
  initialPressure: "atm",
  initialVolume: "L",
  initialTemperature: "K",
  finalPressure: "atm",
  finalVolume: "L",
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
    label: "Gas expansion",
    solveFor: "finalVolume" as const,
    values: {
      initialPressure: "1",
      initialVolume: "2",
      initialTemperature: "300",
      finalPressure: "0.8",
      finalVolume: "",
      finalTemperature: "450",
    },
    units: {
      initialPressure: "atm",
      initialVolume: "L",
      initialTemperature: "K",
      finalPressure: "atm",
      finalVolume: "L",
      finalTemperature: "K",
    } satisfies Units,
  },
  {
    label: "Find final pressure",
    solveFor: "finalPressure" as const,
    values: {
      initialPressure: "101.325",
      initialVolume: "2",
      initialTemperature: "25",
      finalPressure: "",
      finalVolume: "1.5",
      finalTemperature: "100",
    },
    units: {
      initialPressure: "kPa",
      initialVolume: "L",
      initialTemperature: "C",
      finalPressure: "kPa",
      finalVolume: "L",
      finalTemperature: "C",
    } satisfies Units,
  },
  {
    label: "Mixed units",
    solveFor: "finalTemperature" as const,
    values: {
      initialPressure: "760",
      initialVolume: "2000",
      initialTemperature: "26.85",
      finalPressure: "2",
      finalVolume: "0.003",
      finalTemperature: "",
    },
    units: {
      initialPressure: "mmHg",
      initialVolume: "mL",
      initialTemperature: "C",
      finalPressure: "atm",
      finalVolume: "m3",
      finalTemperature: "F",
    } satisfies Units,
  },
] as const;

function displayUnit(
  variable: CombinedGasLawVariable,
  units: Units,
): string {
  const unit = units[variable];

  if (unit === "m3") {
    return "m³";
  }

  if (unit === "C" || unit === "F") {
    return `°${unit}`;
  }

  return unit;
}

export function CombinedGasLawCalculator() {
  const [solveFor, setSolveFor] =
    useState<CombinedGasLawVariable>("finalPressure");
  const [values, setValues] =
    useState<Values>(emptyValues);
  const [units, setUnits] =
    useState<Units>(defaultUnits);
  const [result, setResult] =
    useState<CombinedGasLawResult | null>(null);
  const [error, setError] = useState("");

  function clearFeedback() {
    setResult(null);
    setError("");
  }

  function updateValue(
    variable: CombinedGasLawVariable,
    value: string,
  ) {
    setValues((current) => ({
      ...current,
      [variable]: value,
    }));
    clearFeedback();
  }

  function updateUnit(
    variable: CombinedGasLawVariable,
    unit: PressureUnit | GasVolumeUnit | TemperatureUnit,
  ) {
    setUnits(
      (current) =>
        ({
          ...current,
          [variable]: unit,
        }) as Units,
    );
    clearFeedback();
  }

  function changeSolveFor(
    variable: CombinedGasLawVariable,
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
      Record<CombinedGasLawVariable, number>
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
      const calculationResult = calculateCombinedGasLaw({
        initialPressure: numericValues.initialPressure,
        initialPressureUnit: units.initialPressure,
        initialVolume: numericValues.initialVolume,
        initialVolumeUnit: units.initialVolume,
        initialTemperature:
          numericValues.initialTemperature,
        initialTemperatureUnit:
          units.initialTemperature,
        finalPressure: numericValues.finalPressure,
        finalPressureUnit: units.finalPressure,
        finalVolume: numericValues.finalVolume,
        finalVolumeUnit: units.finalVolume,
        finalTemperature: numericValues.finalTemperature,
        finalTemperatureUnit: units.finalTemperature,
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
    setValues(emptyValues);
    setUnits(defaultUnits);
    clearFeedback();
  }

  function renderUnitControl(
    field: (typeof fields)[number],
  ) {
    if (field.quantity === "pressure") {
      return (
        <select
          aria-label={`${field.label} unit`}
          value={units[field.key]}
          onChange={(event) =>
            updateUnit(
              field.key,
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

    if (field.quantity === "volume") {
      return (
        <select
          aria-label={`${field.label} unit`}
          value={units[field.key]}
          onChange={(event) =>
            updateUnit(
              field.key,
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
      <select
        aria-label={`${field.label} unit`}
        value={units[field.key]}
        onChange={(event) =>
          updateUnit(
            field.key,
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
              Enter five known values
            </p>
            <h2>Solve the combined gas law</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="combined-gas-solve-for">
              Calculate which value?
            </label>

            <select
              id="combined-gas-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as CombinedGasLawVariable,
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
                  htmlFor={`combined-gas-${field.key}`}
                >
                  {field.label} ({field.symbol})
                </label>

                <div className="input-with-suffix">
                  <input
                    id={`combined-gas-${field.key}`}
                    name={field.key}
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min={
                      field.quantity === "temperature"
                        ? undefined
                        : "0"
                    }
                    placeholder={
                      isSolvedField
                        ? "Calculated automatically"
                        : "Enter value"
                    }
                    value={values[field.key]}
                    disabled={isSolvedField}
                    aria-describedby={
                      isSolvedField
                        ? `combined-gas-${field.key}-hint`
                        : undefined
                    }
                    onChange={(event) =>
                      updateValue(
                        field.key,
                        event.target.value,
                      )
                    }
                  />

                  {renderUnitControl(field)}
                </div>

                {isSolvedField ? (
                  <p
                    id={`combined-gas-${field.key}-hint`}
                    className="form-field__hint"
                  >
                    This value will be calculated.
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="calculator-actions">
          <button
            className="primary-button"
            type="submit"
          >
            Calculate {variableLabels[solveFor]}
          </button>

          <button
            className="secondary-button"
            type="button"
            onClick={resetCalculator}
          >
            Reset
          </button>
        </div>

        {error ? (
          <p className="calculator-error" role="alert">
            {error}
          </p>
        ) : null}
      </form>

      <aside
        className="calculator-result"
        aria-live="polite"
      >
        <p className="calculator-result__eyebrow">
          Result
        </p>

        {result ? (
          <>
            <h2>{variableLabels[solveFor]}</h2>
            <p className="calculator-result__value">
              {result.formattedValue}
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Rearranged formula</dt>
                <dd>{result.details.formula}</dd>
              </div>

              <div>
                <dt>Initial state ratio</dt>
                <dd>
                  {result.details
                    .initialPressureVolumeTemperatureRatio
                    .toExponential(6)}
                </dd>
              </div>

              <div>
                <dt>Final state ratio</dt>
                <dd>
                  {result.details
                    .finalPressureVolumeTemperatureRatio
                    .toExponential(6)}
                </dd>
              </div>

              <div>
                <dt>Output unit</dt>
                <dd>{displayUnit(solveFor, units)}</dd>
              </div>
            </dl>
          </>
        ) : (
          <>
            <h2>Your answer will appear here</h2>
            <p>
              Select the unknown variable, enter the
              other five values, and run the calculation.
            </p>
          </>
        )}
      </aside>

      <div className="calculator-examples">
        <div>
          <p className="calculator-form__label">
            Try an example
          </p>
          <h2>Load realistic gas-law values</h2>
        </div>

        <div className="calculator-example-buttons">
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
      </div>
    </div>
  );
}
