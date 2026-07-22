"use client";

import {
  type FormEvent,
  useState,
} from "react";

import {
  calculateLimitingReactant,
  type LimitingReactantUnit,
} from "@/lib/calculators/limiting-reactant";

type CalculatorResult = ReturnType<
  typeof calculateLimitingReactant
>;

type FormValues = {
  reactantAName: string;
  reactantAAmount: string;
  reactantAUnit: LimitingReactantUnit;
  reactantACoefficient: string;
  reactantAMolarMass: string;
  reactantBName: string;
  reactantBAmount: string;
  reactantBUnit: LimitingReactantUnit;
  reactantBCoefficient: string;
  reactantBMolarMass: string;
  productCoefficient: string;
  productUnit: LimitingReactantUnit;
  productMolarMass: string;
};

type Example = {
  label: string;
  values: FormValues;
};

const initialValues: FormValues = {
  reactantAName: "",
  reactantAAmount: "",
  reactantAUnit: "moles",
  reactantACoefficient: "",
  reactantAMolarMass: "",
  reactantBName: "",
  reactantBAmount: "",
  reactantBUnit: "moles",
  reactantBCoefficient: "",
  reactantBMolarMass: "",
  productCoefficient: "",
  productUnit: "moles",
  productMolarMass: "",
};

const examples: Example[] = [
  {
    label: "Hydrogen + oxygen",
    values: {
      reactantAName: "Hydrogen",
      reactantAAmount: "2",
      reactantAUnit: "moles",
      reactantACoefficient: "2",
      reactantAMolarMass: "",
      reactantBName: "Oxygen",
      reactantBAmount: "2",
      reactantBUnit: "moles",
      reactantBCoefficient: "1",
      reactantBMolarMass: "",
      productCoefficient: "2",
      productUnit: "moles",
      productMolarMass: "",
    },
  },
  {
    label: "Water in grams",
    values: {
      reactantAName: "Hydrogen",
      reactantAAmount: "4",
      reactantAUnit: "grams",
      reactantACoefficient: "2",
      reactantAMolarMass: "2.016",
      reactantBName: "Oxygen",
      reactantBAmount: "32",
      reactantBUnit: "grams",
      reactantBCoefficient: "1",
      reactantBMolarMass: "31.998",
      productCoefficient: "2",
      productUnit: "grams",
      productMolarMass: "18.015",
    },
  },
];

function parseRequiredNumber(
  value: string,
  label: string,
): number {
  if (value.trim() === "") {
    throw new Error(`${label} is required.`);
  }

  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue)) {
    throw new Error(`${label} must be a finite number.`);
  }

  return parsedValue;
}

function parseOptionalNumber(
  value: string,
): number | undefined {
  if (value.trim() === "") {
    return undefined;
  }

  return Number(value);
}

function formatDetail(value: number): string {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: 10,
  });
}

function getUnitLabel(
  unit: LimitingReactantUnit,
): string {
  return unit === "grams" ? "g" : "mol";
}

export function LimitingReactantCalculator() {
  const [values, setValues] =
    useState<FormValues>(initialValues);
  const [result, setResult] =
    useState<CalculatorResult | null>(null);
  const [error, setError] = useState("");

  function updateValue<Key extends keyof FormValues>(
    key: Key,
    value: FormValues[Key],
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }));
    setResult(null);
    setError("");
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      const calculatedResult =
        calculateLimitingReactant({
          reactantA: {
            name: values.reactantAName,
            amount: parseRequiredNumber(
              values.reactantAAmount,
              "Reactant A amount",
            ),
            unit: values.reactantAUnit,
            coefficient: parseRequiredNumber(
              values.reactantACoefficient,
              "Reactant A coefficient",
            ),
            molarMass: parseOptionalNumber(
              values.reactantAMolarMass,
            ),
          },
          reactantB: {
            name: values.reactantBName,
            amount: parseRequiredNumber(
              values.reactantBAmount,
              "Reactant B amount",
            ),
            unit: values.reactantBUnit,
            coefficient: parseRequiredNumber(
              values.reactantBCoefficient,
              "Reactant B coefficient",
            ),
            molarMass: parseOptionalNumber(
              values.reactantBMolarMass,
            ),
          },
          productCoefficient: parseRequiredNumber(
            values.productCoefficient,
            "Product coefficient",
          ),
          productUnit: values.productUnit,
          productMolarMass: parseOptionalNumber(
            values.productMolarMass,
          ),
        });

      setResult(calculatedResult);
      setError("");
    } catch (calculationError) {
      setResult(null);
      setError(
        calculationError instanceof Error
          ? calculationError.message
          : "The calculation could not be completed.",
      );
    }
  }

  function resetCalculator() {
    setValues(initialValues);
    setResult(null);
    setError("");
  }

  function loadExample(example: Example) {
    setValues(example.values);
    setResult(null);
    setError("");
  }

  return (
    <div className="calculator-panel">
      <form
        className="calculator-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="calculator-form__heading">
          <p className="calculator-form__label">
            Balanced reaction inputs
          </p>
          <h2>Find the limiting reactant</h2>
          <p>
            Enter two reactants and their coefficients from a
            balanced chemical equation.
          </p>
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="limiting-reactant-a-name">
              Reactant A name
            </label>
            <input
              id="limiting-reactant-a-name"
              type="text"
              placeholder="Example: Hydrogen"
              value={values.reactantAName}
              onChange={(event) =>
                updateValue(
                  "reactantAName",
                  event.target.value,
                )
              }
            />
          </div>

          <div className="form-field">
            <label htmlFor="limiting-reactant-a-amount">
              Reactant A amount
            </label>
            <input
              id="limiting-reactant-a-amount"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              placeholder="Example: 2"
              value={values.reactantAAmount}
              onChange={(event) =>
                updateValue(
                  "reactantAAmount",
                  event.target.value,
                )
              }
            />
          </div>

          <div className="form-field">
            <label htmlFor="limiting-reactant-a-unit">
              Reactant A unit
            </label>
            <select
              id="limiting-reactant-a-unit"
              value={values.reactantAUnit}
              onChange={(event) =>
                updateValue(
                  "reactantAUnit",
                  event.target
                    .value as LimitingReactantUnit,
                )
              }
            >
              <option value="moles">Moles (mol)</option>
              <option value="grams">Grams (g)</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="limiting-reactant-a-coefficient">
              Reactant A coefficient
            </label>
            <input
              id="limiting-reactant-a-coefficient"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              placeholder="Example: 2"
              value={values.reactantACoefficient}
              onChange={(event) =>
                updateValue(
                  "reactantACoefficient",
                  event.target.value,
                )
              }
            />
          </div>

          {values.reactantAUnit === "grams" ? (
            <div className="form-field">
              <label htmlFor="limiting-reactant-a-molar-mass">
                Reactant A molar mass
              </label>
              <div className="input-with-suffix">
                <input
                  id="limiting-reactant-a-molar-mass"
                  type="number"
                  inputMode="decimal"
                  step="any"
                  min="0"
                  placeholder="Example: 2.016"
                  value={values.reactantAMolarMass}
                  onChange={(event) =>
                    updateValue(
                      "reactantAMolarMass",
                      event.target.value,
                    )
                  }
                />
                <span>g/mol</span>
              </div>
            </div>
          ) : null}

          <div className="form-field">
            <label htmlFor="limiting-reactant-b-name">
              Reactant B name
            </label>
            <input
              id="limiting-reactant-b-name"
              type="text"
              placeholder="Example: Oxygen"
              value={values.reactantBName}
              onChange={(event) =>
                updateValue(
                  "reactantBName",
                  event.target.value,
                )
              }
            />
          </div>

          <div className="form-field">
            <label htmlFor="limiting-reactant-b-amount">
              Reactant B amount
            </label>
            <input
              id="limiting-reactant-b-amount"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              placeholder="Example: 1"
              value={values.reactantBAmount}
              onChange={(event) =>
                updateValue(
                  "reactantBAmount",
                  event.target.value,
                )
              }
            />
          </div>

          <div className="form-field">
            <label htmlFor="limiting-reactant-b-unit">
              Reactant B unit
            </label>
            <select
              id="limiting-reactant-b-unit"
              value={values.reactantBUnit}
              onChange={(event) =>
                updateValue(
                  "reactantBUnit",
                  event.target
                    .value as LimitingReactantUnit,
                )
              }
            >
              <option value="moles">Moles (mol)</option>
              <option value="grams">Grams (g)</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="limiting-reactant-b-coefficient">
              Reactant B coefficient
            </label>
            <input
              id="limiting-reactant-b-coefficient"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              placeholder="Example: 1"
              value={values.reactantBCoefficient}
              onChange={(event) =>
                updateValue(
                  "reactantBCoefficient",
                  event.target.value,
                )
              }
            />
          </div>

          {values.reactantBUnit === "grams" ? (
            <div className="form-field">
              <label htmlFor="limiting-reactant-b-molar-mass">
                Reactant B molar mass
              </label>
              <div className="input-with-suffix">
                <input
                  id="limiting-reactant-b-molar-mass"
                  type="number"
                  inputMode="decimal"
                  step="any"
                  min="0"
                  placeholder="Example: 31.998"
                  value={values.reactantBMolarMass}
                  onChange={(event) =>
                    updateValue(
                      "reactantBMolarMass",
                      event.target.value,
                    )
                  }
                />
                <span>g/mol</span>
              </div>
            </div>
          ) : null}

          <div className="form-field">
            <label htmlFor="limiting-product-coefficient">
              Product coefficient
            </label>
            <input
              id="limiting-product-coefficient"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              placeholder="Example: 2"
              value={values.productCoefficient}
              onChange={(event) =>
                updateValue(
                  "productCoefficient",
                  event.target.value,
                )
              }
            />
          </div>

          <div className="form-field">
            <label htmlFor="limiting-product-unit">
              Product result unit
            </label>
            <select
              id="limiting-product-unit"
              value={values.productUnit}
              onChange={(event) =>
                updateValue(
                  "productUnit",
                  event.target
                    .value as LimitingReactantUnit,
                )
              }
            >
              <option value="moles">Moles (mol)</option>
              <option value="grams">Grams (g)</option>
            </select>
          </div>

          {values.productUnit === "grams" ? (
            <div className="form-field">
              <label htmlFor="limiting-product-molar-mass">
                Product molar mass
              </label>
              <div className="input-with-suffix">
                <input
                  id="limiting-product-molar-mass"
                  type="number"
                  inputMode="decimal"
                  step="any"
                  min="0"
                  placeholder="Example: 18.015"
                  value={values.productMolarMass}
                  onChange={(event) =>
                    updateValue(
                      "productMolarMass",
                      event.target.value,
                    )
                  }
                />
                <span>g/mol</span>
              </div>
            </div>
          ) : null}
        </div>

        <p className="calculator-unit-note">
          Use coefficients from a balanced equation. Molar
          masses are required whenever an amount is entered or
          requested in grams.
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
            Find limiting reactant
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
            <p className="calculator-result__label">
              Limiting reactant
            </p>

            <p className="calculator-result__value">
              {result.details.limitingReactantName}
            </p>

            <p className="calculator-result__summary">
              Product yield:{" "}
              <strong>
                {result.formattedValue}{" "}
                {getUnitLabel(result.details.productUnit)}
              </strong>
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Reactant A available</dt>
                <dd>
                  {formatDetail(
                    result.details.reactantAMoles,
                  )}{" "}
                  mol
                </dd>
              </div>

              <div>
                <dt>Reactant B available</dt>
                <dd>
                  {formatDetail(
                    result.details.reactantBMoles,
                  )}{" "}
                  mol
                </dd>
              </div>

              <div>
                <dt>Excess reactant</dt>
                <dd>{result.details.excessReactantName}</dd>
              </div>

              <div>
                <dt>Excess remaining</dt>
                <dd>
                  {formatDetail(
                    result.details.excessMolesRemaining,
                  )}{" "}
                  mol
                </dd>
              </div>

              <div>
                <dt>Product amount</dt>
                <dd>
                  {formatDetail(
                    result.details.productAmount,
                  )}{" "}
                  {getUnitLabel(
                    result.details.productUnit,
                  )}
                </dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Formula used</h3>
              <p>{result.details.formula}</p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">LR</span>
            <h2>Your result will appear here</h2>
            <p>
              Enter both reactants and balanced-equation
              coefficients, then select calculate.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
