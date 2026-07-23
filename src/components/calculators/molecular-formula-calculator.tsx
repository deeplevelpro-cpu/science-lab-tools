"use client";

import { useState, type FormEvent } from "react";

import {
  calculateMolecularFormula,
  type MolecularFormulaDetails,
} from "@/lib/calculators/molecular-formula";
import { formatCalculatedNumber } from "@/lib/calculators/number-format";
import type { CalculationResult } from "@/types/calculator";

type MolecularFormulaResult =
  CalculationResult<MolecularFormulaDetails>;

const examples = [
  {
    label: "Glucose",
    empiricalFormula: "CH2O",
    molarMass: "180.156",
  },
  {
    label: "Dinitrogen tetroxide",
    empiricalFormula: "NO2",
    molarMass: "92.01",
  },
  {
    label: "Hydrogen peroxide",
    empiricalFormula: "HO",
    molarMass: "34.014",
  },
] as const;

function FormulaDisplay({
  formula,
}: {
  formula: string;
}) {
  const parts =
    formula.match(/[A-Z][a-z]?|\d+/g) ?? [formula];

  return (
    <>
      {parts.map((part, index) =>
        /^\d+$/.test(part) ? (
          <sub key={`${part}-${index}`}>{part}</sub>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        ),
      )}
    </>
  );
}

function formatDetailNumber(value: number): string {
  return formatCalculatedNumber(value, 6);
}

export function MolecularFormulaCalculator() {
  const [empiricalFormula, setEmpiricalFormula] =
    useState("");
  const [molarMass, setMolarMass] = useState("");
  const [result, setResult] =
    useState<MolecularFormulaResult | null>(null);
  const [error, setError] = useState("");

  function clearResult() {
    setResult(null);
    setError("");
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setResult(null);
    setError("");

    if (empiricalFormula.trim() === "") {
      setError("Enter an empirical formula.");
      return;
    }

    if (molarMass.trim() === "") {
      setError("Enter the compound molar mass.");
      return;
    }

    try {
      setResult(
        calculateMolecularFormula(
          empiricalFormula,
          Number(molarMass),
        ),
      );
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "The molecular formula could not be calculated.",
      );
    }
  }

  function loadExample(
    exampleFormula: string,
    exampleMolarMass: string,
  ) {
    setEmpiricalFormula(exampleFormula);
    setMolarMass(exampleMolarMass);
    setError("");

    try {
      setResult(
        calculateMolecularFormula(
          exampleFormula,
          Number(exampleMolarMass),
        ),
      );
    } catch {
      setResult(null);
    }
  }

  function resetCalculator() {
    setEmpiricalFormula("");
    setMolarMass("");
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
          <div>
            <p className="calculator-form__label">
              Enter compound data
            </p>
            <h2>Calculate molecular formula</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-fields">
          <div className="form-field">
            <label htmlFor="empirical-formula">
              Empirical formula
            </label>

            <input
              id="empirical-formula"
              name="empiricalFormula"
              type="text"
              inputMode="text"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              placeholder="Example: CH2O"
              value={empiricalFormula}
              onChange={(event) => {
                setEmpiricalFormula(event.target.value);
                clearResult();
              }}
              aria-describedby="empirical-formula-help"
            />

            <p id="empirical-formula-help">
              Enter the simplest whole-number ratio of
              elements in the compound.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="compound-molar-mass">
              Compound molar mass
            </label>

            <div className="input-with-unit">
              <input
                id="compound-molar-mass"
                name="compoundMolarMass"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                placeholder="Example: 180.156"
                value={molarMass}
                onChange={(event) => {
                  setMolarMass(event.target.value);
                  clearResult();
                }}
                aria-describedby="compound-molar-mass-help"
              />

              <span>g/mol</span>
            </div>

            <p id="compound-molar-mass-help">
              Use the experimentally measured or supplied
              molar mass of the molecular compound.
            </p>
          </div>
        </div>

        {error ? (
          <div className="calculator-error" role="alert">
            {error}
          </div>
        ) : null}

        <div className="calculator-actions">
          <button
            className="button button--primary"
            type="submit"
          >
            Calculate molecular formula
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
              onClick={() =>
                loadExample(
                  example.empiricalFormula,
                  example.molarMass,
                )
              }
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
              Molecular formula
            </p>

            <p className="calculator-result__value">
              <FormulaDisplay
                formula={result.details.molecularFormula}
              />
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Empirical formula</dt>
                <dd>
                  <FormulaDisplay
                    formula={
                      result.details
                        .normalizedEmpiricalFormula
                    }
                  />
                </dd>
              </div>

              <div>
                <dt>Empirical formula mass</dt>
                <dd>
                  {formatDetailNumber(
                    result.details.empiricalFormulaMass,
                  )}{" "}
                  {result.details.unit}
                </dd>
              </div>

              <div>
                <dt>Whole-number multiplier</dt>
                <dd>{result.details.multiplier}</dd>
              </div>

              <div>
                <dt>Calculated molar mass</dt>
                <dd>
                  {formatDetailNumber(
                    result.details.calculatedMolarMass,
                  )}{" "}
                  {result.details.unit}
                </dd>
              </div>

              <div>
                <dt>Entered molar mass</dt>
                <dd>
                  {formatDetailNumber(
                    result.details.targetMolarMass,
                  )}{" "}
                  {result.details.unit}
                </dd>
              </div>

              <div>
                <dt>Percent difference</dt>
                <dd>
                  {formatDetailNumber(
                    result.details.percentDifference,
                  )}
                  %
                </dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Formula calculation</h3>

              <p>
                Molecular formula = empirical formula ×{" "}
                {result.details.multiplier}
              </p>

              <dl className="calculator-result__details">
                {result.details.elements.map((element) => (
                  <div key={element.symbol}>
                    <dt>{element.symbol}</dt>
                    <dd>
                      {element.empiricalCount} ×{" "}
                      {result.details.multiplier} ={" "}
                      {element.molecularCount}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">MF</span>

            <h2>Your result will appear here</h2>

            <p>
              Enter an empirical formula and compound molar
              mass to calculate the molecular formula.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
