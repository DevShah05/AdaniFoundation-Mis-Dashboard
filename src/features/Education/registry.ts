import { buildQuery } from "../../utils/buildQuery";

export type EndpointSet = {
  list: (p?: Record<string, any>) => string;
  kpis?: Record<string, (p?: Record<string, any>) => string>;
};

export const EducationApiRegistry: Record<string, EndpointSet> = {
  "schoolInfra.newClassroom": {
    list: (p = {}) => `/api/education/school-infrastructure/new-classroom-construction${buildQuery(p)}`,
    kpis: {
      cumulativeClassroomsConstructed: (p = {}) =>
        `/api/education/school-infrastructure/new-classroom-construction/cumulative-classrooms-constructed${buildQuery(p)}`,
    },
  },
  "schoolInfra.toilet": {
    list: (p = {}) => `/api/education/school-infrastructure/toilet-construction${buildQuery(p)}`,
    kpis: {
      cumulativeGirlToiletsConstructed: (p = {}) =>
        `/api/education/school-infrastructure/toilet-construction/cumulative-girl-toilets-constructed${buildQuery(p)}`,
      cumulativeBoyToiletsConstructed: (p = {}) =>
        `/api/education/school-infrastructure/toilet-construction/cumulative-boy-toilets-constructed${buildQuery(p)}`,
    },
  },
  "schoolInfra.drinkingWater": {
    list: (p = {}) => `/api/education/school-infrastructure/drinking-water-facilities${buildQuery(p)}`,
    kpis: {
      cumulativeUnitsExecuted: (p = {}) =>
        `/api/education/school-infrastructure/drinking-water-facilities/cumulative-units-executed${buildQuery(p)}`,
    },
  },
  "schoolInfra.boundaryWall": {
    list: (p = {}) => `/api/education/school-infrastructure/boundary-wall-construction${buildQuery(p)}`,
    kpis: {
      cumulativeUnitsExecuted: (p = {}) =>
        `/api/education/school-infrastructure/boundary-wall-construction/cumulative-units-executed${buildQuery(p)}`,
    },
  },
  "schoolInfra.kitchenShed": {
    list: (p = {}) => `/api/education/school-infrastructure/kitchen-shed-construction${buildQuery(p)}`,
    kpis: {
      cumulativeUnitsExecuted: (p = {}) =>
        `/api/education/school-infrastructure/kitchen-shed-construction/cumulative-units-executed${buildQuery(p)}`,
    },
  },
  "schoolInfra.repairRenovation": {
    list: (p = {}) => `/api/education/school-infrastructure/repair-renovation${buildQuery(p)}`,
    kpis: {
      cumulativeUnitsExecuted: (p = {}) =>
        `/api/education/school-infrastructure/repair-renovation/cumulative-units-executed${buildQuery(p)}`,
    },
  },
  "schoolInfra.smartClass": {
    list: (p = {}) => `/api/education/school-infrastructure/smart-class-development${buildQuery(p)}`,
    kpis: {
      cumulativeUnitsExecuted: (p = {}) =>
        `/api/education/school-infrastructure/smart-class-development/cumulative-units-executed${buildQuery(p)}`,
    },
  },
  "schoolInfra.seating": {
    list: (p = {}) => `/api/education/school-infrastructure/seating-arrangement${buildQuery(p)}`,
    kpis: {
      cumulativeDeskBenchesProvided: (p = {}) =>
        `/api/education/school-infrastructure/seating-arrangement/cumulative-desk-benches-provided${buildQuery(p)}`,
    },
  },
  "schoolInfra.playground": {
    list: (p = {}) => `/api/education/school-infrastructure/playground-development${buildQuery(p)}`,
    kpis: {
      cumulativePlaygroundsDeveloped: (p = {}) =>
        `/api/education/school-infrastructure/playground-development/cumulative-playgrounds-developed${buildQuery(p)}`,
    },
  },
  "schoolInfra.otherInfra": {
    list: (p = {}) => `/api/education/school-infrastructure/other-infra-development${buildQuery(p)}`,
    kpis: {
      cumulativeUnitsExecuted: (p = {}) =>
        `/api/education/school-infrastructure/other-infra-development/cumulative-units-executed${buildQuery(p)}`,
    },
  },

  "utthan.main": {
    list: (p = {}) => `/api/education/utthan-form${buildQuery(p)}`,
    kpis: {
      cumulativeSchoolsCovered: (p = {}) =>
        `/api/education/utthan-form/cumulative-schools-covered${buildQuery(p)}`,
      cumulativeSahayaksDeployed: (p = {}) =>
        `/api/education/utthan-form/cumulative-sahayaks-deployed${buildQuery(p)}`,
    },
  },

  "coaching.main": {
    list: (p = {}) => `/api/education/adani-coaching-competitive-center${buildQuery(p)}`,
    kpis: {
      cumulativeDeployed: (p = {}) =>
        `/api/education/adani-coaching-competitive-center/cumulative-deployed${buildQuery(p)}`,
    },
  },
};

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

export const ALL_FORM_KEYS = [
  ...SCHOOL_INFRA_KEYS,
  "utthan.main",
  "coaching.main",
] as const;

export function getFormKeysForSelection(activity: string, subActivity?: string): string[] {
  if (!activity) return ALL_FORM_KEYS.slice();

  if (activity === "School Infrastructure") {
    if (!subActivity) return SCHOOL_INFRA_KEYS.slice();
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

export function attachActivityNames(formKey: string) {
  if (formKey.startsWith("schoolInfra.")) {
    const map: Record<string, string> = {
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
    return { activity: "School Infrastructure", subActivity: map[formKey] };
  }
  if (formKey === "utthan.main")   return { activity: "Utthan", subActivity: "" };
  if (formKey === "coaching.main") return { activity: "Adani Competitive Coaching Centre", subActivity: "" };
  return { activity: "", subActivity: "" };
}
