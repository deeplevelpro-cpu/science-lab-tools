"use client";

import {
  type FormEvent,
  useMemo,
  useState,
} from "react";

import {
  calculateMomentOfInertia,
  type MomentOfInertiaDetails,
  type MomentOfInertiaShape,
} from "@/lib/calculators/moment-of-inertia";

type MomentOfInertiaResult = {
  value: number;
  formattedValue: string;
  details: MomentOfInertiaDetails;
};

type ShapeOption = {
  value: MomentOfInertiaShape;
  label: string;
  dimensionLabel: "Radius" | "Length";
  dimensionSymbol: "r" | "L";
  formula: string;
};

const shapeOptions: readonly ShapeOption[] = [
  {
    value: "pointMass",
    label: "Point mass",
    dimensionLabel: "Radius",
    dimensionSymbol: "r",
    formula: "I = mr²",
  },
  {
    value: "solidDisk",
    label: "Solid disk or cylinder",
    dimensionLabel: "Radius",
    dimensionSymbol: "r",
    formula: "I = ½mr²",
  },
  {
    value: "thinHoop",
    label: "Thin hoop or ring",
    dimensionLabel: "Radius",
    dimensionSymbol: "r",
    formula: "I = mr²",
  },
  {
    value: "solidSphere",
    label: "Solid sphere",
    dimensionLabel: "Radius",
    dimensionSymbol: "r",
    formula: "I = ⅖mr²",
  },
  {
    value: "thinSphericalShell",
    label: "Thin spherical shell",
    dimensionLabel: "Radius",
    dimensionSymbol: "r",
    formula: "I = ⅔mr²",
  },
  {
    value: "rodCenter",
    label: "Thin rod through center",
    dimensionLabel: "Length",
    dimensionSymbol: "L",
    formula: "I = ¹⁄₁₂mL²",
  },
  {
    value: "rodEnd",
    label: "Thin rod through one end",
    dimensionLabel: "Length",
    dimensionSymbol: "L",
    formula: "I = ⅓mL²",
  },
];

const examples = [
  {
    label: "Solid disk",
    shape: "solidDisk" as const,
    mass: "4",
    dimension: "3",
  },
  {
    label: "Solid sphere",
    shape: "solidSphere" as const,
    mass: "5",
    dimension: "2",
  },
  {
    label: "Rod through center",
    shape: "rodCenter" as const,
    mass: "12",
    dimension: "4",
  },
] as const;

function parseRequiredNumber(
  value: string,
  label: string,
): number {
  const normalizedValue = value.trim();

  if (normalizedValue === "") {
    throw new Error(`${label} is required.`);
  }

  const parsedValue = Number(normalizedValue);

  if (!Number.isFinite(parsedValue)) {
    throw new Error(
      `${label} must be a finite number.`,
    );
  }

  return parsedValue;
}

export function MomentOfInertiaCalculator() {
  const [shape, setShape] =
    useState<MomentOfInertiaShape>("solidDisk");
  const [mass, setMass] = useState("");
  const [dimension, setDimension] = useState("");
  const [result, setResult] =
    useState<MomentOfInertiaResult | null>(null);
  const [error, setError] =
    useState<string | null>(null);

  const selectedShape = useMemo(
    () =>
      shapeOptions.find(
        (option) => option.value === shape,
      ) ?? shapeOptions[0],
    [shape],
  );

  function runCalculation(
    nextShape: MomentOfInertiaShape,
    nextMass: string,
    nextDimension: string,
  ) {
    try {
      const calculatedResult =
        calculateMomentOfInertia({
          shape: nextShape,
          mass: parseRequiredNumber(
            nextMass,
            "Mass",
          ),
          dimension: parseRequiredNumber(
            nextDimension,
            selectedShape.dimensionLabel,
          ),
        });

      setResult(calculatedResult);
      setError(null);
    } catch (calculationError) {
      setResult(null);
      setError(
        calculationError instanceof Error
          ? calculationError.message
          : "The calculation could not be completed.",
      );
    }
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    runCalculation(shape, mass, dimension);
  }

  function handleReset() {
    setShape("solidDisk");
    setMass("");
    setDimension("");
    setResult(null);
    setError(null);
  }

  function applyExample(
    example: (typeof examples)[number],
  ) {
    setShape(example.shape);
    setMass(example.mass);
    setDimension(example.dimension);
    setError(null);

    const option =
      shapeOptions.find(
        (item) => item.value === example.shape,
      ) ?? shapeOptions[0];

    try {
      const calculatedResult =
        calculateMomentOfInertia({
          shape: example.shape,
          mass: Number(example.mass),
          dimension: Number(example.dimension),
        });

      setResult(calculatedResult);
    } catch {
      setResult(null);
    }

    if (option.dimensionLabel === "Length") {
      setDimension(example.dimension);
    }
  }

  return (
    <div className="calculator-shell">
      <div className="calculator-panel">
        <div className="calculator-panel__header">
          <div>
            <p className="eyebrow">
              Moment of inertia solver
            </p>

            <h2>
              Calculate moment of inertia
            </h2>

            <p>
              Select an object shape, enter its mass
              and radius or length, then calculate I.
            </p>
          </div>

          <div
            className="calculator-formula"
            role="img"
            aria-label={`Selected formula: ${selectedShape.formula}`}
          >
            <span aria-hidden="true">
              {selectedShape.formula}
            </span>
          </div>
        </div>

        <form
          className="calculator-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="calculator-field">
            <label htmlFor="moment-of-inertia-shape">
              Object shape
            </label>

            <select
              id="moment-of-inertia-shape"
              value={shape}
              onChange={(event) => {
                setShape(
                  event.target
                    .value as MomentOfInertiaShape,
                );
                setResult(null);
                setError(null);
              }}
            >
              {shapeOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>

            <p>
              Formula:{" "}
              <strong>
                {selectedShape.formula}
              </strong>
            </p>
          </div>

          <div className="calculator-fields">
            <div className="calculator-field">
              <label htmlFor="moment-of-inertia-mass">
                Mass (m)
              </label>

              <div className="calculator-input">
                <input
                  id="moment-of-inertia-mass"
                  type="number"
                  inputMode="decimal"
                  step="any"
                  min="0"
                  value={mass}
                  onChange={(event) => {
                    setMass(event.target.value);
                    setResult(null);
                    setError(null);
                  }}
                  placeholder="Enter mass"
                  aria-describedby="moment-of-inertia-mass-help"
                />

                <span>kg</span>
              </div>

              <p id="moment-of-inertia-mass-help">
                Enter a positive mass in kilograms.
              </p>
            </div>

            <div className="calculator-field">
              <label htmlFor="moment-of-inertia-dimension">
                {selectedShape.dimensionLabel} (
                {selectedShape.dimensionSymbol})
              </label>

              <div className="calculator-input">
                <input
                  id="moment-of-inertia-dimension"
                  type="number"
                  inputMode="decimal"
                  step="any"
                  min="0"
                  value={dimension}
                  onChange={(event) => {
                    setDimension(event.target.value);
                    setResult(null);
                    setError(null);
                  }}
                  placeholder={`Enter ${selectedShape.dimensionLabel.toLowerCase()}`}
                  aria-describedby="moment-of-inertia-dimension-help"
                />

                <span>m</span>
              </div>

              <p id="moment-of-inertia-dimension-help">
                Enter a positive{" "}
                {selectedShape.dimensionLabel.toLowerCase()}{" "}
                in meters.
              </p>
            </div>
          </div>

          {error ? (
            <p
              className="calculator-error"
              role="alert"
            >
              {error}
            </p>
          ) : null}

          <div className="calculator-actions">
            <button type="submit">
              Calculate moment of inertia
            </button>

            <button
              type="button"
              className="button-secondary"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>

        <div className="calculator-examples">
          <p>Try an example</p>

          <div>
            {examples.map((example) => (
              <button
                key={example.label}
                type="button"
                onClick={() =>
                  applyExample(example)
                }
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <aside
        className={`calculator-result ${
          result ? "calculator-result--complete" : ""
        }`}
        aria-live="polite"
      >
        {result ? (
          <>
            <p className="calculator-result__label">
              Moment of inertia
            </p>

            <div className="calculator-result__value">
              <strong>
                {result.formattedValue}
              </strong>
              <span>kg·m²</span>
            </div>

            <dl className="calculator-result__details">
              <div>
                <dt>Object shape</dt>
                <dd>
                  {result.details.shapeLabel}
                </dd>
              </div>

              <div>
                <dt>Mass</dt>
                <dd>
                  {result.details.mass} kg
                </dd>
              </div>

              <div>
                <dt>
                  {result.details.dimensionLabel}
                </dt>
                <dd>
                  {result.details.dimension} m
                </dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <p>Formula used</p>
              <strong>
                {result.details.formula}
              </strong>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">I</span>

            <p>
              Your moment of inertia result will
              appear here.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
