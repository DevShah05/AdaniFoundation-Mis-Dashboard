// src/Data/CommunityHealthCommonMapping.ts

export const CommunityHealthCommonMapping: Record<
  string,
  {
    plannedField: string;
    executedField: string;
    girlsField: string;
    boysField: string;
  }
> = {
  // 1. MHCU
  MHCU: {
    plannedField: "noOfVisitsPlanned",
    executedField: "noOfVisitsCompleted",
    girlsField: "noOfFemaleConsultations",
    boysField: "noOfMaleConsultations",
  },

  // 2. Health Camps → General Health Camps
  "General Health Camps": {
    plannedField: "noOfGeneralHealthCampsPlanned",
    executedField: "noOfGeneralHealthCampsExecuted",
    girlsField: "noOfFemaleConsultations",
    boysField: "noOfMaleConsultations",
  },

  // 2. Health Camps → Special Health Camps
  "Special Health Camps": {
    plannedField: "noOfSpecialHealthCampsPlanned",
    executedField: "noOfSpecialHealthCampsExecuted",
    girlsField: "noOfFemaleConsultations",
    boysField: "noOfMaleConsultations",
  },

  // 3. Health Centre Details
  "Health Centre Details": {
    plannedField: "noOfHealthCentresAtSite",
    executedField: "noOfHealthCentresAtSite", // No separate executed value
    girlsField: "noOfFemaleConsultationsBenefited",
    boysField: "noOfMaleConsultationsBenefited",
  },

  // 4. TB Ration Kit
  "TB Ration Kit": {
    plannedField: "noOfUnitsDistributed",
    executedField: "noOfUnitsDistributed",
    girlsField: "noOfFemalePatientsSupported",
    boysField: "noOfMalePatientsSupported",
  },

  // 5. Menstrual Hygiene Vending Machine
  "Menstrual Hygiene Vending Machine": {
    plannedField: "noOfUnitsDeployed",
    executedField: "noOfHighSchoolsCollegesCovered",
    girlsField: "noOfAccessBeneficiariesGirls",
    boysField: "noOfAccessBeneficiariesGirls", // Boys not applicable
  },

  // 6. Health Infrastructure
  "Health Infrastructure": {
    plannedField: "noOfActivitiesPlanned",
    executedField: "noOfActivitiesCompleted",
    girlsField: "noOfFemaleVillagersBenefited",
    boysField: "noOfMaleVillagersBenefited",
  },

  // 7. Other Equipment Support to Government Centres
  "Other Equipment Support to Government Centres": {
    plannedField: "noOfUnitsPlanned",
    executedField: "noOfUnitsPlanned", // No separate executed value
    girlsField: "noOfFemaleAccessBeneficiaries",
    boysField: "noOfMaleAccessBeneficiaries",
  },

  // 8. Anganwadi → Repair-Painting
  "Repair-Painting": {
    plannedField: "noOfPaintingsPlanned",
    executedField: "noOfPaintingsCompleted",
    girlsField: "noOfGirlsBenefited",
    boysField: "noOfBoysBenefited",
  },

  // 8. Anganwadi → Repair-Others
  "Repair-Others": {
    plannedField: "noOfUnitsPlanned",
    executedField: "noOfUnitsExecuted",
    girlsField: "noOfBenefited",
    boysField: "noOfBenefited",
  },

  // 8. Anganwadi → Drinking Water Facility
  "Drinking Water Facility": {
    plannedField: "noOfUnitsPlanned",
    executedField: "noOfUnitsExecuted",
    girlsField: "noOfGirlsBenefited",
    boysField: "noOfBoysBenefited",
  },

  // 8. Anganwadi → New Anganwadi Construction
  "New Anganwadi Construction": {
    plannedField: "noOfAnganwadiCentersPlanned",
    executedField: "noOfAnganwadiCentersDeveloped",
    girlsField: "noOfGirlsBenefited",
    boysField: "noOfBoysBenefited",
  },

  // 8. Anganwadi → Boundary Wall
  "Boundary Wall": {
    plannedField: "noOfUnitsPlanned",
    executedField: "noOfUnitsExecuted",
    girlsField: "noOfBenefited",
    boysField: "noOfBenefited",
  },

  // 8. Anganwadi → Toilet Construction
  "Toilet Construction": {
    plannedField: "noOfToiletsPlanned",
    executedField: "noOfToiletsConstructed",
    girlsField: "noOfBenefited",
    boysField: "noOfBenefited",
  },

  // 8. Anganwadi → Seating Arrangement
  "Seating Arrangement": {
    plannedField: "noOfTableChairSetsPlanned",
    executedField: "noOfTableChairSetsProvided",
    girlsField: "noOfGirlsBenefited",
    boysField: "noOfBoysBenefited",
  },
};
