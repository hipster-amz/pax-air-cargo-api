/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createAircraftCost = /* GraphQL */ `mutation CreateAircraftCost(
  $condition: ModelAircraftCostConditionInput
  $input: CreateAircraftCostInput!
) {
  createAircraftCost(condition: $condition, input: $input) {
    aircraftType
    createdAt
    crewCost
    depreciationCost
    fuelBurnRatePerHour
    fuelCost
    id
    insuranceCost
    maintenanceCost
    otherCost
    totalCostPerHour
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateAircraftCostMutationVariables,
  APITypes.CreateAircraftCostMutation
>;
export const createAirportCurrency = /* GraphQL */ `mutation CreateAirportCurrency(
  $condition: ModelAirportCurrencyConditionInput
  $input: CreateAirportCurrencyInput!
) {
  createAirportCurrency(condition: $condition, input: $input) {
    cityName
    country
    createdAt
    currencyCode
    currencySymbol
    exchangeRateToUsd
    iataCode
    id
    region
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateAirportCurrencyMutationVariables,
  APITypes.CreateAirportCurrencyMutation
>;
export const createAuditLog = /* GraphQL */ `mutation CreateAuditLog(
  $condition: ModelAuditLogConditionInput
  $input: CreateAuditLogInput!
) {
  createAuditLog(condition: $condition, input: $input) {
    action
    changeData
    createdAt
    id
    tableName
    updatedAt
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateAuditLogMutationVariables,
  APITypes.CreateAuditLogMutation
>;
export const createHandlingRate = /* GraphQL */ `mutation CreateHandlingRate(
  $condition: ModelHandlingRateConditionInput
  $input: CreateHandlingRateInput!
) {
  createHandlingRate(condition: $condition, input: $input) {
    airportCode
    createdAt
    handlingCostPerTon
    id
    serviceType
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateHandlingRateMutationVariables,
  APITypes.CreateHandlingRateMutation
>;
export const createMarketBenchmark = /* GraphQL */ `mutation CreateMarketBenchmark(
  $condition: ModelMarketBenchmarkConditionInput
  $input: CreateMarketBenchmarkInput!
) {
  createMarketBenchmark(condition: $condition, input: $input) {
    benchmarkCostPerKg
    createdAt
    id
    marketShare
    route
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateMarketBenchmarkMutationVariables,
  APITypes.CreateMarketBenchmarkMutation
>;
export const createRouteData = /* GraphQL */ `mutation CreateRouteData(
  $condition: ModelRouteDataConditionInput
  $input: CreateRouteDataInput!
) {
  createRouteData(condition: $condition, input: $input) {
    createdAt
    destination
    distance
    frequency
    id
    origin
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateRouteDataMutationVariables,
  APITypes.CreateRouteDataMutation
>;
export const createSystemParameter = /* GraphQL */ `mutation CreateSystemParameter(
  $condition: ModelSystemParameterConditionInput
  $input: CreateSystemParameterInput!
) {
  createSystemParameter(condition: $condition, input: $input) {
    createdAt
    description
    id
    paramName
    paramValue
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateSystemParameterMutationVariables,
  APITypes.CreateSystemParameterMutation
>;
export const deleteAircraftCost = /* GraphQL */ `mutation DeleteAircraftCost(
  $condition: ModelAircraftCostConditionInput
  $input: DeleteAircraftCostInput!
) {
  deleteAircraftCost(condition: $condition, input: $input) {
    aircraftType
    createdAt
    crewCost
    depreciationCost
    fuelBurnRatePerHour
    fuelCost
    id
    insuranceCost
    maintenanceCost
    otherCost
    totalCostPerHour
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteAircraftCostMutationVariables,
  APITypes.DeleteAircraftCostMutation
>;
export const deleteAirportCurrency = /* GraphQL */ `mutation DeleteAirportCurrency(
  $condition: ModelAirportCurrencyConditionInput
  $input: DeleteAirportCurrencyInput!
) {
  deleteAirportCurrency(condition: $condition, input: $input) {
    cityName
    country
    createdAt
    currencyCode
    currencySymbol
    exchangeRateToUsd
    iataCode
    id
    region
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteAirportCurrencyMutationVariables,
  APITypes.DeleteAirportCurrencyMutation
>;
export const deleteAuditLog = /* GraphQL */ `mutation DeleteAuditLog(
  $condition: ModelAuditLogConditionInput
  $input: DeleteAuditLogInput!
) {
  deleteAuditLog(condition: $condition, input: $input) {
    action
    changeData
    createdAt
    id
    tableName
    updatedAt
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteAuditLogMutationVariables,
  APITypes.DeleteAuditLogMutation
>;
export const deleteHandlingRate = /* GraphQL */ `mutation DeleteHandlingRate(
  $condition: ModelHandlingRateConditionInput
  $input: DeleteHandlingRateInput!
) {
  deleteHandlingRate(condition: $condition, input: $input) {
    airportCode
    createdAt
    handlingCostPerTon
    id
    serviceType
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteHandlingRateMutationVariables,
  APITypes.DeleteHandlingRateMutation
>;
export const deleteMarketBenchmark = /* GraphQL */ `mutation DeleteMarketBenchmark(
  $condition: ModelMarketBenchmarkConditionInput
  $input: DeleteMarketBenchmarkInput!
) {
  deleteMarketBenchmark(condition: $condition, input: $input) {
    benchmarkCostPerKg
    createdAt
    id
    marketShare
    route
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteMarketBenchmarkMutationVariables,
  APITypes.DeleteMarketBenchmarkMutation
>;
export const deleteRouteData = /* GraphQL */ `mutation DeleteRouteData(
  $condition: ModelRouteDataConditionInput
  $input: DeleteRouteDataInput!
) {
  deleteRouteData(condition: $condition, input: $input) {
    createdAt
    destination
    distance
    frequency
    id
    origin
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteRouteDataMutationVariables,
  APITypes.DeleteRouteDataMutation
>;
export const deleteSystemParameter = /* GraphQL */ `mutation DeleteSystemParameter(
  $condition: ModelSystemParameterConditionInput
  $input: DeleteSystemParameterInput!
) {
  deleteSystemParameter(condition: $condition, input: $input) {
    createdAt
    description
    id
    paramName
    paramValue
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteSystemParameterMutationVariables,
  APITypes.DeleteSystemParameterMutation
>;
export const updateAircraftCost = /* GraphQL */ `mutation UpdateAircraftCost(
  $condition: ModelAircraftCostConditionInput
  $input: UpdateAircraftCostInput!
) {
  updateAircraftCost(condition: $condition, input: $input) {
    aircraftType
    createdAt
    crewCost
    depreciationCost
    fuelBurnRatePerHour
    fuelCost
    id
    insuranceCost
    maintenanceCost
    otherCost
    totalCostPerHour
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateAircraftCostMutationVariables,
  APITypes.UpdateAircraftCostMutation
>;
export const updateAirportCurrency = /* GraphQL */ `mutation UpdateAirportCurrency(
  $condition: ModelAirportCurrencyConditionInput
  $input: UpdateAirportCurrencyInput!
) {
  updateAirportCurrency(condition: $condition, input: $input) {
    cityName
    country
    createdAt
    currencyCode
    currencySymbol
    exchangeRateToUsd
    iataCode
    id
    region
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateAirportCurrencyMutationVariables,
  APITypes.UpdateAirportCurrencyMutation
>;
export const updateAuditLog = /* GraphQL */ `mutation UpdateAuditLog(
  $condition: ModelAuditLogConditionInput
  $input: UpdateAuditLogInput!
) {
  updateAuditLog(condition: $condition, input: $input) {
    action
    changeData
    createdAt
    id
    tableName
    updatedAt
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateAuditLogMutationVariables,
  APITypes.UpdateAuditLogMutation
>;
export const updateHandlingRate = /* GraphQL */ `mutation UpdateHandlingRate(
  $condition: ModelHandlingRateConditionInput
  $input: UpdateHandlingRateInput!
) {
  updateHandlingRate(condition: $condition, input: $input) {
    airportCode
    createdAt
    handlingCostPerTon
    id
    serviceType
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateHandlingRateMutationVariables,
  APITypes.UpdateHandlingRateMutation
>;
export const updateMarketBenchmark = /* GraphQL */ `mutation UpdateMarketBenchmark(
  $condition: ModelMarketBenchmarkConditionInput
  $input: UpdateMarketBenchmarkInput!
) {
  updateMarketBenchmark(condition: $condition, input: $input) {
    benchmarkCostPerKg
    createdAt
    id
    marketShare
    route
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateMarketBenchmarkMutationVariables,
  APITypes.UpdateMarketBenchmarkMutation
>;
export const updateRouteData = /* GraphQL */ `mutation UpdateRouteData(
  $condition: ModelRouteDataConditionInput
  $input: UpdateRouteDataInput!
) {
  updateRouteData(condition: $condition, input: $input) {
    createdAt
    destination
    distance
    frequency
    id
    origin
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateRouteDataMutationVariables,
  APITypes.UpdateRouteDataMutation
>;
export const updateSystemParameter = /* GraphQL */ `mutation UpdateSystemParameter(
  $condition: ModelSystemParameterConditionInput
  $input: UpdateSystemParameterInput!
) {
  updateSystemParameter(condition: $condition, input: $input) {
    createdAt
    description
    id
    paramName
    paramValue
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateSystemParameterMutationVariables,
  APITypes.UpdateSystemParameterMutation
>;
