/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateAircraftCost = /* GraphQL */ `subscription OnCreateAircraftCost(
  $filter: ModelSubscriptionAircraftCostFilterInput
) {
  onCreateAircraftCost(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAircraftCostSubscriptionVariables,
  APITypes.OnCreateAircraftCostSubscription
>;
export const onCreateAirportCurrency = /* GraphQL */ `subscription OnCreateAirportCurrency(
  $filter: ModelSubscriptionAirportCurrencyFilterInput
) {
  onCreateAirportCurrency(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAirportCurrencySubscriptionVariables,
  APITypes.OnCreateAirportCurrencySubscription
>;
export const onCreateAuditLog = /* GraphQL */ `subscription OnCreateAuditLog($filter: ModelSubscriptionAuditLogFilterInput) {
  onCreateAuditLog(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAuditLogSubscriptionVariables,
  APITypes.OnCreateAuditLogSubscription
>;
export const onCreateHandlingRate = /* GraphQL */ `subscription OnCreateHandlingRate(
  $filter: ModelSubscriptionHandlingRateFilterInput
) {
  onCreateHandlingRate(filter: $filter) {
    airportCode
    createdAt
    handlingCostPerTon
    id
    serviceType
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateHandlingRateSubscriptionVariables,
  APITypes.OnCreateHandlingRateSubscription
>;
export const onCreateMarketBenchmark = /* GraphQL */ `subscription OnCreateMarketBenchmark(
  $filter: ModelSubscriptionMarketBenchmarkFilterInput
) {
  onCreateMarketBenchmark(filter: $filter) {
    benchmarkCostPerKg
    createdAt
    id
    marketShare
    route
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateMarketBenchmarkSubscriptionVariables,
  APITypes.OnCreateMarketBenchmarkSubscription
>;
export const onCreateRouteData = /* GraphQL */ `subscription OnCreateRouteData($filter: ModelSubscriptionRouteDataFilterInput) {
  onCreateRouteData(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateRouteDataSubscriptionVariables,
  APITypes.OnCreateRouteDataSubscription
>;
export const onCreateSystemParameter = /* GraphQL */ `subscription OnCreateSystemParameter(
  $filter: ModelSubscriptionSystemParameterFilterInput
) {
  onCreateSystemParameter(filter: $filter) {
    createdAt
    description
    id
    paramName
    paramValue
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateSystemParameterSubscriptionVariables,
  APITypes.OnCreateSystemParameterSubscription
>;
export const onDeleteAircraftCost = /* GraphQL */ `subscription OnDeleteAircraftCost(
  $filter: ModelSubscriptionAircraftCostFilterInput
) {
  onDeleteAircraftCost(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAircraftCostSubscriptionVariables,
  APITypes.OnDeleteAircraftCostSubscription
>;
export const onDeleteAirportCurrency = /* GraphQL */ `subscription OnDeleteAirportCurrency(
  $filter: ModelSubscriptionAirportCurrencyFilterInput
) {
  onDeleteAirportCurrency(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAirportCurrencySubscriptionVariables,
  APITypes.OnDeleteAirportCurrencySubscription
>;
export const onDeleteAuditLog = /* GraphQL */ `subscription OnDeleteAuditLog($filter: ModelSubscriptionAuditLogFilterInput) {
  onDeleteAuditLog(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAuditLogSubscriptionVariables,
  APITypes.OnDeleteAuditLogSubscription
>;
export const onDeleteHandlingRate = /* GraphQL */ `subscription OnDeleteHandlingRate(
  $filter: ModelSubscriptionHandlingRateFilterInput
) {
  onDeleteHandlingRate(filter: $filter) {
    airportCode
    createdAt
    handlingCostPerTon
    id
    serviceType
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteHandlingRateSubscriptionVariables,
  APITypes.OnDeleteHandlingRateSubscription
>;
export const onDeleteMarketBenchmark = /* GraphQL */ `subscription OnDeleteMarketBenchmark(
  $filter: ModelSubscriptionMarketBenchmarkFilterInput
) {
  onDeleteMarketBenchmark(filter: $filter) {
    benchmarkCostPerKg
    createdAt
    id
    marketShare
    route
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteMarketBenchmarkSubscriptionVariables,
  APITypes.OnDeleteMarketBenchmarkSubscription
>;
export const onDeleteRouteData = /* GraphQL */ `subscription OnDeleteRouteData($filter: ModelSubscriptionRouteDataFilterInput) {
  onDeleteRouteData(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteRouteDataSubscriptionVariables,
  APITypes.OnDeleteRouteDataSubscription
>;
export const onDeleteSystemParameter = /* GraphQL */ `subscription OnDeleteSystemParameter(
  $filter: ModelSubscriptionSystemParameterFilterInput
) {
  onDeleteSystemParameter(filter: $filter) {
    createdAt
    description
    id
    paramName
    paramValue
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteSystemParameterSubscriptionVariables,
  APITypes.OnDeleteSystemParameterSubscription
>;
export const onUpdateAircraftCost = /* GraphQL */ `subscription OnUpdateAircraftCost(
  $filter: ModelSubscriptionAircraftCostFilterInput
) {
  onUpdateAircraftCost(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAircraftCostSubscriptionVariables,
  APITypes.OnUpdateAircraftCostSubscription
>;
export const onUpdateAirportCurrency = /* GraphQL */ `subscription OnUpdateAirportCurrency(
  $filter: ModelSubscriptionAirportCurrencyFilterInput
) {
  onUpdateAirportCurrency(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAirportCurrencySubscriptionVariables,
  APITypes.OnUpdateAirportCurrencySubscription
>;
export const onUpdateAuditLog = /* GraphQL */ `subscription OnUpdateAuditLog($filter: ModelSubscriptionAuditLogFilterInput) {
  onUpdateAuditLog(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAuditLogSubscriptionVariables,
  APITypes.OnUpdateAuditLogSubscription
>;
export const onUpdateHandlingRate = /* GraphQL */ `subscription OnUpdateHandlingRate(
  $filter: ModelSubscriptionHandlingRateFilterInput
) {
  onUpdateHandlingRate(filter: $filter) {
    airportCode
    createdAt
    handlingCostPerTon
    id
    serviceType
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateHandlingRateSubscriptionVariables,
  APITypes.OnUpdateHandlingRateSubscription
>;
export const onUpdateMarketBenchmark = /* GraphQL */ `subscription OnUpdateMarketBenchmark(
  $filter: ModelSubscriptionMarketBenchmarkFilterInput
) {
  onUpdateMarketBenchmark(filter: $filter) {
    benchmarkCostPerKg
    createdAt
    id
    marketShare
    route
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateMarketBenchmarkSubscriptionVariables,
  APITypes.OnUpdateMarketBenchmarkSubscription
>;
export const onUpdateRouteData = /* GraphQL */ `subscription OnUpdateRouteData($filter: ModelSubscriptionRouteDataFilterInput) {
  onUpdateRouteData(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateRouteDataSubscriptionVariables,
  APITypes.OnUpdateRouteDataSubscription
>;
export const onUpdateSystemParameter = /* GraphQL */ `subscription OnUpdateSystemParameter(
  $filter: ModelSubscriptionSystemParameterFilterInput
) {
  onUpdateSystemParameter(filter: $filter) {
    createdAt
    description
    id
    paramName
    paramValue
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateSystemParameterSubscriptionVariables,
  APITypes.OnUpdateSystemParameterSubscription
>;
