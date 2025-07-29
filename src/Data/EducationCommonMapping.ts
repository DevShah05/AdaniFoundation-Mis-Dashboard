// src/Data/EducationCommonMapping.ts

export const EducationCommonMapping: Record<
  string,
  {
    plannedField: string;
    executedField: string;
    girlsField: string;
    boysField: string;
  }
> = {
  // 1. New Classroom Construction
  "New Classroom Construction": {
    plannedField: "noOfClassroomsPlanned",
    executedField: "noOfClassroomsConstructed",
    girlsField: "noOfGirlsStudentsBenefited",
    boysField: "noOfBoysStudentsBenefited",
  },

  // 2. Toilet Construction
  "Toilet Construction": {
    plannedField: "noOfGirlsToiletsPlanned", // Or combine total of both?
    executedField: "noOfGirlsToiletsConstructed", // Adjust if needed
    girlsField: "noOfGirlsStudentsBenefited",
    boysField: "noOfBoyStudentsBenefited",
  },

  // 3. Drinking Water Facilities
  "Drinking Water Facilities": {
    plannedField: "noOfUnitsPlanned",
    executedField: "noOfUnitsExecuted",
    girlsField: "noOfGirlStudentsBenefited",
    boysField: "noOfBoyStudentsBenefited",
  },

  // 4. Boundary Wall Construction
  "Boundary Wall Construction": {
    plannedField: "noOfUnitsPlanned",
    executedField: "noOfUnitsExecuted",
    girlsField: "noOfGirlStudentsBenefited",
    boysField: "noOfBoyStudentsBenefited",
  },

  // 5. Kitchen Shed Construction
  "Kitchen Shed Construction": {
    plannedField: "noOfUnitsPlanned",
    executedField: "noOfUnitsExecuted",
    girlsField: "noOfGirlStudentsBenefited",
    boysField: "noOfBoyStudentsBenefited",
  },

  // 6. Repair and Renovation
  "Repair and Renovation": {
    plannedField: "noOfUnitsPlanned",
    executedField: "noOfUnitsExecuted",
    girlsField: "noOfGirlStudentsBenefited",
    boysField: "noOfBoyStudentsBenefited",
  },

  // 7. Smart Class Development
  "Smart Class Development": {
    plannedField: "noOfUnitsPlanned",
    executedField: "noOfUnitsExecuted",
    girlsField: "noOfGirlsStudentsBenefited",
    boysField: "noOfBoyStudentsBenefited",
  },

  // 8. Seating Arrangement
  "Seating Arrangement": {
    plannedField: "noOfDeskBenchesPlanned",
    executedField: "noOfDeskBenchesProvided",
    girlsField: "noOfGirlStudentsBenefited",
    boysField: "noOfBoyStudentsBenefited",
  },

  // 9. School Playground Development
  "School Playground Development": {
    plannedField: "noOfPlaygroundsPlanned",
    executedField: "noOfPlaygroundsDeveloped",
    girlsField: "noOfGirlsStudentsBenefited",
    boysField: "noOfBoyStudentsBenefited",
  },

  // 10. Other Infra Development
  "Other Infra Development": {
    plannedField: "noOfUnitsPlanned",
    executedField: "noOfUnitsExecuted",
    girlsField: "noOfGirlsStudentsBenefited",
    boysField: "noOfBoysStudentsBenefited",
  },

  // 11. Utthan
  Utthan: {
    plannedField: "noOfSchoolsCovered",
    executedField: "noOfUtthanSahayaksDeployed",
    girlsField: "noOfGirlsStudentsBenefited",
    boysField: "noOfBoyStudentsBenefited",
  },

  // 12. Adani Competitive Coaching Centre
  "Adani Competitive Coaching Centre": {
    plannedField: "noOfUnits",
    executedField: "noOfResourcePersonDeployed",
    girlsField: "noOfFemaleYouthCovered",
    boysField: "noOfMaleYouthCovered",
  },
};
