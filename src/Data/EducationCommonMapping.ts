// src/Data/EducationCommonMapping.ts

export type EducationMapEntry = {
  /** Main fields used in charts/KPIs */
  plannedField: string;
  executedField: string;
  girlsField: string;
  boysField: string;

  /**
   * Optional additional numeric fields you may want to display in tables
   * or sum elsewhere (not used by charts). These must also exist in
   * educationFieldLabelMap to show friendly labels.
   */
  extraFields?: string[];
};

export const EducationCommonMapping: Record<string, EducationMapEntry> = {
  "New Classroom Construction": {
    plannedField: "numClassroomsPlanned",
    executedField: "numClassroomsConstructed",
    girlsField: "numGirlStudentsBenefited",
    boysField: "numBoyStudentsBenefited",
  },

  "Toilet Construction": {
    plannedField: "numGirlToiletsPlanned",
    executedField: "numGirlToiletsConstructed",
    girlsField: "numGirlStudentsBenefited",
    boysField: "numBoyStudentsBenefited",
    // also track boys’ toilets separately for the table
    extraFields: ["numBoyToiletsPlanned", "numBoyToiletsConstructed"],
  },

  "Drinking Water Facilities": {
    plannedField: "numUnitsPlanned",
    executedField: "numUnitsExecuted",
    girlsField: "numGirlStudentsBenefited",
    boysField: "numBoyStudentsBenefited",
  },

  // Note: your payload shows this subActivity as “ Boundary Wall Construction”
  "School Boundary Wall Construction": {
    plannedField: "numUnitsPlanned",
    executedField: "numUnitsExecuted",
    girlsField: "numGirlStudentsBenefited",
    boysField: "numBoyStudentsBenefited",
    // API field is lengthInMeters (make sure your label map has this exact key)
    extraFields: ["lengthInMeters"],
  },

  "Kitchen Shed Construction": {
    plannedField: "numUnitsPlanned",
    executedField: "numUnitsExecuted",
    girlsField: "numGirlStudentsBenefited",
    boysField: "numBoyStudentsBenefited",
  },

  "Repair and Renovation": {
    plannedField: "numUnitsPlanned",
    executedField: "numUnitsExecuted",
    girlsField: "numGirlStudentsBenefited",
    boysField: "numBoyStudentsBenefited",
    // Optionally show description in table if you want
    // (keep it out of charts since it's not numeric)
    // extraFields: ["workDescription"],
  },

  "Smart Class Development": {
    plannedField: "numUnitsPlanned",
    executedField: "numUnitsExecuted",
    girlsField: "numGirlStudentsBenefited",
    boysField: "numBoyStudentsBenefited",
  },

  "Seating Arrangement": {
    plannedField: "numDeskBenchesPlanned",
    executedField: "numDeskBenchesProvided",
    girlsField: "numGirlStudentsBenefited",
    boysField: "numBoyStudentsBenefited",
  },

  "School Playground Development": {
    plannedField: "numPlaygroundsPlanned",
    executedField: "numPlaygroundsDeveloped",
    girlsField: "numGirlStudentsBenefited",
    boysField: "numBoyStudentsBenefited",
  },

  "Other Infra Development": {
    plannedField: "numUnitsPlanned",
    executedField: "numUnitsExecuted",
    girlsField: "numGirlStudentsBenefited",
    boysField: "numBoyStudentsBenefited",
  },

  Utthan: {
    plannedField: "numSchoolsCovered",
    executedField: "numUtthanSahayaksDeployed",
    girlsField: "numGirlStudentsBenefited",
    boysField: "numBoyStudentsBenefited",
    // from your payload
    extraFields: ["baselineDataPercentage", "outcomePercentage"],
  },

  "Adani Coaching Competitive Centre": {
    plannedField: "numUnits",
    executedField: "numResourcePersonDeployed",
    girlsField: "numFemaleYouthCovered",
    boysField: "numMaleYouthCovered",
    // from your payload
    extraFields: ["totalCandidateSelectedGovOtherJobs"],
  },
};

