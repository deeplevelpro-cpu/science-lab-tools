"use client";

import { useState, type FormEvent } from "react";

import {
  calculateStoichiometry,
  type StoichiometryDetails,
  type StoichiometryUnit,
} from "@/lib/calculators/stoichiometry";
import type { CalculationResult } from "@/types/calculator";

type StoichiometryResult =
  CalculationResult<StoichiometryDetails>;

type FormValues = {
  knownAmount: string;
  knownCoefficient: string;
  targetCoefficient: string;
  knownMolarMass: string;
  targetMolarMass: string;
};

const emptyValues: FormValues = {
  knownAmount: "",
  knownCoefficient: "",
  targetCoefficient: "",
  knownMolarMass: "",
  targetMolarMass: "",
};

const examples = [
  {
    label: "Hydrogen to water",
    knownUnit: "grams" as const,
    targetUnit: "grams" as const,
    values: {
      knownAmount: "4.032",
      knownCoefficient: "2",
      targetCoefficient: "2",
      knownMolarMass: "2.016",
      targetMolarMass: "18.015",
    },
  },
  {
    label: "Mole ratio",
    knownUnit: "moles" as const,
    targetUnit: "moles" as const,
    values: {
      knownAmount: "2",
      knownCoefficient: "2",
      targetCoefficient: "1",
      knownMolarMass: "",
      targetMolarMass: "",
    },
  },
] as const;

function formatDetail(value: number): string {
  return Number(value.toPrecision(8)).toString();
}

export function StoichiometryCalculator() {
  const [knownUnit, setKnownUnit] =
    useState<StoichiometryUnit>("moles");

  const [targetUnit, setTargetUnit] =
    useState<StoichiometryUnit>("moles");

  const [values, setValues] =
    useState<FormValues>(emptyValues);

  const [result, setResult] =
    useState<StoichiometryResult | null>(null);

  const [error, setError] = useState("");

  function clearFeedback() {
    setResult(null);
    setError("");
  }

  function updateValue(
    field: keyof FormValues,
    value: string,
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
    clearFeedback();
  }

  function changeKnownUnit(unit: StoichiometryUnit) {
    setKnownUnit(unit);
    clearFeedback();
  }

  function changeTargetUnit(unit: StoichiometryUnit) {
    setTargetUnit(unit);
    clearFeedback();
  }

  function parseRequiredValue(
    field: keyof FormValues,
    label: string,
  ): number | null {
    const rawValue = values[field];
    const numericValue = Number(rawValue);

    if (
      rawValue.trim() === "" ||
      !Number.isFinite(numericValue)
    ) {
      setError(`Enter a valid ${label}.`);
      return null;
    }

    return numericValue;
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);

    const knownAmount = parseRequiredValue(
      "knownAmount",
      "known amount",
    );

    if (knownAmount === null) return;

    const knownCoefficient = parseRequiredValue(
      "knownCoefficient",
      "known substance coefficient",
    );

    if (knownCoefficient === null) return;

    const targetCoefficient = parseRequiredValue(
      "targetCoefficient",
      "target substance coefficient",
    );

    if (targetCoefficient === null) return;

    let knownMolarMass: number | undefined;

    if (knownUnit === "grams") {
      const parsedKnownMolarMass = parseRequiredValue(
        "knownMolarMass",
        "known substance molar mass",
      );

      if (parsedKnownMolarMass === null) return;
      knownMolarMass = parsedKnownMolarMass;
    }

    let targetMolarMass: number | undefined;

    if (targetUnit === "grams") {
      const parsedTargetMolarMass = parseRequiredValue(
        "targetMolarMass",
        "target substance molar mass",
      );

      if (parsedTargetMolarMass === null) return;
      targetMolarMass = parsedTargetMolarMass;
    }

    try {
      setResult(
        calculateStoichiometry({
          knownAmount,
          knownUnit,
          knownCoefficient,
          targetCoefficient,
          knownMolarMass,
          targetUnit,
          targetMolarMass,
        }),
      );
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
    setKnownUnit(example.knownUnit);
    setTargetUnit(example.targetUnit);
    setValues(example.values);
    setError("");

    setResult(
      calculateStoichiometry({
        knownAmount: Number(example.values.knownAmount),
        knownUnit: example.knownUnit,
        knownCoefficient: Number(
          example.values.knownCoefficient,
        ),
        targetCoefficient: Number(
          example.values.targetCoefficient,
        ),
        knownMolarMass:
          example.knownUnit === "grams"
            ? Number(example.values.knownMolarMass)
            : undefined,
        targetUnit: example.targetUnit,
        targetMolarMass:
          example.targetUnit === "grams"
            ? Number(example.values.targetMolarMass)
            : undefined,
      }),
    );
  }

  function resetCalculator() {
    setKnownUnit("moles");
    setTargetUnit("moles");
    setValues(emptyValues);
    setResult(null);
    setError("");
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
              Enter a balanced-equation ratio
            </p>
            <h2>Calculate a stoichiometric amount</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-fields">
          <div className="form-field">
            <label htmlFor="stoichiometry-known-amount">
              Known amount
            </label>

            <div className="input-with-unit">
              <input
                id="stoichiometry-known-amount"
                name="knownAmount"
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                placeholder="Example: 2"
                value={values.knownAmount}
                onChange={(event) =>
                  updateValue(
                    "knownAmount",
                    event.target.value,
                  )
                }
                aria-describedby="known-amount-help"
              />

              <select
                aria-label="Known amount unit"
                value={knownUnit}
                onChange={(event) =>
                  changeKnownUnit(
                    event.target.value as StoichiometryUnit,
                  )
                }
              >
                <option value="moles">mol</option>
                <option value="grams">g</option>
              </select>
            </div>

            <p id="known-amount-help">
              Available amount of the known substance.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="stoichiometry-known-coefficient">
              Known substance coefficient
            </label>

            <input
              id="stoichiometry-known-coefficient"
              name="knownCoefficient"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              placeholder="Example: 2"
              value={values.knownCoefficient}
              onChange={(event) =>
                updateValue(
                  "knownCoefficient",
                  event.target.value,
                )
              }
              aria-describedby="known-coefficient-help"
            />

            <p id="known-coefficient-help">
              Coefficient before the known substance.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="stoichiometry-target-coefficient">
              Target substance coefficient
            </label>

            <input
              id="stoichiometry-target-coefficient"
              name="targetCoefficient"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              placeholder="Example: 1"
              value={values.targetCoefficient}
              onChange={(event) =>
                updateValue(
                  "targetCoefficient",
                  event.target.value,
                )
              }
              aria-describedby="target-coefficient-help"
            />

            <p id="target-coefficient-help">
              Coefficient before the substance being calculated.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="stoichiometry-target-unit">
              Target result unit
            </label>

            <select
              id="stoichiometry-target-unit"
              value={targetUnit}
              onChange={(event) =>
                changeTargetUnit(
                  event.target.value as StoichiometryUnit,
                )
              }
              aria-describedby="target-unit-help"
            >
              <option value="moles">Moles (mol)</option>
              <option value="grams">Grams (g)</option>
            </select>

            <p id="target-unit-help">
              Choose whether the result should be moles or grams.
            </p>
          </div>

          {knownUnit === "grams" ? (
            <div className="form-field">
              <label htmlFor="stoichiometry-known-molar-mass">
                Known substance molar mass
              </label>

              <div className="input-with-suffix">
                <input
                  id="stoichiometry-known-molar-mass"
                  name="knownMolarMass"
                  type="number"
                  inputMode="decimal"
                  step="any"
                  min="0"
                  placeholder="Example: 2.016"
                  value={values.knownMolarMass}
                  onChange={(event) =>
                    updateValue(
                      "knownMolarMass",
                      event.target.value,
                    )
                  }
                  aria-describedby="known-molar-mass-help"
                />

                <span>g/mol</span>
              </div>

              <p id="known-molar-mass-help">
                Required to convert the known mass into moles.
              </p>
            </div>
          ) : null}

          {targetUnit === "grams" ? (
            <div className="form-field">
              <label htmlFor="stoichiometry-target-molar-mass">
                Target substance molar mass
              </label>

              <div className="input-with-suffix">
                <input
                  id="stoichiometry-target-molar-mass"
                  name="targetMolarMass"
                  type="number"
                  inputMode="decimal"
                  step="any"
                  min="0"
                  placeholder="Example: 18.015"
                  value={values.targetMolarMass}
                  onChange={(event) =>
                    updateValue(
                      "targetMolarMass",
                      event.target.value,
                    )
                  }
                  aria-describedby="target-molar-mass-help"
                />

                <span>g/mol</span>
              </div>

              <p id="target-molar-mass-help">
                Required to convert target moles into grams.
              </p>
            </div>
          ) : null}
        </div>

        <p className="calculator-unit-note">
          Use coefficients from a correctly balanced chemical
          equation. Molar masses must be entered in grams per mole.
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
            Calculate target amount
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
          result
            ? "calculator-result--complete"
            : ""
        }`}
        aria-live="polite"
        aria-atomic="true"
      >
        {result ? (
          <>
            <p className="calculator-result__label">
              Target amount
            </p>

            <p className="calculator-result__value">
              {result.formattedValue}{" "}
              <span className="calculator-result__unit">
                {result.details.targetUnit === "grams"
                  ? "g"
                  : "mol"}
              </span>
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Known amount in moles</dt>
                <dd>
                  {formatDetail(result.details.knownMoles)} mol
                </dd>
              </div>

              <div>
                <dt>Mole ratio</dt>
                <dd>
                  {formatDetail(result.details.moleRatio)}
                </dd>
              </div>

              <div>
                <dt>Target amount in moles</dt>
                <dd>
                  {formatDetail(result.details.targetMoles)} mol
                </dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Calculation</h3>
              <p>
                {formatDetail(result.details.knownMoles)} mol ×
                {" "}
                {formatDetail(
                  result.details.moleRatio,
                )} ={" "}
                {formatDetail(
                  result.details.targetMoles,
                )} mol
              </p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">n</span>
            <h2>Your result will appear here</h2>
            <p>
              Enter the known amount and balanced-equation
              coefficients, then select calculate.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
