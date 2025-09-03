// src/features/Education/registry.ts
import { buildQuery, type QueryValue } from "../../utils/buildQuery";

export type EndpointFn = (p?: Record<string, QueryValue>) => string;
export type EndpointSet = {
  list: EndpointFn;
  kpis?: Record<string, EndpointFn>; // keep string index to avoid TS 'never' with unions
};

// tiny helper to avoid repeating `${buildQuery(p)}`
const endpoint = (path: string): EndpointFn => (p = {}) => `${path}${buildQuery(p)}`;

export const EducationApiRegistry = {
  "schoolInfra.newClassroom": {
    list: endpoint(`/api/education/school-infrastructure/new-classroom-construction`),
    kpis: {
      cumulativeClassroomsConstructed: endpoint(
        `/api/education/school-infrastructure/new-classroom-construction/cumulative-classrooms-constructed`
      ),
    },
  },
  "schoolInfra.toilet": {
    list: endpoint(`/api/education/school-infrastructure/toilet-construction`),
    kpis: {
      cumulativeGirlToiletsConstructed: endpoint(
        `/api/education/school-infrastructure/toilet-construction/cumulative-girl-toilets-constructed`
      ),
      cumulativeBoyToiletsConstructed: endpoint(
        `/api/education/school-infrastructure/toilet-construction/cumulative-boy-toilets-constructed`
      ),
    },
  },
  "schoolInfra.drinkingWater": {
    list: endpoint(`/api/education/school-infrastructure/drinking-water-facilities`),
    kpis: {
      cumulativeUnitsExecuted: endpoint(
        `/api/education/school-infrastructure/drinking-water-facilities/cumulative-units-executed`
      ),
    },
  },
  "schoolInfra.boundaryWall": {
    list: endpoint(`/api/education/school-infrastructure/boundary-wall-construction`),
    kpis: {
      cumulativeUnitsExecuted: endpoint(
        `/api/education/school-infrastructure/boundary-wall-construction/cumulative-units-executed`
      ),
    },
  },
  "schoolInfra.kitchenShed": {
    list: endpoint(`/api/education/school-infrastructure/kitchen-shed-construction`),
    kpis: {
      cumulativeUnitsExecuted: endpoint(
        `/api/education/school-infrastructure/kitchen-shed-construction/cumulative-units-executed`
      ),
    },
  },
  "schoolInfra.repairRenovation": {
    list: endpoint(`/api/education/school-infrastructure/repair-renovation`),
    kpis: {
      cumulativeUnitsExecuted: endpoint(
        `/api/education/school-infrastructure/repair-renovation/cumulative-units-executed`
      ),
    },
  },
  "schoolInfra.smartClass": {
    list: endpoint(`/api/education/school-infrastructure/smart-class-development`),
    kpis: {
      cumulativeUnitsExecuted: endpoint(
        `/api/education/school-infrastructure/smart-class-development/cumulative-units-executed`
      ),
    },
  },
  "schoolInfra.seating": {
    list: endpoint(`/api/education/school-infrastructure/seating-arrangement`),
    kpis: {
      cumulativeDeskBenchesProvided: endpoint(
        `/api/education/school-infrastructure/seating-arrangement/cumulative-desk-benches-provided`
      ),
    },
  },
  "schoolInfra.playground": {
    list: endpoint(`/api/education/school-infrastructure/playground-development`),
    kpis: {
      cumulativePlaygroundsDeveloped: endpoint(
        `/api/education/school-infrastructure/playground-development/cumulative-playgrounds-developed`
      ),
    },
  },
  "schoolInfra.otherInfra": {
    list: endpoint(`/api/education/school-infrastructure/other-infra-development`),
    kpis: {
      cumulativeUnitsExecuted: endpoint(
        `/api/education/school-infrastructure/other-infra-development/cumulative-units-executed`
      ),
    },
  },

  "utthan.main": {
    list: endpoint(`/api/education/utthan-form`),
    kpis: {
      cumulativeSchoolsCovered: endpoint(`/api/education/utthan-form/cumulative-schools-covered`),
      cumulativeSahayaksDeployed: endpoint(`/api/education/utthan-form/cumulative-sahayaks-deployed`),
    },
  },

  "coaching.main": {
    list: endpoint(`/api/education/adani-coaching-competitive-center`),
    kpis: {
      cumulativeDeployed: endpoint(`/api/education/adani-coaching-competitive-center/cumulative-deployed`),
    },
  },
} as const;

export type Registry = typeof EducationApiRegistry;
export type FormKey = keyof Registry & string;

export const SCHOOL_INFRA_KEYS = [
  "schoolInfra.newClassroom",
  "schoolInfra.toilet",
  "schoolInfra.drinkingWater",
  "schoolInfra.boundaryWall",
  "schoolInfra.kitchenShed",
  "schoolInfra.repairRenovation",
  "schoolInfra.smartClass",
  "schoolInfra.seating",
  "schoolInfra.playground",
  "schoolInfra.otherInfra",
] as const;
export type SchoolInfraKey = (typeof SCHOOL_INFRA_KEYS)[number];

export const ALL_FORM_KEYS = [
  ...SCHOOL_INFRA_KEYS,
  "utthan.main",
  "coaching.main",
] as const;
export type AllFormKey = (typeof ALL_FORM_KEYS)[number];

/** Given UI selections, return which form keys to call */
export function getFormKeysForSelection(activity?: string, subActivity?: string): FormKey[] {
  if (!activity) return [...(ALL_FORM_KEYS as readonly string[])] as FormKey[];

  if (activity === "School Infrastructure") {
    if (!subActivity) return [...(SCHOOL_INFRA_KEYS as readonly string[])] as FormKey[];
    switch (subActivity) {
      case "New Classroom Construction":     return ["schoolInfra.newClassroom"];
      case "Toilet Construction":            return ["schoolInfra.toilet"];
      case "Drinking Water Facilities":      return ["schoolInfra.drinkingWater"];
      case "Boundary Wall Construction":     return ["schoolInfra.boundaryWall"];
      case "Kitchen Shed Construction":      return ["schoolInfra.kitchenShed"];
      case "Repair and Renovation":          return ["schoolInfra.repairRenovation"];
      case "Smart Class Development":        return ["schoolInfra.smartClass"];
      case "Seating Arrangement":            return ["schoolInfra.seating"];
      case "School Playground Development":  return ["schoolInfra.playground"];
      case "Other Infra Development":        return ["schoolInfra.otherInfra"];
      default: return [];
    }
  }

  if (activity === "Utthan") return ["utthan.main"];
  if (activity === "Adani Competitive Coaching Centre") return ["coaching.main"];
  return [];
}

/** For decorating rows with readable activity/sub-activity labels */
export function attachActivityNames(formKey: FormKey): { activity: string; subActivity: string } {
  if ((SCHOOL_INFRA_KEYS as readonly string[]).includes(formKey)) {
    const map: Record<SchoolInfraKey, string> = {
      "schoolInfra.newClassroom":     "New Classroom Construction",
      "schoolInfra.toilet":           "Toilet Construction",
      "schoolInfra.drinkingWater":    "Drinking Water Facilities",
      "schoolInfra.boundaryWall":     "Boundary Wall Construction",
      "schoolInfra.kitchenShed":      "Kitchen Shed Construction",
      "schoolInfra.repairRenovation": "Repair and Renovation",
      "schoolInfra.smartClass":       "Smart Class Development",
      "schoolInfra.seating":          "Seating Arrangement",
      "schoolInfra.playground":       "School Playground Development",
      "schoolInfra.otherInfra":       "Other Infra Development",
    };
    return { activity: "School Infrastructure", subActivity: map[formKey as SchoolInfraKey] };
  }
  if (formKey === "utthan.main")   return { activity: "Utthan", subActivity: "" };
  if (formKey === "coaching.main") return { activity: "Adani Competitive Coaching Centre", subActivity: "" };
  return { activity: "", subActivity: "" };
}

