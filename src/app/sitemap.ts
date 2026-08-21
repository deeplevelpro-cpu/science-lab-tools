import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo/url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/about"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/editorial-policy"),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: absoluteUrl("/disclaimer"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/privacy-policy"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/terms-of-use"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/calculators"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/calculators/physics"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/calculators/chemistry"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/calculators/laboratory"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/calculators/percent-error-calculator"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/calculators/percent-difference-calculator"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/significant-figures-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/coefficient-variation-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/mean-median-mode-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/standard-deviation-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/uncertainty-propagation-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/measurement-uncertainty-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/rate-of-change-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/linear-regression-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/calculators/molarity-calculator"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/calculators/molality-calculator"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/calculators/mass-moles-calculator"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/calculators/dilution-calculator"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/molecular-weight-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/empirical-formula-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/molecular-formula-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/stoichiometry-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/limiting-reactant-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/percent-yield-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/calculators/ph-calculator"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/ideal-gas-law-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/boyles-law-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/charles-law-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/combined-gas-law-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/avogadros-law-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/daltons-law-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/grahams-law-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/gay-lussacs-law-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/pulley-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/inclined-plane-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/friction-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/normal-force-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/weight-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/calculators/force-calculator"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/calculators/power-calculator"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/calculators/work-calculator"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/tangential-acceleration-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/tangential-velocity-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/rpm-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/revolutions-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/rotational-frequency-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/rotational-work-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/rotational-dynamics-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/angular-impulse-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/angular-momentum-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/rotational-power-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/moment-of-inertia-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/rotational-kinetic-energy-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/angular-acceleration-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: absoluteUrl(
        "/calculators/angular-displacement-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/angular-velocity-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/centripetal-acceleration-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/circular-velocity-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/centripetal-force-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/torque-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/impulse-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },


    {
      url: absoluteUrl(
        "/calculators/acceleration-due-to-gravity-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/free-fall-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/projectile-motion-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/pressure-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/hookes-law-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/elastic-potential-energy-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/gravitational-potential-energy-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/kinetic-energy-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/calculators/momentum-calculator"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/distance-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/displacement-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/average-speed-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/average-velocity-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/kinematic-equations-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/calculators/acceleration-calculator"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/calculators/density-calculator"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/calculators/specific-heat-calculator"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/lab-reports"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/lab-reports/how-to-write-a-lab-report"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/lab-reports/lab-report-format"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/lab-reports/lab-report-introduction"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/lab-reports/materials-and-methods"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/lab-reports/lab-report-results"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/lab-reports/lab-report-discussion"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/lab-reports/lab-report-conclusion"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(
        "/lab-reports/significant-figures-in-lab-reports",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/lab-reports/tables-and-graphs"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/lab-reports/lab-report-template"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/scientific-method"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/scientific-method/steps-of-the-scientific-method",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(
        "/scientific-method/scientific-question",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(
        "/scientific-method/how-to-write-a-hypothesis",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(
        "/scientific-method/independent-dependent-controlled-variables",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(
        "/scientific-method/control-group-and-experimental-group",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(
        "/scientific-method/experimental-design",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(
        "/scientific-method/collect-and-record-data",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(
        "/scientific-method/analyze-experimental-results",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/templates"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(
        "/templates/printable-lab-report-template",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(
        "/templates/scientific-method-worksheet",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(
        "/templates/experiment-planning-template",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(
        "/templates/data-table-template",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(
        "/templates/graphing-scientific-data-worksheet",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(
        "/templates/variables-worksheet",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
