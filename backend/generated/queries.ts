/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getAircraftCost = /* GraphQL */ `query GetAircraftCost($id: ID!) {
  getAircraftCost(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetAircraftCostQueryVariables,
  APITypes.GetAircraftCostQuery
>;
export const getAirportCurrency = /* GraphQL */ `query GetAirportCurrency($id: ID!) {
  getAirportCurrency(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetAirportCurrencyQueryVariables,
  APITypes.GetAirportCurrencyQuery
>;
export const getAuditLog = /* GraphQL */ `query GetAuditLog($id: ID!) {
  getAuditLog(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetAuditLogQueryVariables,
  APITypes.GetAuditLogQuery
>;
export const getHandlingRate = /* GraphQL */ `query GetHandlingRate($id: ID!) {
  getHandlingRate(id: $id) {
    airportCode
    createdAt
    handlingCostPerTon
    id
    serviceType
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetHandlingRateQueryVariables,
  APITypes.GetHandlingRateQuery
>;
export const getMarketBenchmark = /* GraphQL */ `query GetMarketBenchmark($id: ID!) {
  getMarketBenchmark(id: $id) {
    benchmarkCostPerKg
    createdAt
    id
    marketShare
    route
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMarketBenchmarkQueryVariables,
  APITypes.GetMarketBenchmarkQuery
>;
export const getRouteData = /* GraphQL */ `query GetRouteData($id: ID!) {
  getRouteData(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetRouteDataQueryVariables,
  APITypes.GetRouteDataQuery
>;
export const getSystemParameter = /* GraphQL */ `query GetSystemParameter($id: ID!) {
  getSystemParameter(id: $id) {
    createdAt
    description
    id
    paramName
    paramValue
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetSystemParameterQueryVariables,
  APITypes.GetSystemParameterQuery
>;
export const listAircraftCosts = /* GraphQL */ `query ListAircraftCosts(
  $filter: ModelAircraftCostFilterInput
  $limit: Int
  $nextToken: String
) {
  listAircraftCosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAircraftCostsQueryVariables,
  APITypes.ListAircraftCostsQuery
>;
export const listAirportCurrencies = /* GraphQL */ `query ListAirportCurrencies(
  $filter: ModelAirportCurrencyFilterInput
  $limit: Int
  $nextToken: String
) {
  listAirportCurrencies(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAirportCurrenciesQueryVariables,
  APITypes.ListAirportCurrenciesQuery
>;
export const listAuditLogs = /* GraphQL */ `query ListAuditLogs(
  $filter: ModelAuditLogFilterInput
  $limit: Int
  $nextToken: String
) {
  listAuditLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      action
      changeData
      createdAt
      id
      tableName
      updatedAt
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAuditLogsQueryVariables,
  APITypes.ListAuditLogsQuery
>;
export const listHandlingRates = /* GraphQL */ `query ListHandlingRates(
  $filter: ModelHandlingRateFilterInput
  $limit: Int
  $nextToken: String
) {
  listHandlingRates(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      airportCode
      createdAt
      handlingCostPerTon
      id
      serviceType
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListHandlingRatesQueryVariables,
  APITypes.ListHandlingRatesQuery
>;
export const listMarketBenchmarks = /* GraphQL */ `query ListMarketBenchmarks(
  $filter: ModelMarketBenchmarkFilterInput
  $limit: Int
  $nextToken: String
) {
  listMarketBenchmarks(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      benchmarkCostPerKg
      createdAt
      id
      marketShare
      route
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMarketBenchmarksQueryVariables,
  APITypes.ListMarketBenchmarksQuery
>;
export const listRouteData = /* GraphQL */ `query ListRouteData(
  $filter: ModelRouteDataFilterInput
  $limit: Int
  $nextToken: String
) {
  listRouteData(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      destination
      distance
      frequency
      id
      origin
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListRouteDataQueryVariables,
  APITypes.ListRouteDataQuery
>;
export const listSystemParameters = /* GraphQL */ `query ListSystemParameters(
  $filter: ModelSystemParameterFilterInput
  $limit: Int
  $nextToken: String
) {
  listSystemParameters(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      description
      id
      paramName
      paramValue
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSystemParametersQueryVariables,
  APITypes.ListSystemParametersQuery
>;
