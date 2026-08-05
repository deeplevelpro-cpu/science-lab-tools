"use client";

import { useState, type FormEvent } from "react";

import {
  calculateMolality,
  type MolalityDetails,
  type MolalityInput,
  type MolalityVariable,
  type SoluteAmountUnit,
  type SolventMassUnit,
} from "@/lib/calculators/molality";
import type { CalculationResult } from "@/types/calculator";

type MolalityResult = CalculationResult<MolalityDetails>;

type FieldDefinition = {
  key: MolalityVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly FieldDefinition[] = [
  {
    key: "molality",
    label: "Molality",
    symbol: "m",
    description: "Concentration in moles of solute per kilogram of solvent.",
  },
  {
    key: "soluteMoles",
    label: "Solute amount",
    symbol: "n",
    description: "Amount of dissolved solute in moles or millimoles.",
  },
  {
    key: "solventMass",
    label: "Solvent mass",
    symbol: "kg",
    description: "Mass of solvent, excluding the solute.",
  },
];

const variableLabels: Record<MolalityVariable, string> = {
  molality: "Molality",
  soluteMoles: "Solute amount",
  solventMass: "Solvent mass",
};

const emptyValues: Record<MolalityVariable, string> = {
  molality: "",
  soluteMoles: "",
  solventMass: "",
};

const examples = [
  {
    label: "Find molality",
    solveFor: "molality" as const,
    values: {
      molality: "",
      soluteMoles: "0.5",
      solventMass: "250",
    },
    soluteAmountUnit: "mol" as const,
    solventMassUnit: "g" as const,
  },
  {
    label: "Find solvent mass",
    solveFor: "solventMass" as const,
    values: {
      molality: "2",
      soluteMoles: "500",
      solventMass: "",
    },
    soluteAmountUnit: "mmol" as const,
    solventMassUnit: "g" as const,
  },
] as const;

export function MolalityCalculator() {
  const [solveFor, setSolveFor] =
    useState<MolalityVariable>("molality");
  const [values, setValues] =
    useState<Record<MolalityVariable, string>>(emptyValues);
  const [soluteAmountUnit, setSoluteAmountUnit] =
    useState<SoluteAmountUnit>("mol");
  const [solventMassUnit, setSolventMassUnit] =
    useState<SolventMassUnit>("g");
  const [result, setResult] = useState<MolalityResult | null>(null);
  const [error, setError] = useState("");

  function updateValue(field: MolalityVariable, value: string) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
    setResult(null);
    setError("");
  }

  function changeSolveFor(variable: MolalityVariable) {
    setSolveFor(variable);
    setValues((currentValues) => ({
      ...currentValues,
      [variable]: "",
    }));
    setResult(null);
    setError("");
  }

  function createInput(
    selectedVariable: MolalityVariable,
    currentValues: Record<MolalityVariable, string>,
    currentSoluteUnit: SoluteAmountUnit,
    currentSolventUnit: SolventMassUnit,
  ): MolalityInput {
    const input: MolalityInput = {
      solveFor: selectedVariable,
      soluteAmountUnit: currentSoluteUnit,
      solventMassUnit: currentSolventUnit,
    };

    for (const field of fields) {
      if (field.key === selectedVariable) {
        continue;
      }

      const rawValue = currentValues[field.key];
      const numericValue = Number(rawValue);

      if (rawValue.trim() === "" || !Number.isFinite(numericValue)) {
        throw new Error(
          `Enter a valid ${field.label.toLowerCase()}.`,
        );
      }

      input[field.key] = numericValue;
    }

    return input;
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);

    try {
      const calculationResult = calculateMolality(
        createInput(
          solveFor,
          values,
          soluteAmountUnit,
          solventMassUnit,
        ),
      );

      setResult(calculationResult);
      setValues((currentValues) => ({
        ...currentValues,
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

  function loadExample(example: (typeof examples)[number]) {
    const exampleValues: Record<MolalityVariable, string> = {
      ...example.values,
    };

    try {
      const calculationResult = calculateMolality(
        createInput(
          example.solveFor,
          exampleValues,
          example.soluteAmountUnit,
          example.solventMassUnit,
        ),
      );

      setSolveFor(example.solveFor);
      setSoluteAmountUnit(example.soluteAmountUnit);
      setSolventMassUnit(example.solventMassUnit);
      setValues({
        ...exampleValues,
        [example.solveFor]: String(calculationResult.value),
      });
      setResult(calculationResult);
      setError("");
    } catch (calculationError) {
      setResult(null);
      setError(
        calculationError instanceof Error
          ? calculationError.message
          : "The example could not be loaded.",
      );
    }
  }

  function resetCalculator() {
    setSolveFor("molality");
    setValues(emptyValues);
    setSoluteAmountUnit("mol");
    setSolventMassUnit("g");
    setResult(null);
    setError("");
  }

  return (
    <div className="calculator-panel">
      <form className="calculator-form" onSubmit={calculate} noValidate>
        <div className="calculator-form__heading">
          <div>
            <p className="calculator-form__label">
              Enter two known values
            </p>
            <h2>Solve a molality problem</h2>
          </div>

          <span className="calculator-form__status">Free tool</span>
        </div>

        <div className="form-field dilution-solve-field">
          <label htmlFor="molality-solve-for">
            Calculate which value?
          </label>
          <select
            id="molality-solve-for"
            value={solveFor}
            onChange={(event) =>
              changeSolveFor(
                event.target.value as MolalityVariable,
              )
            }
          >
            {fields.map((field) => (
              <option key={field.key} value={field.key}>
                {field.label} ({field.symbol})
              </option>
            ))}
          </select>
        </div>

        <div className="dilution-fields">
          {fields.map((field) => {
            const isSolvedField = field.key === solveFor;
            const helpId = `molality-${field.key}-help`;

            return (
              <div className="form-field" key={field.key}>
                <label htmlFor={`molality-${field.key}`}>
                  {field.label} ({field.symbol})
                </label>

                {field.key === "soluteMoles" ? (
                  <div className="input-with-unit">
                    <input
                      id={`molality-${field.key}`}
                      name={field.key}
                      type="number"
                      inputMode="decimal"
                      step="any"
                      min="0"
                      placeholder={
                        isSolvedField
                          ? "Calculated automatically"
                          : "Enter amount"
                      }
                      value={values[field.key]}
                      onChange={(event) =>
                        updateValue(field.key, event.target.value)
                      }
                      disabled={isSolvedField}
                      aria-describedby={helpId}
                    />

                    <select
                      aria-label="Solute amount unit"
                      value={soluteAmountUnit}
                      onChange={(event) => {
                        setSoluteAmountUnit(
                          event.target.value as SoluteAmountUnit,
                        );
                        setResult(null);
                        setError("");
                      }}
                      disabled={isSolvedField}
                    >
                      <option value="mol">mol</option>
                      <option value="mmol">mmol</option>
                    </select>
                  </div>
                ) : field.key === "solventMass" ? (
                  <div className="input-with-unit">
                    <input
                      id={`molality-${field.key}`}
                      name={field.key}
                      type="number"
                      inputMode="decimal"
                      step="any"
                      min="0"
                      placeholder={
                        isSolvedField
                          ? "Calculated automatically"
                          : "Enter mass"
                      }
                      value={values[field.key]}
                      onChange={(event) =>
                        updateValue(field.key, event.target.value)
                      }
                      disabled={isSolvedField}
                      aria-describedby={helpId}
                    />

                    <select
                      aria-label="Solvent mass unit"
                      value={solventMassUnit}
                      onChange={(event) => {
                        setSolventMassUnit(
                          event.target.value as SolventMassUnit,
                        );
                        setResult(null);
                        setError("");
                      }}
                      disabled={isSolvedField}
                    >
                      <option value="kg">kg</option>
                      <option value="g">g</option>
                      <option value="mg">mg</option>
                    </select>
                  </div>
                ) : (
                  <input
                    id={`molality-${field.key}`}
                    name={field.key}
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min="0"
                    placeholder={
                      isSolvedField
                        ? "Calculated automatically"
                        : "Enter molality"
                    }
                    value={values[field.key]}
                    onChange={(event) =>
                      updateValue(field.key, event.target.value)
                    }
                    disabled={isSolvedField}
                    aria-describedby={helpId}
                  />
                )}

                <p id={helpId}>
                  {isSolvedField
                    ? "This value will be calculated automatically."
                    : field.description}
                </p>
              </div>
            );
          })}
        </div>

        <p className="calculator-unit-note">
          Molality uses kilograms of solvent, not the total solution
          volume or mass. Unit conversions are handled automatically.
        </p>

        {error ? (
          <div className="calculator-error" role="alert">
            {error}
          </div>
        ) : null}

        <div className="calculator-actions">
          <button className="button button--primary" type="submit">
            Calculate molality
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
              {variableLabels[result.details.solveFor]}
            </p>

            <p className="calculator-result__value">
              {result.formattedValue}
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Molality</dt>
                <dd>{result.details.molality} mol/kg</dd>
              </div>
              <div>
                <dt>Solute amount</dt>
                <dd>{result.details.soluteMoles} mol</dd>
              </div>
              <div>
                <dt>Solvent mass</dt>
                <dd>
                  {result.details.solventMassInKilograms} kg
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
            <span aria-hidden="true">m</span>
            <h2>Your result will appear here</h2>
            <p>
              Select the missing value and enter the other two
              positive values.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
