"use client";

import { useState, type FormEvent } from "react";

import {
  calculateGrahamsLaw,
  type GrahamsLawDetails,
  type GrahamsLawMode,
  type GrahamsLawRateVariable,
  type GrahamsLawTimeVariable,
  type GrahamsLawVariable,
  type TimeUnit,
} from "@/lib/calculators/grahams-law";
import type { CalculationResult } from "@/types/calculator";

type GrahamsLawResult =
  CalculationResult<GrahamsLawDetails>;

type Values = Record<GrahamsLawVariable, string>;

type TimeUnits = {
  gas1Time: TimeUnit;
  gas2Time: TimeUnit;
  outputTime: TimeUnit;
};

type RateField = {
  key: GrahamsLawRateVariable;
  label: string;
  symbol: string;
  description: string;
  quantity: "rate" | "molarMass";
};

type TimeField = {
  key: GrahamsLawTimeVariable;
  label: string;
  symbol: string;
  description: string;
  quantity: "time" | "molarMass";
};

const rateFields: readonly RateField[] = [
  {
    key: "gas1Rate",
    label: "Gas 1 rate",
    symbol: "r₁",
    description:
      "The diffusion or effusion rate of the first gas.",
    quantity: "rate",
  },
  {
    key: "gas2Rate",
    label: "Gas 2 rate",
    symbol: "r₂",
    description:
      "The diffusion or effusion rate of the second gas.",
    quantity: "rate",
  },
  {
    key: "gas1MolarMass",
    label: "Gas 1 molar mass",
    symbol: "M₁",
    description: "The molar mass of the first gas.",
    quantity: "molarMass",
  },
  {
    key: "gas2MolarMass",
    label: "Gas 2 molar mass",
    symbol: "M₂",
    description: "The molar mass of the second gas.",
    quantity: "molarMass",
  },
];

const timeFields: readonly TimeField[] = [
  {
    key: "gas1Time",
    label: "Gas 1 time",
    symbol: "t₁",
    description:
      "The time required for the first gas to effuse.",
    quantity: "time",
  },
  {
    key: "gas2Time",
    label: "Gas 2 time",
    symbol: "t₂",
    description:
      "The time required for the second gas to effuse.",
    quantity: "time",
  },
  {
    key: "gas1MolarMass",
    label: "Gas 1 molar mass",
    symbol: "M₁",
    description: "The molar mass of the first gas.",
    quantity: "molarMass",
  },
  {
    key: "gas2MolarMass",
    label: "Gas 2 molar mass",
    symbol: "M₂",
    description: "The molar mass of the second gas.",
    quantity: "molarMass",
  },
];

const variableLabels: Record<
  GrahamsLawVariable,
  string
> = {
  gas1Rate: "Gas 1 rate",
  gas2Rate: "Gas 2 rate",
  gas1Time: "Gas 1 time",
  gas2Time: "Gas 2 time",
  gas1MolarMass: "Gas 1 molar mass",
  gas2MolarMass: "Gas 2 molar mass",
};

const emptyValues: Values = {
  gas1Rate: "",
  gas2Rate: "",
  gas1Time: "",
  gas2Time: "",
  gas1MolarMass: "",
  gas2MolarMass: "",
};

const defaultTimeUnits: TimeUnits = {
  gas1Time: "s",
  gas2Time: "s",
  outputTime: "s",
};

const timeUnitOptions: readonly {
  value: TimeUnit;
  label: string;
}[] = [
  { value: "s", label: "seconds" },
  { value: "min", label: "minutes" },
  { value: "h", label: "hours" },
];

const examples = [
  {
    label: "Hydrogen vs oxygen",
    mode: "rate" as const,
    solveFor: "gas1Rate" as const,
    values: {
      ...emptyValues,
      gas2Rate: "1",
      gas1MolarMass: "2.016",
      gas2MolarMass: "32",
    },
    timeUnits: defaultTimeUnits,
  },
  {
    label: "Find molar mass",
    mode: "rate" as const,
    solveFor: "gas2MolarMass" as const,
    values: {
      ...emptyValues,
      gas1Rate: "4",
      gas2Rate: "1",
      gas1MolarMass: "4",
    },
    timeUnits: defaultTimeUnits,
  },
  {
    label: "Compare effusion times",
    mode: "time" as const,
    solveFor: "gas2Time" as const,
    values: {
      ...emptyValues,
      gas1Time: "1",
      gas1MolarMass: "4",
      gas2MolarMass: "64",
    },
    timeUnits: {
      gas1Time: "min" as const,
      gas2Time: "min" as const,
      outputTime: "min" as const,
    },
  },
] as const;

function isTimeVariable(
  variable: GrahamsLawVariable,
): variable is "gas1Time" | "gas2Time" {
  return variable === "gas1Time" ||
    variable === "gas2Time";
}

export function GrahamsLawCalculator() {
  const [mode, setMode] =
    useState<GrahamsLawMode>("rate");
  const [solveFor, setSolveFor] =
    useState<GrahamsLawVariable>("gas1Rate");
  const [values, setValues] =
    useState<Values>(emptyValues);
  const [timeUnits, setTimeUnits] =
    useState<TimeUnits>(defaultTimeUnits);
  const [result, setResult] =
    useState<GrahamsLawResult | null>(null);
  const [error, setError] = useState("");

  const activeFields =
    mode === "rate" ? rateFields : timeFields;

  function clearFeedback() {
    setResult(null);
    setError("");
  }

  function changeMode(nextMode: GrahamsLawMode) {
    setMode(nextMode);
    setSolveFor(
      nextMode === "rate" ? "gas1Rate" : "gas1Time",
    );
    setValues({ ...emptyValues });
    setTimeUnits({ ...defaultTimeUnits });
    clearFeedback();
  }

  function changeSolveFor(
    variable: GrahamsLawVariable,
  ) {
    setSolveFor(variable);
    setValues((current) => ({
      ...current,
      [variable]: "",
    }));
    clearFeedback();
  }

  function updateValue(
    variable: GrahamsLawVariable,
    value: string,
  ) {
    setValues((current) => ({
      ...current,
      [variable]: value,
    }));
    clearFeedback();
  }

  function updateTimeUnit(
    variable: keyof TimeUnits,
    unit: TimeUnit,
  ) {
    setTimeUnits((current) => ({
      ...current,
      [variable]: unit,
    }));
    clearFeedback();
  }

  function readValue(
    variable: GrahamsLawVariable,
  ): number | undefined {
    if (variable === solveFor) {
      return undefined;
    }

    const rawValue = values[variable];
    const numericValue = Number(rawValue);

    if (
      rawValue.trim() === "" ||
      !Number.isFinite(numericValue)
    ) {
      throw new Error(
        `Enter a valid ${variableLabels[
          variable
        ].toLowerCase()}.`,
      );
    }

    return numericValue;
  }

  function calculate(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    clearFeedback();

    try {
      const calculationResult =
        mode === "rate"
          ? calculateGrahamsLaw({
              mode: "rate",
              gas1Rate: readValue("gas1Rate"),
              gas2Rate: readValue("gas2Rate"),
              gas1MolarMass: readValue(
                "gas1MolarMass",
              ),
              gas2MolarMass: readValue(
                "gas2MolarMass",
              ),
              solveFor:
                solveFor as GrahamsLawRateVariable,
            })
          : calculateGrahamsLaw({
              mode: "time",
              gas1Time: readValue("gas1Time"),
              gas1TimeUnit: timeUnits.gas1Time,
              gas2Time: readValue("gas2Time"),
              gas2TimeUnit: timeUnits.gas2Time,
              outputTimeUnit: timeUnits.outputTime,
              gas1MolarMass: readValue(
                "gas1MolarMass",
              ),
              gas2MolarMass: readValue(
                "gas2MolarMass",
              ),
              solveFor:
                solveFor as GrahamsLawTimeVariable,
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
    setMode(example.mode);
    setSolveFor(example.solveFor);
    setValues({ ...example.values });
    setTimeUnits({ ...example.timeUnits });
    clearFeedback();
  }

  function resetCalculator() {
    setMode("rate");
    setSolveFor("gas1Rate");
    setValues({ ...emptyValues });
    setTimeUnits({ ...defaultTimeUnits });
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
              Compare two gases
            </p>
            <h2>Solve Graham&apos;s law</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field">
            <label htmlFor="grahams-law-mode">
              Calculation mode
            </label>

            <select
              id="grahams-law-mode"
              value={mode}
              onChange={(event) =>
                changeMode(
                  event.target.value as GrahamsLawMode,
                )
              }
            >
              <option value="rate">
                Diffusion or effusion rate
              </option>
              <option value="time">
                Effusion time
              </option>
            </select>
          </div>

          <div className="form-field dilution-solve-field">
            <label htmlFor="grahams-law-solve-for">
              Calculate which value?
            </label>

            <select
              id="grahams-law-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as GrahamsLawVariable,
                )
              }
            >
              {activeFields.map((field) => (
                <option
                  key={field.key}
                  value={field.key}
                >
                  {field.label} ({field.symbol})
                </option>
              ))}
            </select>
          </div>

          {mode === "time" && (
            <div className="form-field">
              <label htmlFor="grahams-law-output-unit">
                Time result unit
              </label>

              <select
                id="grahams-law-output-unit"
                value={timeUnits.outputTime}
                onChange={(event) =>
                  updateTimeUnit(
                    "outputTime",
                    event.target.value as TimeUnit,
                  )
                }
              >
                {timeUnitOptions.map((unit) => (
                  <option
                    key={unit.value}
                    value={unit.value}
                  >
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="density-fields">
          {activeFields.map((field) => {
            const isSolvedField =
              field.key === solveFor;
            const timeVariable =
              isTimeVariable(field.key)
                ? field.key
                : null;

            return (
              <div
                className="form-field"
                key={field.key}
              >
                <label
                  htmlFor={`grahams-law-${field.key}`}
                >
                  {field.label} ({field.symbol})
                </label>

                <div className="input-with-suffix">
                  <input
                    id={`grahams-law-${field.key}`}
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min="0"
                    value={values[field.key]}
                    onChange={(event) =>
                      updateValue(
                        field.key,
                        event.target.value,
                      )
                    }
                    disabled={isSolvedField}
                    placeholder={
                      isSolvedField
                        ? "Calculated automatically"
                        : field.quantity === "molarMass"
                          ? "28.01"
                          : "1"
                    }
                  />

                  {timeVariable ? (
                    <select
                      aria-label={`${field.label} unit`}
                      value={timeUnits[timeVariable]}
                      onChange={(event) =>
                        updateTimeUnit(
                          timeVariable,
                          event.target
                            .value as TimeUnit,
                        )
                      }
                      disabled={isSolvedField}
                    >
                      {timeUnitOptions.map((unit) => (
                        <option
                          key={unit.value}
                          value={unit.value}
                        >
                          {unit.value}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span>
                      {field.quantity === "molarMass"
                        ? "g/mol"
                        : "relative rate"}
                    </span>
                  )}
                </div>

                <p className="form-field__hint">
                  {isSolvedField
                    ? "This value will be calculated."
                    : field.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="calculator-actions">
          <button
            className="calculator-primary-button"
            type="submit"
          >
            Calculate {variableLabels[solveFor]}
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
        </div>
      </form>

      <aside
        className="calculator-result-card"
        aria-live="polite"
      >
        {result ? (
          <>
            <p className="calculator-result-card__eyebrow">
              Result
            </p>

            <h2>{variableLabels[solveFor]}</h2>

            <p className="calculator-result-card__value">
              {result.formattedValue}
            </p>

            <div className="calculator-result__formula">
              {result.details.formula}
            </div>

            <dl className="calculator-result-card__details">
              <div>
                <dt>Calculation mode</dt>
                <dd>
                  {result.details.mode === "rate"
                    ? "Rate comparison"
                    : "Effusion time"}
                </dd>
              </div>

              <div>
                <dt>Rate ratio (r₁/r₂)</dt>
                <dd>
                  {result.details.rateRatio.toPrecision(6)}
                </dd>
              </div>

              <div>
                <dt>Time ratio (t₁/t₂)</dt>
                <dd>
                  {result.details.timeRatio.toPrecision(6)}
                </dd>
              </div>

              <div>
                <dt>Gas 1 molar mass</dt>
                <dd>
                  {result.details.gas1MolarMass.toPrecision(
                    6,
                  )}{" "}
                  g/mol
                </dd>
              </div>

              <div>
                <dt>Gas 2 molar mass</dt>
                <dd>
                  {result.details.gas2MolarMass.toPrecision(
                    6,
                  )}{" "}
                  g/mol
                </dd>
              </div>
            </dl>

            <p className="calculator-result__note">
              The lighter gas diffuses or effuses faster
              under the same temperature and pressure
              conditions.
            </p>
          </>
        ) : (
          <>
            <p className="calculator-result-card__eyebrow">
              Graham&apos;s law
            </p>

            <h2>Ready to calculate</h2>

            <p>
              Choose rate or time mode, select the unknown
              value, and enter the other three positive
              values.
            </p>

            <div className="calculator-result__formula">
              r₁/r₂ = √(M₂/M₁)
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
