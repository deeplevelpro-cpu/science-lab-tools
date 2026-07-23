"use client";

import { useState, type FormEvent } from "react";

import {
  calculateIdealGasLaw,
  type GasVolumeUnit,
  type IdealGasLawDetails,
  type IdealGasVariable,
  type PressureUnit,
  type TemperatureUnit,
} from "@/lib/calculators/ideal-gas-law";
import type { CalculationResult } from "@/types/calculator";

type IdealGasLawResult =
  CalculationResult<IdealGasLawDetails>;

type Values = Record<IdealGasVariable, string>;

const fields = [
  {
    key: "pressure",
    label: "Pressure",
    symbol: "P",
    description: "The pressure exerted by the gas.",
  },
  {
    key: "volume",
    label: "Volume",
    symbol: "V",
    description: "The volume occupied by the gas.",
  },
  {
    key: "moles",
    label: "Amount of gas",
    symbol: "n",
    description: "The amount of gas in moles.",
  },
  {
    key: "temperature",
    label: "Temperature",
    symbol: "T",
    description: "The absolute temperature of the gas.",
  },
] as const;

const variableLabels: Record<IdealGasVariable, string> = {
  pressure: "Pressure",
  volume: "Volume",
  moles: "Amount of gas",
  temperature: "Temperature",
};

const emptyValues: Values = {
  pressure: "",
  volume: "",
  moles: "",
  temperature: "",
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
    label: "Standard conditions",
    solveFor: "pressure" as const,
    values: {
      pressure: "",
      volume: "22.414",
      moles: "1",
      temperature: "273.15",
    },
    pressureUnit: "atm" as const,
    volumeUnit: "L" as const,
    temperatureUnit: "K" as const,
  },
  {
    label: "Find volume",
    solveFor: "volume" as const,
    values: {
      pressure: "1",
      volume: "",
      moles: "1",
      temperature: "25",
    },
    pressureUnit: "atm" as const,
    volumeUnit: "L" as const,
    temperatureUnit: "C" as const,
  },
  {
    label: "Find moles",
    solveFor: "moles" as const,
    values: {
      pressure: "101.325",
      volume: "24.465",
      moles: "",
      temperature: "25",
    },
    pressureUnit: "kPa" as const,
    volumeUnit: "L" as const,
    temperatureUnit: "C" as const,
  },
] as const;

function unitLabel(
  variable: IdealGasVariable,
  pressureUnit: PressureUnit,
  volumeUnit: GasVolumeUnit,
  temperatureUnit: TemperatureUnit,
) {
  if (variable === "pressure") {
    return pressureUnit;
  }

  if (variable === "volume") {
    return volumeUnit === "m3" ? "m³" : volumeUnit;
  }

  if (variable === "temperature") {
    return temperatureUnit === "C"
      ? "°C"
      : temperatureUnit === "F"
        ? "°F"
        : "K";
  }

  return "mol";
}

export function IdealGasLawCalculator() {
  const [solveFor, setSolveFor] =
    useState<IdealGasVariable>("pressure");
  const [values, setValues] =
    useState<Values>(emptyValues);
  const [pressureUnit, setPressureUnit] =
    useState<PressureUnit>("atm");
  const [volumeUnit, setVolumeUnit] =
    useState<GasVolumeUnit>("L");
  const [temperatureUnit, setTemperatureUnit] =
    useState<TemperatureUnit>("K");
  const [result, setResult] =
    useState<IdealGasLawResult | null>(null);
  const [error, setError] = useState("");

  function updateValue(
    variable: IdealGasVariable,
    value: string,
  ) {
    setValues((current) => ({
      ...current,
      [variable]: value,
    }));
    setResult(null);
    setError("");
  }

  function changeSolveFor(variable: IdealGasVariable) {
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
      Record<IdealGasVariable, number>
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
      const calculationResult = calculateIdealGasLaw({
        pressure: numericValues.pressure,
        pressureUnit,
        volume: numericValues.volume,
        volumeUnit,
        moles: numericValues.moles,
        temperature: numericValues.temperature,
        temperatureUnit,
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
    setPressureUnit(example.pressureUnit);
    setVolumeUnit(example.volumeUnit);
    setTemperatureUnit(example.temperatureUnit);
    setResult(null);
    setError("");
  }

  function resetCalculator() {
    setSolveFor("pressure");
    setValues(emptyValues);
    setPressureUnit("atm");
    setVolumeUnit("L");
    setTemperatureUnit("K");
    setResult(null);
    setError("");
  }

  function renderUnitControl(
    variable: IdealGasVariable,
  ) {
    if (variable === "pressure") {
      return (
        <select
          aria-label="Pressure unit"
          value={pressureUnit}
          onChange={(event) => {
            setPressureUnit(
              event.target.value as PressureUnit,
            );
            setResult(null);
          }}
        >
          {pressureUnits.map((unit) => (
            <option key={unit.value} value={unit.value}>
              {unit.label}
            </option>
          ))}
        </select>
      );
    }

    if (variable === "volume") {
      return (
        <select
          aria-label="Volume unit"
          value={volumeUnit}
          onChange={(event) => {
            setVolumeUnit(
              event.target.value as GasVolumeUnit,
            );
            setResult(null);
          }}
        >
          {volumeUnits.map((unit) => (
            <option key={unit.value} value={unit.value}>
              {unit.label}
            </option>
          ))}
        </select>
      );
    }

    if (variable === "temperature") {
      return (
        <select
          aria-label="Temperature unit"
          value={temperatureUnit}
          onChange={(event) => {
            setTemperatureUnit(
              event.target.value as TemperatureUnit,
            );
            setResult(null);
          }}
        >
          {temperatureUnits.map((unit) => (
            <option key={unit.value} value={unit.value}>
              {unit.label}
            </option>
          ))}
        </select>
      );
    }

    return <span>mol</span>;
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
            <h2>Solve the ideal gas law</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="ideal-gas-solve-for">
              Calculate which value?
            </label>

            <select
              id="ideal-gas-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target.value as IdealGasVariable,
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
                <label htmlFor={`ideal-gas-${field.key}`}>
                  {field.label} ({field.symbol})
                </label>

                <div className="input-with-suffix">
                  <input
                    id={`ideal-gas-${field.key}`}
                    name={field.key}
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min={
                      field.key === "temperature"
                        ? undefined
                        : "0"
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
                    aria-describedby={`ideal-gas-${field.key}-help`}
                  />

                  {renderUnitControl(field.key)}
                </div>

                <p id={`ideal-gas-${field.key}-help`}>
                  {isSolvedField
                    ? "This is the value being calculated."
                    : field.description}
                </p>
              </div>
            );
          })}
        </div>

        <p className="calculator-unit-note">
          All values are converted internally to SI units.
          Temperature must remain above absolute zero.
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
                <dt>Pressure</dt>
                <dd>
                  {result.details.pressure}{" "}
                  {unitLabel(
                    "pressure",
                    pressureUnit,
                    volumeUnit,
                    temperatureUnit,
                  )}
                </dd>
              </div>

              <div>
                <dt>Volume</dt>
                <dd>
                  {result.details.volume}{" "}
                  {unitLabel(
                    "volume",
                    pressureUnit,
                    volumeUnit,
                    temperatureUnit,
                  )}
                </dd>
              </div>

              <div>
                <dt>Amount</dt>
                <dd>{result.details.moles} mol</dd>
              </div>

              <div>
                <dt>Temperature</dt>
                <dd>
                  {result.details.temperature}{" "}
                  {unitLabel(
                    "temperature",
                    pressureUnit,
                    volumeUnit,
                    temperatureUnit,
                  )}
                </dd>
              </div>
            </dl>
          </>
        ) : (
          <>
            <p className="calculator-result__eyebrow">
              Result
            </p>
            <h2>Your result will appear here</h2>
            <p>
              Select the variable to calculate, enter the
              other three values, and choose their units.
            </p>
          </>
        )}
      </section>
    </div>
  );
}
