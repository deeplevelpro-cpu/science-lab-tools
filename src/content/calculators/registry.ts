export type CalculatorDefinition = {
  slug: string;
  name: string;
  shortDescription: string;
  category: "Laboratory" | "Chemistry" | "Physics";
  href: string;
  keywords: readonly string[];
};

export const calculators: readonly CalculatorDefinition[] = [
  {
    slug: "percent-error-calculator",
    name: "Percent Error Calculator",
    shortDescription:
      "Calculate percent error from experimental and accepted values with clear working steps.",
    category: "Laboratory",
    href: "/calculators/percent-error-calculator",
    keywords: [
      "percent error calculator",
      "experimental error calculator",
      "chemistry percent error",
    ],
  },
  {
    slug: "percent-difference-calculator",
    name: "Percent Difference Calculator",
    shortDescription:
      "Compare two experimental measurements without using an accepted reference value.",
    category: "Laboratory",
    href: "/calculators/percent-difference-calculator",
    keywords: ["percent difference calculator"],
  },
  {
    slug: "significant-figures-calculator",
    name: "Significant Figures Calculator",
    shortDescription:
      "Count significant figures and round measured values to a selected precision.",
    category: "Laboratory",
    href: "/calculators/significant-figures-calculator",
    keywords: [
      "significant figures calculator",
      "sig figs calculator",
      "round to significant figures",
      "significant digits calculator",
    ],
  },
  {
    slug: "coefficient-variation-calculator",
    name: "Coefficient of Variation Calculator",
    shortDescription:
      "Calculate relative dataset variation using sample or population standard deviation.",
    category: "Laboratory",
    href: "/calculators/coefficient-variation-calculator",
    keywords: [
      "coefficient of variation calculator",
      "cv calculator statistics",
      "relative standard deviation calculator",
      "sample coefficient of variation",
    ],
  },
  {
    slug: "mean-median-mode-calculator",
    name: "Mean, Median and Mode Calculator",
    shortDescription:
      "Calculate mean, median, mode, sum, range, minimum, maximum, and sorted values.",
    category: "Laboratory",
    href: "/calculators/mean-median-mode-calculator",
    keywords: [
      "mean median mode calculator",
      "average calculator",
      "median calculator",
      "mode calculator",
    ],
  },
  {
    slug: "standard-deviation-calculator",
    name: "Standard Deviation Calculator",
    shortDescription:
      "Calculate sample and population standard deviation, mean, range, and dataset size.",
    category: "Laboratory",
    href: "/calculators/standard-deviation-calculator",
    keywords: [
      "standard deviation calculator",
      "sample standard deviation calculator",
      "population standard deviation calculator",
      "mean and standard deviation calculator",
    ],
  },
  {
    slug: "uncertainty-propagation-calculator",
    name: "Uncertainty Propagation Calculator",
    shortDescription:
      "Propagate uncertainty through addition, subtraction, multiplication, and division.",
    category: "Laboratory",
    href: "/calculators/uncertainty-propagation-calculator",
    keywords: [
      "uncertainty propagation calculator",
      "propagation of error calculator",
      "combined uncertainty calculator",
      "absolute and relative uncertainty calculator",
    ],
  },
  {
    slug: "measurement-uncertainty-calculator",
    name: "Measurement Uncertainty Calculator",
    shortDescription:
      "Calculate relative uncertainty, percentage uncertainty, range, and plus-or-minus notation.",
    category: "Laboratory",
    href: "/calculators/measurement-uncertainty-calculator",
    keywords: [
      "measurement uncertainty calculator",
      "percentage uncertainty calculator",
      "relative uncertainty calculator",
      "absolute uncertainty calculator",
    ],
  },
  {
    slug: "rate-of-change-calculator",
    name: "Rate of Change Calculator",
    shortDescription:
      "Calculate absolute change, percentage change, interval, and average rate of change.",
    category: "Laboratory",
    href: "/calculators/rate-of-change-calculator",
    keywords: [
      "rate of change calculator",
      "average rate of change calculator",
      "change over time calculator",
      "percentage change calculator",
    ],
  },
  {
    slug: "linear-regression-calculator",
    name: "Linear Regression Calculator",
    shortDescription:
      "Calculate slope, intercept, best-fit equation, correlation coefficient, and R squared.",
    category: "Laboratory",
    href: "/calculators/linear-regression-calculator",
    keywords: [
      "linear regression calculator",
      "line of best fit calculator",
      "correlation coefficient calculator",
      "r squared calculator",
    ],
  },
  {
    slug: "molarity-calculator",
    name: "Molarity Calculator",
    shortDescription:
      "Calculate solution molarity from moles of solute and solution volume.",
    category: "Chemistry",
    href: "/calculators/molarity-calculator",
    keywords: ["molarity calculator", "moles and volume calculator"],
  },
  {
    slug: "mass-moles-calculator",
    name: "Mass to Moles Calculator",
    shortDescription:
      "Calculate mass, moles, or molar mass from two known chemistry values.",
    category: "Chemistry",
    href: "/calculators/mass-moles-calculator",
    keywords: [
      "mass to moles calculator",
      "grams to moles calculator",
      "moles to grams calculator",
      "molar mass calculator",
    ],
  },
  {
    slug: "dilution-calculator",
    name: "Dilution Calculator",
    shortDescription:
      "Solve dilution problems using initial and final concentration and volume.",
    category: "Chemistry",
    href: "/calculators/dilution-calculator",
    keywords: ["dilution calculator chemistry"],
  },
  {
    slug: "molecular-weight-calculator",
    name: "Molecular Weight Calculator",
    shortDescription:
      "Calculate molecular weight and molar mass from chemical formulas with element-by-element mass breakdowns.",
    category: "Chemistry",
    href: "/calculators/molecular-weight-calculator",
    keywords: [
      "molecular weight calculator",
      "molar mass calculator",
      "chemical formula mass calculator",
      "molecular mass calculator",
      "formula weight calculator",
    ],
  },
  {
    slug: "empirical-formula-calculator",
    name: "Empirical Formula Calculator",
    shortDescription:
      "Calculate an empirical formula from element masses or percentage composition with mole conversions and simplest whole-number ratios.",
    category: "Chemistry",
    href: "/calculators/empirical-formula-calculator",
    keywords: [
      "empirical formula calculator",
      "empirical formula calculator from percentage",
      "empirical formula calculator from mass",
      "calculate empirical formula",
      "simplest formula calculator",
      "percent composition to empirical formula",
    ],
  },
  {
    slug: "molecular-formula-calculator",
    name: "Molecular Formula Calculator",
    shortDescription:
      "Calculate a molecular formula from an empirical formula and compound molar mass with a whole-number multiplier and clear working steps.",
    category: "Chemistry",
    href: "/calculators/molecular-formula-calculator",
    keywords: [
      "molecular formula calculator",
      "empirical formula to molecular formula calculator",
      "calculate molecular formula",
      "molecular formula from molar mass",
      "empirical and molecular formula calculator",
      "molecular formula chemistry calculator",
    ],
  },
  {
    slug: "stoichiometry-calculator",
    name: "Stoichiometry Calculator",
    shortDescription:
      "Convert reactant and product amounts using balanced-equation mole ratios, moles, grams, and molar masses.",
    category: "Chemistry",
    href: "/calculators/stoichiometry-calculator",
    keywords: [
      "stoichiometry calculator",
      "chemical stoichiometry calculator",
      "mole ratio calculator",
      "grams to grams stoichiometry calculator",
      "moles to grams stoichiometry calculator",
      "reactant product calculator",
    ],
  },
  {
    slug: "limiting-reactant-calculator",
    name: "Limiting Reactant Calculator",
    shortDescription:
      "Identify the limiting reagent, calculate excess reactant remaining, and estimate theoretical product yield.",
    category: "Chemistry",
    href: "/calculators/limiting-reactant-calculator",
    keywords: [
      "limiting reactant calculator",
      "limiting reagent calculator",
      "excess reactant calculator",
      "theoretical yield calculator",
      "limiting reactant and excess calculator",
      "stoichiometric reactant calculator",
    ],
  },
  {
    slug: "percent-yield-calculator",
    name: "Percent Yield Calculator",
    shortDescription:
      "Calculate reaction percent yield from actual and theoretical yield with supporting efficiency and yield-difference details.",
    category: "Chemistry",
    href: "/calculators/percent-yield-calculator",
    keywords: [
      "percent yield calculator",
      "percentage yield calculator",
      "reaction yield calculator",
      "actual yield calculator",
      "theoretical yield calculator",
      "chemistry percent yield calculator",
    ],
  },
  {
    slug: "ph-calculator",
    name: "pH Calculator",
    shortDescription:
      "Calculate pH, pOH, hydrogen-ion concentration, hydroxide-ion concentration, and acid-base classification.",
    category: "Chemistry",
    href: "/calculators/ph-calculator",
    keywords: [
      "ph calculator",
      "poh calculator",
      "hydrogen ion concentration calculator",
      "hydroxide ion concentration calculator",
      "acid base calculator",
    ],
  },
  {
    slug: "ideal-gas-law-calculator",
    name: "Ideal Gas Law Calculator",
    shortDescription:
      "Calculate pressure, volume, moles, or temperature using PV = nRT with automatic unit conversion.",
    category: "Chemistry",
    href: "/calculators/ideal-gas-law-calculator",
    keywords: [
      "ideal gas law calculator",
      "pv nrt calculator",
      "gas law calculator",
      "pressure volume temperature calculator",
      "moles gas calculator",
      "ideal gas equation calculator",
    ],
  },
  {
    slug: "boyles-law-calculator",
    name: "Boyle's Law Calculator",
    shortDescription:
      "Calculate initial or final pressure and volume using P₁V₁ = P₂V₂ with automatic unit conversion.",
    category: "Chemistry",
    href: "/calculators/boyles-law-calculator",
    keywords: [
      "boyles law calculator",
      "boyle's law calculator",
      "p1v1 p2v2 calculator",
      "pressure volume calculator",
      "gas compression calculator",
      "boyles law equation calculator",
    ],
  },
  {
    slug: "charles-law-calculator",
    name: "Charles's Law Calculator",
    shortDescription:
      "Calculate initial or final gas volume and temperature using V₁/T₁ = V₂/T₂ with automatic unit conversion.",
    category: "Chemistry",
    href: "/calculators/charles-law-calculator",
    keywords: [
      "charles law calculator",
      "charles's law calculator",
      "v1 t1 v2 t2 calculator",
      "volume temperature calculator",
      "gas expansion calculator",
      "charles law equation calculator",
    ],
  },
  {
    slug: "avogadros-law-calculator",
    name: "Avogadro's Law Calculator",
    shortDescription:
      "Calculate gas volume or amount using V₁/n₁ = V₂/n₂ with automatic liter, milliliter, cubic meter, mole, and millimole conversion.",
    category: "Chemistry",
    href: "/calculators/avogadros-law-calculator",
    keywords: [
      "avogadros law calculator",
      "avogadro's law calculator",
      "v1 n1 v2 n2 calculator",
      "gas volume moles calculator",
      "volume mole relationship calculator",
      "avogadro law equation calculator",
    ],
  },
  {
    slug: "combined-gas-law-calculator",
    name: "Combined Gas Law Calculator",
    shortDescription:
      "Calculate initial or final pressure, volume, or temperature using P₁V₁/T₁ = P₂V₂/T₂ with automatic unit conversion.",
    category: "Chemistry",
    href: "/calculators/combined-gas-law-calculator",
    keywords: [
      "combined gas law calculator",
      "p1 v1 t1 p2 v2 t2 calculator",
      "pressure volume temperature calculator",
      "combined gas equation calculator",
      "gas law calculator",
      "combined gas law solver",
    ],
  },
  {
    slug: "gay-lussacs-law-calculator",
    name: "Gay-Lussac's Law Calculator",
    shortDescription:
      "Calculate initial or final gas pressure and temperature using P₁/T₁ = P₂/T₂ with automatic unit conversion.",
    category: "Chemistry",
    href: "/calculators/gay-lussacs-law-calculator",
    keywords: [
      "gay lussacs law calculator",
      "gay-lussac's law calculator",
      "p1 t1 p2 t2 calculator",
      "pressure temperature calculator",
      "constant volume gas law calculator",
      "gay lussac law equation calculator",
    ],
  },
  {
    slug: "daltons-law-calculator",
    name: "Dalton's Law Calculator",
    shortDescription:
      "Calculate total pressure or a missing partial pressure using Dalton's law with automatic unit conversion.",
    category: "Chemistry",
    href: "/calculators/daltons-law-calculator",
    keywords: [
      "daltons law calculator",
      "dalton's law calculator",
      "partial pressure calculator",
      "total pressure calculator",
      "missing partial pressure calculator",
      "dalton law equation calculator",
    ],
  },
  {
    slug: "pulley-calculator",
    name: "Pulley Calculator",
    shortDescription:
      "Calculate load force, ideal mechanical advantage, effort force, and rope distance for an ideal pulley system.",
    category: "Physics",
    href: "/calculators/pulley-calculator",
    keywords: [
      "pulley calculator",
      "pulley mechanical advantage calculator",
      "pulley force calculator",
      "ideal pulley calculator",
      "rope distance calculator",
    ],
  },
  {
    slug: "inclined-plane-calculator",
    name: "Inclined Plane Calculator",
    shortDescription:
      "Calculate parallel force, normal force, friction force, net force, and acceleration on an inclined plane.",
    category: "Physics",
    href: "/calculators/inclined-plane-calculator",
    keywords: [
      "inclined plane calculator",
      "incline force calculator",
      "inclined plane acceleration calculator",
      "inclined plane friction calculator",
      "force on an incline calculator",
    ],
  },
  {
    slug: "friction-calculator",
    name: "Friction Calculator",
    shortDescription:
      "Calculate static or kinetic friction force, coefficient of friction, or normal force using F = μN.",
    category: "Physics",
    href: "/calculators/friction-calculator",
    keywords: [
      "friction calculator",
      "coefficient of friction calculator",
      "kinetic friction calculator",
      "static friction calculator",
      "friction force calculator",
    ],
  },
  {
    slug: "normal-force-calculator",
    name: "Normal Force Calculator",
    shortDescription:
      "Calculate normal force, mass, or gravity on horizontal and inclined surfaces with optional external forces.",
    category: "Physics",
    href: "/calculators/normal-force-calculator",
    keywords: [
      "normal force calculator",
      "inclined plane normal force calculator",
      "normal force formula calculator",
      "N equals mg calculator",
      "surface force calculator",
    ],
  },
  {
    slug: "weight-calculator",
    name: "Weight Calculator",
    shortDescription:
      "Calculate weight, mass, or gravitational acceleration using W = m × g.",
    category: "Physics",
    href: "/calculators/weight-calculator",
    keywords: [
      "weight calculator",
      "mass to weight calculator",
      "weight force calculator",
      "W equals mg calculator",
      "gravity weight calculator",
    ],
  },
  {
    slug: "force-calculator",
    name: "Force Calculator",
    shortDescription:
      "Calculate force, mass, or acceleration using Newton's second law.",
    category: "Physics",
    href: "/calculators/force-calculator",
    keywords: [
      "force calculator",
      "newtons second law calculator",
      "force mass acceleration calculator",
      "f equals ma calculator",
    ],
  },
  {
    slug: "power-calculator",
    name: "Power Calculator",
    shortDescription:
      "Calculate power, work, or time using the mechanical power formula.",
    category: "Physics",
    href: "/calculators/power-calculator",
    keywords: [
      "power calculator",
      "physics power calculator",
      "work time power calculator",
      "power formula calculator",
    ],
  },
  {
    slug: "work-calculator",
    name: "Work Calculator",
    shortDescription:
      "Calculate work, force, or distance using the mechanical work formula.",
    category: "Physics",
    href: "/calculators/work-calculator",
    keywords: [
      "work calculator",
      "physics work calculator",
      "force distance work calculator",
      "work formula calculator",
    ],
  },
  {
    slug: "tangential-acceleration-calculator",
    name: "Tangential Acceleration Calculator",
    shortDescription:
      "Calculate tangential acceleration, radius, or angular acceleration using aₜ = rα.",
    category: "Physics",
    href: "/calculators/tangential-acceleration-calculator",
    keywords: [
      "tangential acceleration calculator",
      "radius angular acceleration calculator",
      "linear acceleration circular motion calculator",
      "a t equals r alpha calculator",
    ],
  },
  {
    slug: "tangential-velocity-calculator",
    name: "Tangential Velocity Calculator",
    shortDescription:
      "Calculate tangential velocity, radius, or angular velocity using v = rω.",
    category: "Physics",
    href: "/calculators/tangential-velocity-calculator",
    keywords: [
      "tangential velocity calculator",
      "radius angular velocity calculator",
      "linear velocity circular motion calculator",
      "v equals r omega calculator",
    ],
  },
  {
    slug: "rpm-calculator",
    name: "RPM Calculator",
    shortDescription:
      "Convert RPM, rotational frequency, and angular velocity using RPM = 60f.",
    category: "Physics",
    href: "/calculators/rpm-calculator",
    keywords: [
      "rpm calculator",
      "rpm to hertz calculator",
      "hertz to rpm calculator",
      "rpm to angular velocity calculator",
    ],
  },
  {
    slug: "revolutions-calculator",
    name: "Revolutions Calculator",
    shortDescription:
      "Calculate revolutions, rotational frequency, time, or angular displacement using N = ft and N = θ / 2π.",
    category: "Physics",
    href: "/calculators/revolutions-calculator",
    keywords: [
      "revolutions calculator",
      "number of revolutions",
      "revolutions from frequency and time",
      "angular displacement to revolutions",
    ],
  },
  {
    slug: "rotational-frequency-calculator",
    name: "Rotational Frequency Calculator",
    shortDescription:
      "Calculate rotational frequency, angular velocity, or rotation period using f = ω / 2π.",
    category: "Physics",
    href: "/calculators/rotational-frequency-calculator",
    keywords: [
      "rotational frequency calculator",
      "angular velocity to frequency calculator",
      "rotation period calculator",
      "revolutions per second calculator",
    ],
  },
  {
    slug: "rotational-work-calculator",
    name: "Rotational Work Calculator",
    shortDescription:
      "Calculate rotational work, torque, or angular displacement using W = τθ.",
    category: "Physics",
    href: "/calculators/rotational-work-calculator",
    keywords: [
      "rotational work calculator",
      "torque angular displacement calculator",
      "work equals torque times angle",
      "rotational energy calculator",
    ],
  },
  {
    slug: "rotational-dynamics-calculator",
    name: "Rotational Dynamics Calculator",
    shortDescription:
      "Calculate torque, moment of inertia, or angular acceleration using τ = Iα.",
    category: "Physics",
    href: "/calculators/rotational-dynamics-calculator",
    keywords: [
      "rotational dynamics calculator",
      "torque moment of inertia calculator",
      "torque angular acceleration calculator",
      "tau equals I alpha calculator",
    ],
  },
  {
    slug: "angular-impulse-calculator",
    name: "Angular Impulse Calculator",
    shortDescription:
      "Calculate angular impulse, torque, or time using J = τt = ΔL.",
    category: "Physics",
    href: "/calculators/angular-impulse-calculator",
    keywords: [
      "angular impulse calculator",
      "torque time calculator",
      "change in angular momentum calculator",
      "rotational impulse calculator",
    ],
  },
  {
    slug: "angular-momentum-calculator",
    name: "Angular Momentum Calculator",
    shortDescription:
      "Calculate angular momentum, moment of inertia, or angular velocity using L = Iω.",
    category: "Physics",
    href: "/calculators/angular-momentum-calculator",
    keywords: [
      "angular momentum calculator",
      "moment of inertia angular velocity calculator",
      "L equals I omega calculator",
      "rotational momentum calculator",
    ],
  },
  {
    slug: "rotational-power-calculator",
    name: "Rotational Power Calculator",
    shortDescription:
      "Calculate rotational power, torque, or angular velocity using P = τω.",
    category: "Physics",
    href: "/calculators/rotational-power-calculator",
    keywords: [
      "rotational power calculator",
      "torque angular velocity calculator",
      "power equals torque times angular velocity",
      "rotational mechanics calculator",
    ],
  },
  {
    slug: "moment-of-inertia-calculator",
    name: "Moment of Inertia Calculator",
    shortDescription:
      "Calculate moment of inertia for point masses, disks, hoops, spheres, shells, and rods.",
    category: "Physics",
    href: "/calculators/moment-of-inertia-calculator",
    keywords: [
      "moment of inertia calculator",
      "rotational inertia calculator",
      "disk sphere rod inertia calculator",
      "moment of inertia formulas",
    ],
  },
  {
    slug: "rotational-kinetic-energy-calculator",
    name: "Rotational Kinetic Energy Calculator",
    shortDescription:
      "Calculate rotational kinetic energy, moment of inertia, or angular velocity using KErot = ½Iω².",
    category: "Physics",
    href: "/calculators/rotational-kinetic-energy-calculator",
    keywords: [
      "rotational kinetic energy calculator",
      "moment of inertia calculator",
      "angular velocity energy calculator",
      "one half i omega squared",
    ],
  },
  {
    slug: "angular-acceleration-calculator",
    name: "Angular Acceleration Calculator",
    shortDescription:
      "Calculate angular acceleration, angular velocity change, or time using α = Δω ÷ t.",
    category: "Physics",
    href: "/calculators/angular-acceleration-calculator",
    keywords: [
      "angular acceleration calculator",
      "angular velocity change calculator",
      "rotational acceleration calculator",
      "alpha equals delta omega over time",
    ],
  },

  {
    slug: "angular-displacement-calculator",
    name: "Angular Displacement Calculator",
    shortDescription:
      "Calculate angular displacement, angular velocity, or time using θ = ω × t.",
    category: "Physics",
    href: "/calculators/angular-displacement-calculator",
    keywords: [
      "angular displacement calculator",
      "angular displacement formula",
      "theta omega time calculator",
      "rotational motion calculator",
    ],
  },
  {
    slug: "angular-velocity-calculator",
    name: "Angular Velocity Calculator",
    shortDescription:
      "Calculate angular velocity, angular displacement, or time using ω = θ ÷ t.",
    category: "Physics",
    href: "/calculators/angular-velocity-calculator",
    keywords: [
      "angular velocity calculator",
      "angular displacement calculator",
      "rotational motion calculator",
      "omega equals theta over time",
    ],
  },
  {
    slug: "centripetal-acceleration-calculator",
    name: "Centripetal Acceleration Calculator",
    shortDescription:
      "Calculate centripetal acceleration, velocity, or radius using ac = v² ÷ r.",
    category: "Physics",
    href: "/calculators/centripetal-acceleration-calculator",
    keywords: [
      "centripetal acceleration calculator",
      "circular acceleration calculator",
      "velocity radius acceleration calculator",
      "ac equals v squared over r",
    ],
  },
  {
    slug: "circular-velocity-calculator",
    name: "Circular Velocity Calculator",
    shortDescription:
      "Calculate circular velocity, radius, or period using v = 2πr ÷ T.",
    category: "Physics",
    href: "/calculators/circular-velocity-calculator",
    keywords: [
      "circular velocity calculator",
      "tangential velocity calculator",
      "radius period velocity calculator",
      "v equals 2 pi r over t",
    ],
  },
  {
    slug: "centripetal-force-calculator",
    name: "Centripetal Force Calculator",
    shortDescription:
      "Calculate centripetal force, mass, velocity, or radius using Fc = mv² ÷ r.",
    category: "Physics",
    href: "/calculators/centripetal-force-calculator",
    keywords: [
      "centripetal force calculator",
      "circular motion calculator",
      "mass velocity radius calculator",
      "fc equals mv squared over r",
    ],
  },
  {
    slug: "torque-calculator",
    name: "Torque Calculator",
    shortDescription:
      "Calculate torque, force, or lever-arm distance using τ = Fr.",
    category: "Physics",
    href: "/calculators/torque-calculator",
    keywords: [
      "torque calculator",
      "force lever arm calculator",
      "newton meter calculator",
      "rotational force calculator",
    ],
  },
  {
    slug: "impulse-calculator",
    name: "Impulse Calculator",
    shortDescription:
      "Calculate impulse, force, or time interval using J = FΔt.",
    category: "Physics",
    href: "/calculators/impulse-calculator",
    keywords: [
      "impulse calculator",
      "force time impulse calculator",
      "impulse momentum calculator",
      "newton second calculator",
    ],
  },


  {
    slug: "acceleration-due-to-gravity-calculator",
    name: "Acceleration Due to Gravity Calculator",
    shortDescription:
      "Calculate gravitational acceleration from the mass and radius of a planet or celestial body using g = GM / r².",
    category: "Physics",
    href: "/calculators/acceleration-due-to-gravity-calculator",
    keywords: [
      "acceleration due to gravity calculator",
      "gravitational acceleration calculator",
      "gravity calculator",
      "surface gravity calculator",
    ],
  },
  {
    slug: "free-fall-calculator",
    name: "Free Fall Calculator",
    shortDescription:
      "Calculate free fall distance, final velocity, or fall time using gravity equations.",
    category: "Physics",
    href: "/calculators/free-fall-calculator",
    keywords: [
      "free fall calculator",
      "fall time calculator",
      "free fall velocity calculator",
      "gravity calculator",
    ],
  },
  {
    slug: "projectile-motion-calculator",
    name: "Projectile Motion Calculator",
    shortDescription:
      "Calculate projectile range, maximum height, and flight time using velocity, angle, and gravity.",
    category: "Physics",
    href: "/calculators/projectile-motion-calculator",
    keywords: [
      "projectile motion calculator",
      "projectile range calculator",
      "maximum height calculator",
      "flight time calculator",
    ],
  },
  {
    slug: "pressure-calculator",
    name: "Pressure Calculator",
    shortDescription:
      "Calculate pressure, force, or area using P = F ÷ A.",
    category: "Physics",
    href: "/calculators/pressure-calculator",
    keywords: [
      "pressure calculator",
      "force area pressure calculator",
      "p equals f over a calculator",
      "pascal calculator",
    ],
  },
  {
    slug: "hookes-law-calculator",
    name: "Hooke’s Law Calculator",
    shortDescription:
      "Calculate force, spring constant, or extension using Hooke’s law F = kx.",
    category: "Physics",
    href: "/calculators/hookes-law-calculator",
    keywords: [
      "hookes law calculator",
      "hooke law calculator",
      "spring force calculator",
      "force spring constant extension calculator",
    ],
  },
  {
    slug: "elastic-potential-energy-calculator",
    name: "Elastic Potential Energy Calculator",
    shortDescription:
      "Calculate elastic potential energy, spring constant, or extension using E = ½kx².",
    category: "Physics",
    href: "/calculators/elastic-potential-energy-calculator",
    keywords: [
      "elastic potential energy calculator",
      "spring energy calculator",
      "spring constant calculator",
      "extension calculator",
    ],
  },
  {
    slug: "gravitational-potential-energy-calculator",
    name: "Gravitational Potential Energy Calculator",
    shortDescription:
      "Calculate gravitational potential energy, mass, gravity, or height using PE = mgh.",
    category: "Physics",
    href: "/calculators/gravitational-potential-energy-calculator",
    keywords: [
      "gravitational potential energy calculator",
      "potential energy calculator",
      "PE mgh calculator",
      "mass gravity height calculator",
    ],
  },
  {
    slug: "kinetic-energy-calculator",
    name: "Kinetic Energy Calculator",
    shortDescription:
      "Calculate kinetic energy, mass, or speed using the classical motion-energy formula.",
    category: "Physics",
    href: "/calculators/kinetic-energy-calculator",
    keywords: [
      "kinetic energy calculator",
      "ke calculator",
      "mass speed energy calculator",
      "kinetic energy formula calculator",
    ],
  },
  {
    slug: "momentum-calculator",
    name: "Momentum Calculator",
    shortDescription:
      "Calculate momentum, mass, or velocity using the linear momentum formula.",
    category: "Physics",
    href: "/calculators/momentum-calculator",
    keywords: [
      "momentum calculator",
      "linear momentum calculator",
      "mass velocity momentum calculator",
      "p equals mv calculator",
    ],
  },
  {
    slug: "distance-calculator",
    name: "Distance Calculator",
    shortDescription:
      "Calculate distance, speed, or time using the motion formula d = v × t.",
    category: "Physics",
    href: "/calculators/distance-calculator",
    keywords: [
      "distance calculator",
      "speed distance time calculator",
      "distance formula calculator",
      "calculate distance from speed and time",
    ],
  },
  {
    slug: "displacement-calculator",
    name: "Displacement Calculator",
    shortDescription:
      "Calculate displacement, initial position, or final position using Δx = x₂ − x₁.",
    category: "Physics",
    href: "/calculators/displacement-calculator",
    keywords: [
      "displacement calculator",
      "initial final position calculator",
      "change in position calculator",
      "displacement formula calculator",
    ],
  },
  {
    slug: "average-speed-calculator",
    name: "Average Speed Calculator",
    shortDescription:
      "Calculate average speed, total distance, or elapsed time using s̄ = d ÷ t.",
    category: "Physics",
    href: "/calculators/average-speed-calculator",
    keywords: [
      "average speed calculator",
      "distance time calculator",
      "speed distance time calculator",
      "average speed formula calculator",
    ],
  },
  {
    slug: "average-velocity-calculator",
    name: "Average Velocity Calculator",
    shortDescription:
      "Calculate average velocity, displacement, or elapsed time using v̄ = Δx ÷ Δt.",
    category: "Physics",
    href: "/calculators/average-velocity-calculator",
    keywords: [
      "average velocity calculator",
      "displacement time calculator",
      "velocity displacement time calculator",
      "average velocity formula calculator",
    ],
  },
  {
    slug: "kinematic-equations-calculator",
    name: "Kinematic Equations Calculator",
    shortDescription:
      "Solve initial velocity, final velocity, acceleration, time, or displacement using four SUVAT equations.",
    category: "Physics",
    href: "/calculators/kinematic-equations-calculator",
    keywords: [
      "kinematic equations calculator",
      "SUVAT calculator",
      "motion equations calculator",
      "constant acceleration calculator",
      "final velocity calculator",
      "kinematics calculator",
    ],
  },
  {
    slug: "acceleration-calculator",
    name: "Acceleration Calculator",
    shortDescription:
      "Calculate acceleration, initial velocity, final velocity, or time from three known values.",
    category: "Physics",
    href: "/calculators/acceleration-calculator",
    keywords: [
      "acceleration calculator",
      "initial velocity calculator",
      "final velocity calculator",
      "velocity and time calculator",
    ],
  },
  {
    slug: "density-calculator",
    name: "Density Calculator",
    shortDescription:
      "Calculate density, mass, or volume using laboratory measurements.",
    category: "Physics",
    href: "/calculators/density-calculator",
    keywords: ["density calculator for students"],
  },
  {
    slug: "specific-heat-calculator",
    name: "Specific Heat Calculator",
    shortDescription:
      "Calculate heat energy, mass, temperature change, or specific heat capacity.",
    category: "Physics",
    href: "/calculators/specific-heat-calculator",
    keywords: ["specific heat calculator"],
  },
];
