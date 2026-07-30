import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type GrahamsLawMode = "rate" | "time";

export type GrahamsLawRateVariable =
  | "gas1Rate"
  | "gas2Rate"
  | "gas1MolarMass"
  | "gas2MolarMass";

export type GrahamsLawTimeVariable =
  | "gas1Time"
  | "gas2Time"
  | "gas1MolarMass"
  | "gas2MolarMass";

export type GrahamsLawVariable =
  | GrahamsLawRateVariable
  | GrahamsLawTimeVariable;

export type TimeUnit = "s" | "min" | "h";

type GrahamsLawBaseInput = {
  gas1MolarMass?: number;
  gas2MolarMass?: number;
};

export type GrahamsLawRateInput =
  GrahamsLawBaseInput & {
    mode: "rate";
    gas1Rate?: number;
    gas2Rate?: number;
    solveFor: GrahamsLawRateVariable;
  };

export type GrahamsLawTimeInput =
  GrahamsLawBaseInput & {
    mode: "time";
    gas1Time?: number;
    gas1TimeUnit: TimeUnit;
    gas2Time?: number;
    gas2TimeUnit: TimeUnit;
    outputTimeUnit: TimeUnit;
    solveFor: GrahamsLawTimeVariable;
  };

export type GrahamsLawInput =
  | GrahamsLawRateInput
  | GrahamsLawTimeInput;

export type GrahamsLawDetails = {
  mode: GrahamsLawMode;
  solvedVariable: GrahamsLawVariable;
  gas1MolarMass: number;
  gas2MolarMass: number;
  gas1Rate?: number;
  gas2Rate?: number;
  gas1TimeInSeconds?: number;
  gas2TimeInSeconds?: number;
  rateRatio: number;
  timeRatio: number;
  formula: string;
};

const timeToSeconds: Record<TimeUnit, number> = {
  s: 1,
  min: 60,
  h: 3600,
};

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

function requirePositiveValue(
  value: number | undefined,
  variable: GrahamsLawVariable,
): number {
  if (value === undefined || !Number.isFinite(value)) {
    throw new Error(
      `${variableLabels[variable]} must be a finite number.`,
    );
  }

  if (value <= 0) {
    throw new Error(
      `${variableLabels[variable]} must be greater than zero.`,
    );
  }

  return value;
}

export function convertTimeToSeconds(
  value: number,
  unit: TimeUnit,
): number {
  return value * timeToSeconds[unit];
}

export function convertSecondsToTime(
  valueInSeconds: number,
  unit: TimeUnit,
): number {
  return valueInSeconds / timeToSeconds[unit];
}

function calculateRateMode(
  input: GrahamsLawRateInput,
): CalculationResult<GrahamsLawDetails> {
  let gas1Rate: number;
  let gas2Rate: number;
  let gas1MolarMass: number;
  let gas2MolarMass: number;
  let formula: string;

  switch (input.solveFor) {
    case "gas1Rate":
      gas2Rate = requirePositiveValue(
        input.gas2Rate,
        "gas2Rate",
      );
      gas1MolarMass = requirePositiveValue(
        input.gas1MolarMass,
        "gas1MolarMass",
      );
      gas2MolarMass = requirePositiveValue(
        input.gas2MolarMass,
        "gas2MolarMass",
      );
      gas1Rate =
        gas2Rate *
        Math.sqrt(gas2MolarMass / gas1MolarMass);
      formula = "r₁ = r₂√(M₂/M₁)";
      break;

    case "gas2Rate":
      gas1Rate = requirePositiveValue(
        input.gas1Rate,
        "gas1Rate",
      );
      gas1MolarMass = requirePositiveValue(
        input.gas1MolarMass,
        "gas1MolarMass",
      );
      gas2MolarMass = requirePositiveValue(
        input.gas2MolarMass,
        "gas2MolarMass",
      );
      gas2Rate =
        gas1Rate *
        Math.sqrt(gas1MolarMass / gas2MolarMass);
      formula = "r₂ = r₁√(M₁/M₂)";
      break;

    case "gas1MolarMass":
      gas1Rate = requirePositiveValue(
        input.gas1Rate,
        "gas1Rate",
      );
      gas2Rate = requirePositiveValue(
        input.gas2Rate,
        "gas2Rate",
      );
      gas2MolarMass = requirePositiveValue(
        input.gas2MolarMass,
        "gas2MolarMass",
      );
      gas1MolarMass =
        gas2MolarMass * (gas2Rate / gas1Rate) ** 2;
      formula = "M₁ = M₂(r₂/r₁)²";
      break;

    case "gas2MolarMass":
      gas1Rate = requirePositiveValue(
        input.gas1Rate,
        "gas1Rate",
      );
      gas2Rate = requirePositiveValue(
        input.gas2Rate,
        "gas2Rate",
      );
      gas1MolarMass = requirePositiveValue(
        input.gas1MolarMass,
        "gas1MolarMass",
      );
      gas2MolarMass =
        gas1MolarMass * (gas1Rate / gas2Rate) ** 2;
      formula = "M₂ = M₁(r₁/r₂)²";
      break;
  }

  const rateRatio = gas1Rate / gas2Rate;
  const timeRatio = gas2Rate / gas1Rate;

  const solvedValue = {
    gas1Rate,
    gas2Rate,
    gas1MolarMass,
    gas2MolarMass,
  }[input.solveFor];

  const solvedUnit = input.solveFor.includes("Rate")
    ? "relative rate"
    : "g/mol";

  return {
    value: solvedValue,
    formattedValue:
      `${formatCalculatedNumber(solvedValue)} ${solvedUnit}`,
    details: {
      mode: "rate",
      solvedVariable: input.solveFor,
      gas1MolarMass,
      gas2MolarMass,
      gas1Rate,
      gas2Rate,
      rateRatio,
      timeRatio,
      formula,
    },
  };
}

function calculateTimeMode(
  input: GrahamsLawTimeInput,
): CalculationResult<GrahamsLawDetails> {
  let gas1TimeInSeconds: number;
  let gas2TimeInSeconds: number;
  let gas1MolarMass: number;
  let gas2MolarMass: number;
  let formula: string;

  switch (input.solveFor) {
    case "gas1Time":
      gas2TimeInSeconds = convertTimeToSeconds(
        requirePositiveValue(input.gas2Time, "gas2Time"),
        input.gas2TimeUnit,
      );
      gas1MolarMass = requirePositiveValue(
        input.gas1MolarMass,
        "gas1MolarMass",
      );
      gas2MolarMass = requirePositiveValue(
        input.gas2MolarMass,
        "gas2MolarMass",
      );
      gas1TimeInSeconds =
        gas2TimeInSeconds *
        Math.sqrt(gas1MolarMass / gas2MolarMass);
      formula = "t₁ = t₂√(M₁/M₂)";
      break;

    case "gas2Time":
      gas1TimeInSeconds = convertTimeToSeconds(
        requirePositiveValue(input.gas1Time, "gas1Time"),
        input.gas1TimeUnit,
      );
      gas1MolarMass = requirePositiveValue(
        input.gas1MolarMass,
        "gas1MolarMass",
      );
      gas2MolarMass = requirePositiveValue(
        input.gas2MolarMass,
        "gas2MolarMass",
      );
      gas2TimeInSeconds =
        gas1TimeInSeconds *
        Math.sqrt(gas2MolarMass / gas1MolarMass);
      formula = "t₂ = t₁√(M₂/M₁)";
      break;

    case "gas1MolarMass":
      gas1TimeInSeconds = convertTimeToSeconds(
        requirePositiveValue(input.gas1Time, "gas1Time"),
        input.gas1TimeUnit,
      );
      gas2TimeInSeconds = convertTimeToSeconds(
        requirePositiveValue(input.gas2Time, "gas2Time"),
        input.gas2TimeUnit,
      );
      gas2MolarMass = requirePositiveValue(
        input.gas2MolarMass,
        "gas2MolarMass",
      );
      gas1MolarMass =
        gas2MolarMass *
        (gas1TimeInSeconds / gas2TimeInSeconds) ** 2;
      formula = "M₁ = M₂(t₁/t₂)²";
      break;

    case "gas2MolarMass":
      gas1TimeInSeconds = convertTimeToSeconds(
        requirePositiveValue(input.gas1Time, "gas1Time"),
        input.gas1TimeUnit,
      );
      gas2TimeInSeconds = convertTimeToSeconds(
        requirePositiveValue(input.gas2Time, "gas2Time"),
        input.gas2TimeUnit,
      );
      gas1MolarMass = requirePositiveValue(
        input.gas1MolarMass,
        "gas1MolarMass",
      );
      gas2MolarMass =
        gas1MolarMass *
        (gas2TimeInSeconds / gas1TimeInSeconds) ** 2;
      formula = "M₂ = M₁(t₂/t₁)²";
      break;
  }

  const rateRatio =
    gas2TimeInSeconds / gas1TimeInSeconds;
  const timeRatio =
    gas1TimeInSeconds / gas2TimeInSeconds;

  const solvedValue =
    input.solveFor === "gas1Time"
      ? convertSecondsToTime(
          gas1TimeInSeconds,
          input.outputTimeUnit,
        )
      : input.solveFor === "gas2Time"
        ? convertSecondsToTime(
            gas2TimeInSeconds,
            input.outputTimeUnit,
          )
        : input.solveFor === "gas1MolarMass"
          ? gas1MolarMass
          : gas2MolarMass;

  const solvedUnit = input.solveFor.includes("Time")
    ? input.outputTimeUnit
    : "g/mol";

  return {
    value: solvedValue,
    formattedValue:
      `${formatCalculatedNumber(solvedValue)} ${solvedUnit}`,
    details: {
      mode: "time",
      solvedVariable: input.solveFor,
      gas1MolarMass,
      gas2MolarMass,
      gas1TimeInSeconds,
      gas2TimeInSeconds,
      rateRatio,
      timeRatio,
      formula,
    },
  };
}

export function calculateGrahamsLaw(
  input: GrahamsLawInput,
): CalculationResult<GrahamsLawDetails> {
  return input.mode === "rate"
    ? calculateRateMode(input)
    : calculateTimeMode(input);
}
