"use client";

import { type FormEvent, useState } from "react";

import {
  calculatePercentYield,
  type PercentYieldDetails,
} from "@/lib/calculators/percent-yield";
import type { CalculationResult } from "@/types/calculator";

type PercentYieldResult =
  CalculationResult<PercentYieldDetails>;

const examples = [
  {
    label: "Typical laboratory result",
    actualYield: "7.35",
    theoreticalYield: "8.4",
  },
  {
    label: "Yield above 100%",
    actualYield: "10.5",
    theoreticalYield: "10",
  },
] as const;

function formatDetail(value: number): string {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: 10,
  });
}

export function PercentYieldCalculator() {
  const [actualYield, setActualYield] = useState("");
  const [theoreticalYield, setTheoreticalYield] =
    useState("");
  const [result, setResult] =
    useState<PercentYieldResult | null>(null);
  const [error, setError] = useState("");

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(null);
    setError("");

    const actual = Number(actualYield);
    const theoretical = Number(theoreticalYield);

    if (
      actualYield.trim() === "" ||
      !Number.isFinite(actual)
    ) {
      setError("Enter a valid actual yield.");
      return;
    }

    if (
      theoreticalYield.trim() === "" ||
      !Number.isFinite(theoretical)
    ) {
      setError("Enter a valid theoretical yield.");
      return;
    }

    try {
      setResult(
        calculatePercentYield({
          actualYield: actual,
          theoreticalYield: theoretical,
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
    setActualYield(example.actualYield);
    setTheoreticalYield(example.theoreticalYield);
    setError("");
    setResult(
      calculatePercentYield({
        actualYield: Number(example.actualYield),
        theoreticalYield: Number(
          example.theoreticalYield,
        ),
      }),
    );
  }

  function resetCalculator() {
    setActualYield("");
    setTheoreticalYield("");
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
              Enter your reaction yields
            </p>
            <h2>Calculate percent yield</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-fields">
          <div className="form-field">
            <label htmlFor="actual-yield">
              Actual yield
            </label>
            <input
              id="actual-yield"
              name="actualYield"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              placeholder="Example: 7.35"
              value={actualYield}
              onChange={(event) => {
                setActualYield(event.target.value);
                setResult(null);
                setError("");
              }}
              aria-describedby="actual-yield-help"
            />
            <p id="actual-yield-help">
              The product amount obtained experimentally.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="theoretical-yield">
              Theoretical yield
            </label>
            <input
              id="theoretical-yield"
              name="theoreticalYield"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              placeholder="Example: 8.4"
              value={theoreticalYield}
              onChange={(event) => {
                setTheoreticalYield(event.target.value);
                setResult(null);
                setError("");
              }}
              aria-describedby="theoretical-yield-help"
            />
            <p id="theoretical-yield-help">
              The maximum product amount predicted by
              stoichiometry.
            </p>
          </div>
        </div>

        <p className="calculator-form__note">
          Use the same unit for both values, such as grams,
          moles, milligrams, or kilograms.
        </p>

        {error ? (
          <div className="calculator-error" role="alert">
            {error}
          </div>
        ) : null}

        <div className="calculator-actions">
          <button className="button button--primary" type="submit">
            Calculate percent yield
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
          <p>Try an example:</p>

          <div className="calculator-examples__buttons">
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
      </form>

      <section
        className="calculator-result"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="calculator-result__label">
          Percent yield
        </p>

        {result ? (
          <>
            <p className="calculator-result__value">
              {result.formattedValue}
            </p>

            <p className="calculator-result__formula">
              Actual yield ÷ theoretical yield × 100
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Actual yield</dt>
                <dd>
                  {formatDetail(
                    result.details.actualYield,
                  )}
                </dd>
              </div>

              <div>
                <dt>Theoretical yield</dt>
                <dd>
                  {formatDetail(
                    result.details.theoreticalYield,
                  )}
                </dd>
              </div>

              <div>
                <dt>Yield difference</dt>
                <dd>
                  {formatDetail(
                    result.details.yieldDifference,
                  )}
                </dd>
              </div>

              <div>
                <dt>Efficiency ratio</dt>
                <dd>
                  {formatDetail(
                    result.details.efficiencyRatio,
                  )}
                </dd>
              </div>
            </dl>

            {result.value > 100 ? (
              <p className="calculator-result__note">
                A yield above 100% can indicate retained
                moisture, impurities, incomplete drying, or a
                measurement issue.
              </p>
            ) : null}
          </>
        ) : (
          <p className="calculator-result__placeholder">
            Enter actual and theoretical yield to see the
            percentage and supporting calculation details.
          </p>
        )}
      </section>
    </div>
  );
}
