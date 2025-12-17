/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type AircraftCost = {
  __typename: "AircraftCost",
  aircraftType: string,
  createdAt: string,
  crewCost?: number | null,
  depreciationCost?: number | null,
  fuelBurnRatePerHour?: number | null,
  fuelCost?: number | null,
  id: string,
  insuranceCost?: number | null,
  maintenanceCost?: number | null,
  otherCost?: number | null,
  totalCostPerHour: number,
  updatedAt: string,
};

export type AirportCurrency = {
  __typename: "AirportCurrency",
  cityName?: string | null,
  country?: string | null,
  createdAt: string,
  currencyCode: string,
  currencySymbol?: string | null,
  exchangeRateToUsd: number,
  iataCode: string,
  id: string,
  region?: string | null,
  updatedAt: string,
};

export type AuditLog = {
  __typename: "AuditLog",
  action: string,
  changeData?: string | null,
  createdAt: string,
  id: string,
  tableName?: string | null,
  updatedAt: string,
  userId?: string | null,
};

export type HandlingRate = {
  __typename: "HandlingRate",
  airportCode: string,
  createdAt: string,
  handlingCostPerTon: number,
  id: string,
  serviceType?: string | null,
  updatedAt: string,
};

export type MarketBenchmark = {
  __typename: "MarketBenchmark",
  benchmarkCostPerKg: number,
  createdAt: string,
  id: string,
  marketShare?: number | null,
  route: string,
  updatedAt: string,
};

export type RouteData = {
  __typename: "RouteData",
  createdAt: string,
  destination: string,
  distance?: number | null,
  frequency?: string | null,
  id: string,
  origin: string,
  updatedAt: string,
};

export type SystemParameter = {
  __typename: "SystemParameter",
  createdAt: string,
  description?: string | null,
  id: string,
  paramName: string,
  paramValue: string,
  updatedAt: string,
};

export type ModelAircraftCostFilterInput = {
  aircraftType?: ModelStringInput | null,
  and?: Array< ModelAircraftCostFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  crewCost?: ModelFloatInput | null,
  depreciationCost?: ModelFloatInput | null,
  fuelBurnRatePerHour?: ModelFloatInput | null,
  fuelCost?: ModelFloatInput | null,
  id?: ModelIDInput | null,
  insuranceCost?: ModelFloatInput | null,
  maintenanceCost?: ModelFloatInput | null,
  not?: ModelAircraftCostFilterInput | null,
  or?: Array< ModelAircraftCostFilterInput | null > | null,
  otherCost?: ModelFloatInput | null,
  totalCostPerHour?: ModelFloatInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelFloatInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelAircraftCostConnection = {
  __typename: "ModelAircraftCostConnection",
  items:  Array<AircraftCost | null >,
  nextToken?: string | null,
};

export type ModelAirportCurrencyFilterInput = {
  and?: Array< ModelAirportCurrencyFilterInput | null > | null,
  cityName?: ModelStringInput | null,
  country?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  currencyCode?: ModelStringInput | null,
  currencySymbol?: ModelStringInput | null,
  exchangeRateToUsd?: ModelFloatInput | null,
  iataCode?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelAirportCurrencyFilterInput | null,
  or?: Array< ModelAirportCurrencyFilterInput | null > | null,
  region?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelAirportCurrencyConnection = {
  __typename: "ModelAirportCurrencyConnection",
  items:  Array<AirportCurrency | null >,
  nextToken?: string | null,
};

export type ModelAuditLogFilterInput = {
  action?: ModelStringInput | null,
  and?: Array< ModelAuditLogFilterInput | null > | null,
  changeData?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelAuditLogFilterInput | null,
  or?: Array< ModelAuditLogFilterInput | null > | null,
  tableName?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
};

export type ModelAuditLogConnection = {
  __typename: "ModelAuditLogConnection",
  items:  Array<AuditLog | null >,
  nextToken?: string | null,
};

export type ModelHandlingRateFilterInput = {
  airportCode?: ModelStringInput | null,
  and?: Array< ModelHandlingRateFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  handlingCostPerTon?: ModelFloatInput | null,
  id?: ModelIDInput | null,
  not?: ModelHandlingRateFilterInput | null,
  or?: Array< ModelHandlingRateFilterInput | null > | null,
  serviceType?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelHandlingRateConnection = {
  __typename: "ModelHandlingRateConnection",
  items:  Array<HandlingRate | null >,
  nextToken?: string | null,
};

export type ModelMarketBenchmarkFilterInput = {
  and?: Array< ModelMarketBenchmarkFilterInput | null > | null,
  benchmarkCostPerKg?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  marketShare?: ModelFloatInput | null,
  not?: ModelMarketBenchmarkFilterInput | null,
  or?: Array< ModelMarketBenchmarkFilterInput | null > | null,
  route?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelMarketBenchmarkConnection = {
  __typename: "ModelMarketBenchmarkConnection",
  items:  Array<MarketBenchmark | null >,
  nextToken?: string | null,
};

export type ModelRouteDataFilterInput = {
  and?: Array< ModelRouteDataFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  destination?: ModelStringInput | null,
  distance?: ModelFloatInput | null,
  frequency?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelRouteDataFilterInput | null,
  or?: Array< ModelRouteDataFilterInput | null > | null,
  origin?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelRouteDataConnection = {
  __typename: "ModelRouteDataConnection",
  items:  Array<RouteData | null >,
  nextToken?: string | null,
};

export type ModelSystemParameterFilterInput = {
  and?: Array< ModelSystemParameterFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelSystemParameterFilterInput | null,
  or?: Array< ModelSystemParameterFilterInput | null > | null,
  paramName?: ModelStringInput | null,
  paramValue?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelSystemParameterConnection = {
  __typename: "ModelSystemParameterConnection",
  items:  Array<SystemParameter | null >,
  nextToken?: string | null,
};

export type ModelAircraftCostConditionInput = {
  aircraftType?: ModelStringInput | null,
  and?: Array< ModelAircraftCostConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  crewCost?: ModelFloatInput | null,
  depreciationCost?: ModelFloatInput | null,
  fuelBurnRatePerHour?: ModelFloatInput | null,
  fuelCost?: ModelFloatInput | null,
  insuranceCost?: ModelFloatInput | null,
  maintenanceCost?: ModelFloatInput | null,
  not?: ModelAircraftCostConditionInput | null,
  or?: Array< ModelAircraftCostConditionInput | null > | null,
  otherCost?: ModelFloatInput | null,
  totalCostPerHour?: ModelFloatInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateAircraftCostInput = {
  aircraftType: string,
  crewCost?: number | null,
  depreciationCost?: number | null,
  fuelBurnRatePerHour?: number | null,
  fuelCost?: number | null,
  id?: string | null,
  insuranceCost?: number | null,
  maintenanceCost?: number | null,
  otherCost?: number | null,
  totalCostPerHour: number,
};

export type ModelAirportCurrencyConditionInput = {
  and?: Array< ModelAirportCurrencyConditionInput | null > | null,
  cityName?: ModelStringInput | null,
  country?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  currencyCode?: ModelStringInput | null,
  currencySymbol?: ModelStringInput | null,
  exchangeRateToUsd?: ModelFloatInput | null,
  iataCode?: ModelStringInput | null,
  not?: ModelAirportCurrencyConditionInput | null,
  or?: Array< ModelAirportCurrencyConditionInput | null > | null,
  region?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateAirportCurrencyInput = {
  cityName?: string | null,
  country?: string | null,
  currencyCode: string,
  currencySymbol?: string | null,
  exchangeRateToUsd: number,
  iataCode: string,
  id?: string | null,
  region?: string | null,
};

export type ModelAuditLogConditionInput = {
  action?: ModelStringInput | null,
  and?: Array< ModelAuditLogConditionInput | null > | null,
  changeData?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  not?: ModelAuditLogConditionInput | null,
  or?: Array< ModelAuditLogConditionInput | null > | null,
  tableName?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
};

export type CreateAuditLogInput = {
  action: string,
  changeData?: string | null,
  id?: string | null,
  tableName?: string | null,
  userId?: string | null,
};

export type ModelHandlingRateConditionInput = {
  airportCode?: ModelStringInput | null,
  and?: Array< ModelHandlingRateConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  handlingCostPerTon?: ModelFloatInput | null,
  not?: ModelHandlingRateConditionInput | null,
  or?: Array< ModelHandlingRateConditionInput | null > | null,
  serviceType?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateHandlingRateInput = {
  airportCode: string,
  handlingCostPerTon: number,
  id?: string | null,
  serviceType?: string | null,
};

export type ModelMarketBenchmarkConditionInput = {
  and?: Array< ModelMarketBenchmarkConditionInput | null > | null,
  benchmarkCostPerKg?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  marketShare?: ModelFloatInput | null,
  not?: ModelMarketBenchmarkConditionInput | null,
  or?: Array< ModelMarketBenchmarkConditionInput | null > | null,
  route?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateMarketBenchmarkInput = {
  benchmarkCostPerKg: number,
  id?: string | null,
  marketShare?: number | null,
  route: string,
};

export type ModelRouteDataConditionInput = {
  and?: Array< ModelRouteDataConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  destination?: ModelStringInput | null,
  distance?: ModelFloatInput | null,
  frequency?: ModelStringInput | null,
  not?: ModelRouteDataConditionInput | null,
  or?: Array< ModelRouteDataConditionInput | null > | null,
  origin?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateRouteDataInput = {
  destination: string,
  distance?: number | null,
  frequency?: string | null,
  id?: string | null,
  origin: string,
};

export type ModelSystemParameterConditionInput = {
  and?: Array< ModelSystemParameterConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  not?: ModelSystemParameterConditionInput | null,
  or?: Array< ModelSystemParameterConditionInput | null > | null,
  paramName?: ModelStringInput | null,
  paramValue?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateSystemParameterInput = {
  description?: string | null,
  id?: string | null,
  paramName: string,
  paramValue: string,
};

export type DeleteAircraftCostInput = {
  id: string,
};

export type DeleteAirportCurrencyInput = {
  id: string,
};

export type DeleteAuditLogInput = {
  id: string,
};

export type DeleteHandlingRateInput = {
  id: string,
};

export type DeleteMarketBenchmarkInput = {
  id: string,
};

export type DeleteRouteDataInput = {
  id: string,
};

export type DeleteSystemParameterInput = {
  id: string,
};

export type UpdateAircraftCostInput = {
  aircraftType?: string | null,
  crewCost?: number | null,
  depreciationCost?: number | null,
  fuelBurnRatePerHour?: number | null,
  fuelCost?: number | null,
  id: string,
  insuranceCost?: number | null,
  maintenanceCost?: number | null,
  otherCost?: number | null,
  totalCostPerHour?: number | null,
};

export type UpdateAirportCurrencyInput = {
  cityName?: string | null,
  country?: string | null,
  currencyCode?: string | null,
  currencySymbol?: string | null,
  exchangeRateToUsd?: number | null,
  iataCode?: string | null,
  id: string,
  region?: string | null,
};

export type UpdateAuditLogInput = {
  action?: string | null,
  changeData?: string | null,
  id: string,
  tableName?: string | null,
  userId?: string | null,
};

export type UpdateHandlingRateInput = {
  airportCode?: string | null,
  handlingCostPerTon?: number | null,
  id: string,
  serviceType?: string | null,
};

export type UpdateMarketBenchmarkInput = {
  benchmarkCostPerKg?: number | null,
  id: string,
  marketShare?: number | null,
  route?: string | null,
};

export type UpdateRouteDataInput = {
  destination?: string | null,
  distance?: number | null,
  frequency?: string | null,
  id: string,
  origin?: string | null,
};

export type UpdateSystemParameterInput = {
  description?: string | null,
  id: string,
  paramName?: string | null,
  paramValue?: string | null,
};

export type ModelSubscriptionAircraftCostFilterInput = {
  aircraftType?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAircraftCostFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  crewCost?: ModelSubscriptionFloatInput | null,
  depreciationCost?: ModelSubscriptionFloatInput | null,
  fuelBurnRatePerHour?: ModelSubscriptionFloatInput | null,
  fuelCost?: ModelSubscriptionFloatInput | null,
  id?: ModelSubscriptionIDInput | null,
  insuranceCost?: ModelSubscriptionFloatInput | null,
  maintenanceCost?: ModelSubscriptionFloatInput | null,
  or?: Array< ModelSubscriptionAircraftCostFilterInput | null > | null,
  otherCost?: ModelSubscriptionFloatInput | null,
  totalCostPerHour?: ModelSubscriptionFloatInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionFloatInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionAirportCurrencyFilterInput = {
  and?: Array< ModelSubscriptionAirportCurrencyFilterInput | null > | null,
  cityName?: ModelSubscriptionStringInput | null,
  country?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  currencyCode?: ModelSubscriptionStringInput | null,
  currencySymbol?: ModelSubscriptionStringInput | null,
  exchangeRateToUsd?: ModelSubscriptionFloatInput | null,
  iataCode?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionAirportCurrencyFilterInput | null > | null,
  region?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionAuditLogFilterInput = {
  action?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAuditLogFilterInput | null > | null,
  changeData?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionAuditLogFilterInput | null > | null,
  tableName?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionHandlingRateFilterInput = {
  airportCode?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionHandlingRateFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  handlingCostPerTon?: ModelSubscriptionFloatInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionHandlingRateFilterInput | null > | null,
  serviceType?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionMarketBenchmarkFilterInput = {
  and?: Array< ModelSubscriptionMarketBenchmarkFilterInput | null > | null,
  benchmarkCostPerKg?: ModelSubscriptionFloatInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  marketShare?: ModelSubscriptionFloatInput | null,
  or?: Array< ModelSubscriptionMarketBenchmarkFilterInput | null > | null,
  route?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionRouteDataFilterInput = {
  and?: Array< ModelSubscriptionRouteDataFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  destination?: ModelSubscriptionStringInput | null,
  distance?: ModelSubscriptionFloatInput | null,
  frequency?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionRouteDataFilterInput | null > | null,
  origin?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionSystemParameterFilterInput = {
  and?: Array< ModelSubscriptionSystemParameterFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionSystemParameterFilterInput | null > | null,
  paramName?: ModelSubscriptionStringInput | null,
  paramValue?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type GetAircraftCostQueryVariables = {
  id: string,
};

export type GetAircraftCostQuery = {
  getAircraftCost?:  {
    __typename: "AircraftCost",
    aircraftType: string,
    createdAt: string,
    crewCost?: number | null,
    depreciationCost?: number | null,
    fuelBurnRatePerHour?: number | null,
    fuelCost?: number | null,
    id: string,
    insuranceCost?: number | null,
    maintenanceCost?: number | null,
    otherCost?: number | null,
    totalCostPerHour: number,
    updatedAt: string,
  } | null,
};

export type GetAirportCurrencyQueryVariables = {
  id: string,
};

export type GetAirportCurrencyQuery = {
  getAirportCurrency?:  {
    __typename: "AirportCurrency",
    cityName?: string | null,
    country?: string | null,
    createdAt: string,
    currencyCode: string,
    currencySymbol?: string | null,
    exchangeRateToUsd: number,
    iataCode: string,
    id: string,
    region?: string | null,
    updatedAt: string,
  } | null,
};

export type GetAuditLogQueryVariables = {
  id: string,
};

export type GetAuditLogQuery = {
  getAuditLog?:  {
    __typename: "AuditLog",
    action: string,
    changeData?: string | null,
    createdAt: string,
    id: string,
    tableName?: string | null,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type GetHandlingRateQueryVariables = {
  id: string,
};

export type GetHandlingRateQuery = {
  getHandlingRate?:  {
    __typename: "HandlingRate",
    airportCode: string,
    createdAt: string,
    handlingCostPerTon: number,
    id: string,
    serviceType?: string | null,
    updatedAt: string,
  } | null,
};

export type GetMarketBenchmarkQueryVariables = {
  id: string,
};

export type GetMarketBenchmarkQuery = {
  getMarketBenchmark?:  {
    __typename: "MarketBenchmark",
    benchmarkCostPerKg: number,
    createdAt: string,
    id: string,
    marketShare?: number | null,
    route: string,
    updatedAt: string,
  } | null,
};

export type GetRouteDataQueryVariables = {
  id: string,
};

export type GetRouteDataQuery = {
  getRouteData?:  {
    __typename: "RouteData",
    createdAt: string,
    destination: string,
    distance?: number | null,
    frequency?: string | null,
    id: string,
    origin: string,
    updatedAt: string,
  } | null,
};

export type GetSystemParameterQueryVariables = {
  id: string,
};

export type GetSystemParameterQuery = {
  getSystemParameter?:  {
    __typename: "SystemParameter",
    createdAt: string,
    description?: string | null,
    id: string,
    paramName: string,
    paramValue: string,
    updatedAt: string,
  } | null,
};

export type ListAircraftCostsQueryVariables = {
  filter?: ModelAircraftCostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAircraftCostsQuery = {
  listAircraftCosts?:  {
    __typename: "ModelAircraftCostConnection",
    items:  Array< {
      __typename: "AircraftCost",
      aircraftType: string,
      createdAt: string,
      crewCost?: number | null,
      depreciationCost?: number | null,
      fuelBurnRatePerHour?: number | null,
      fuelCost?: number | null,
      id: string,
      insuranceCost?: number | null,
      maintenanceCost?: number | null,
      otherCost?: number | null,
      totalCostPerHour: number,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListAirportCurrenciesQueryVariables = {
  filter?: ModelAirportCurrencyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAirportCurrenciesQuery = {
  listAirportCurrencies?:  {
    __typename: "ModelAirportCurrencyConnection",
    items:  Array< {
      __typename: "AirportCurrency",
      cityName?: string | null,
      country?: string | null,
      createdAt: string,
      currencyCode: string,
      currencySymbol?: string | null,
      exchangeRateToUsd: number,
      iataCode: string,
      id: string,
      region?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListAuditLogsQueryVariables = {
  filter?: ModelAuditLogFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAuditLogsQuery = {
  listAuditLogs?:  {
    __typename: "ModelAuditLogConnection",
    items:  Array< {
      __typename: "AuditLog",
      action: string,
      changeData?: string | null,
      createdAt: string,
      id: string,
      tableName?: string | null,
      updatedAt: string,
      userId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListHandlingRatesQueryVariables = {
  filter?: ModelHandlingRateFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListHandlingRatesQuery = {
  listHandlingRates?:  {
    __typename: "ModelHandlingRateConnection",
    items:  Array< {
      __typename: "HandlingRate",
      airportCode: string,
      createdAt: string,
      handlingCostPerTon: number,
      id: string,
      serviceType?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListMarketBenchmarksQueryVariables = {
  filter?: ModelMarketBenchmarkFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMarketBenchmarksQuery = {
  listMarketBenchmarks?:  {
    __typename: "ModelMarketBenchmarkConnection",
    items:  Array< {
      __typename: "MarketBenchmark",
      benchmarkCostPerKg: number,
      createdAt: string,
      id: string,
      marketShare?: number | null,
      route: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListRouteDataQueryVariables = {
  filter?: ModelRouteDataFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRouteDataQuery = {
  listRouteData?:  {
    __typename: "ModelRouteDataConnection",
    items:  Array< {
      __typename: "RouteData",
      createdAt: string,
      destination: string,
      distance?: number | null,
      frequency?: string | null,
      id: string,
      origin: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListSystemParametersQueryVariables = {
  filter?: ModelSystemParameterFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSystemParametersQuery = {
  listSystemParameters?:  {
    __typename: "ModelSystemParameterConnection",
    items:  Array< {
      __typename: "SystemParameter",
      createdAt: string,
      description?: string | null,
      id: string,
      paramName: string,
      paramValue: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateAircraftCostMutationVariables = {
  condition?: ModelAircraftCostConditionInput | null,
  input: CreateAircraftCostInput,
};

export type CreateAircraftCostMutation = {
  createAircraftCost?:  {
    __typename: "AircraftCost",
    aircraftType: string,
    createdAt: string,
    crewCost?: number | null,
    depreciationCost?: number | null,
    fuelBurnRatePerHour?: number | null,
    fuelCost?: number | null,
    id: string,
    insuranceCost?: number | null,
    maintenanceCost?: number | null,
    otherCost?: number | null,
    totalCostPerHour: number,
    updatedAt: string,
  } | null,
};

export type CreateAirportCurrencyMutationVariables = {
  condition?: ModelAirportCurrencyConditionInput | null,
  input: CreateAirportCurrencyInput,
};

export type CreateAirportCurrencyMutation = {
  createAirportCurrency?:  {
    __typename: "AirportCurrency",
    cityName?: string | null,
    country?: string | null,
    createdAt: string,
    currencyCode: string,
    currencySymbol?: string | null,
    exchangeRateToUsd: number,
    iataCode: string,
    id: string,
    region?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateAuditLogMutationVariables = {
  condition?: ModelAuditLogConditionInput | null,
  input: CreateAuditLogInput,
};

export type CreateAuditLogMutation = {
  createAuditLog?:  {
    __typename: "AuditLog",
    action: string,
    changeData?: string | null,
    createdAt: string,
    id: string,
    tableName?: string | null,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type CreateHandlingRateMutationVariables = {
  condition?: ModelHandlingRateConditionInput | null,
  input: CreateHandlingRateInput,
};

export type CreateHandlingRateMutation = {
  createHandlingRate?:  {
    __typename: "HandlingRate",
    airportCode: string,
    createdAt: string,
    handlingCostPerTon: number,
    id: string,
    serviceType?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateMarketBenchmarkMutationVariables = {
  condition?: ModelMarketBenchmarkConditionInput | null,
  input: CreateMarketBenchmarkInput,
};

export type CreateMarketBenchmarkMutation = {
  createMarketBenchmark?:  {
    __typename: "MarketBenchmark",
    benchmarkCostPerKg: number,
    createdAt: string,
    id: string,
    marketShare?: number | null,
    route: string,
    updatedAt: string,
  } | null,
};

export type CreateRouteDataMutationVariables = {
  condition?: ModelRouteDataConditionInput | null,
  input: CreateRouteDataInput,
};

export type CreateRouteDataMutation = {
  createRouteData?:  {
    __typename: "RouteData",
    createdAt: string,
    destination: string,
    distance?: number | null,
    frequency?: string | null,
    id: string,
    origin: string,
    updatedAt: string,
  } | null,
};

export type CreateSystemParameterMutationVariables = {
  condition?: ModelSystemParameterConditionInput | null,
  input: CreateSystemParameterInput,
};

export type CreateSystemParameterMutation = {
  createSystemParameter?:  {
    __typename: "SystemParameter",
    createdAt: string,
    description?: string | null,
    id: string,
    paramName: string,
    paramValue: string,
    updatedAt: string,
  } | null,
};

export type DeleteAircraftCostMutationVariables = {
  condition?: ModelAircraftCostConditionInput | null,
  input: DeleteAircraftCostInput,
};

export type DeleteAircraftCostMutation = {
  deleteAircraftCost?:  {
    __typename: "AircraftCost",
    aircraftType: string,
    createdAt: string,
    crewCost?: number | null,
    depreciationCost?: number | null,
    fuelBurnRatePerHour?: number | null,
    fuelCost?: number | null,
    id: string,
    insuranceCost?: number | null,
    maintenanceCost?: number | null,
    otherCost?: number | null,
    totalCostPerHour: number,
    updatedAt: string,
  } | null,
};

export type DeleteAirportCurrencyMutationVariables = {
  condition?: ModelAirportCurrencyConditionInput | null,
  input: DeleteAirportCurrencyInput,
};

export type DeleteAirportCurrencyMutation = {
  deleteAirportCurrency?:  {
    __typename: "AirportCurrency",
    cityName?: string | null,
    country?: string | null,
    createdAt: string,
    currencyCode: string,
    currencySymbol?: string | null,
    exchangeRateToUsd: number,
    iataCode: string,
    id: string,
    region?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteAuditLogMutationVariables = {
  condition?: ModelAuditLogConditionInput | null,
  input: DeleteAuditLogInput,
};

export type DeleteAuditLogMutation = {
  deleteAuditLog?:  {
    __typename: "AuditLog",
    action: string,
    changeData?: string | null,
    createdAt: string,
    id: string,
    tableName?: string | null,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type DeleteHandlingRateMutationVariables = {
  condition?: ModelHandlingRateConditionInput | null,
  input: DeleteHandlingRateInput,
};

export type DeleteHandlingRateMutation = {
  deleteHandlingRate?:  {
    __typename: "HandlingRate",
    airportCode: string,
    createdAt: string,
    handlingCostPerTon: number,
    id: string,
    serviceType?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteMarketBenchmarkMutationVariables = {
  condition?: ModelMarketBenchmarkConditionInput | null,
  input: DeleteMarketBenchmarkInput,
};

export type DeleteMarketBenchmarkMutation = {
  deleteMarketBenchmark?:  {
    __typename: "MarketBenchmark",
    benchmarkCostPerKg: number,
    createdAt: string,
    id: string,
    marketShare?: number | null,
    route: string,
    updatedAt: string,
  } | null,
};

export type DeleteRouteDataMutationVariables = {
  condition?: ModelRouteDataConditionInput | null,
  input: DeleteRouteDataInput,
};

export type DeleteRouteDataMutation = {
  deleteRouteData?:  {
    __typename: "RouteData",
    createdAt: string,
    destination: string,
    distance?: number | null,
    frequency?: string | null,
    id: string,
    origin: string,
    updatedAt: string,
  } | null,
};

export type DeleteSystemParameterMutationVariables = {
  condition?: ModelSystemParameterConditionInput | null,
  input: DeleteSystemParameterInput,
};

export type DeleteSystemParameterMutation = {
  deleteSystemParameter?:  {
    __typename: "SystemParameter",
    createdAt: string,
    description?: string | null,
    id: string,
    paramName: string,
    paramValue: string,
    updatedAt: string,
  } | null,
};

export type UpdateAircraftCostMutationVariables = {
  condition?: ModelAircraftCostConditionInput | null,
  input: UpdateAircraftCostInput,
};

export type UpdateAircraftCostMutation = {
  updateAircraftCost?:  {
    __typename: "AircraftCost",
    aircraftType: string,
    createdAt: string,
    crewCost?: number | null,
    depreciationCost?: number | null,
    fuelBurnRatePerHour?: number | null,
    fuelCost?: number | null,
    id: string,
    insuranceCost?: number | null,
    maintenanceCost?: number | null,
    otherCost?: number | null,
    totalCostPerHour: number,
    updatedAt: string,
  } | null,
};

export type UpdateAirportCurrencyMutationVariables = {
  condition?: ModelAirportCurrencyConditionInput | null,
  input: UpdateAirportCurrencyInput,
};

export type UpdateAirportCurrencyMutation = {
  updateAirportCurrency?:  {
    __typename: "AirportCurrency",
    cityName?: string | null,
    country?: string | null,
    createdAt: string,
    currencyCode: string,
    currencySymbol?: string | null,
    exchangeRateToUsd: number,
    iataCode: string,
    id: string,
    region?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateAuditLogMutationVariables = {
  condition?: ModelAuditLogConditionInput | null,
  input: UpdateAuditLogInput,
};

export type UpdateAuditLogMutation = {
  updateAuditLog?:  {
    __typename: "AuditLog",
    action: string,
    changeData?: string | null,
    createdAt: string,
    id: string,
    tableName?: string | null,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type UpdateHandlingRateMutationVariables = {
  condition?: ModelHandlingRateConditionInput | null,
  input: UpdateHandlingRateInput,
};

export type UpdateHandlingRateMutation = {
  updateHandlingRate?:  {
    __typename: "HandlingRate",
    airportCode: string,
    createdAt: string,
    handlingCostPerTon: number,
    id: string,
    serviceType?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateMarketBenchmarkMutationVariables = {
  condition?: ModelMarketBenchmarkConditionInput | null,
  input: UpdateMarketBenchmarkInput,
};

export type UpdateMarketBenchmarkMutation = {
  updateMarketBenchmark?:  {
    __typename: "MarketBenchmark",
    benchmarkCostPerKg: number,
    createdAt: string,
    id: string,
    marketShare?: number | null,
    route: string,
    updatedAt: string,
  } | null,
};

export type UpdateRouteDataMutationVariables = {
  condition?: ModelRouteDataConditionInput | null,
  input: UpdateRouteDataInput,
};

export type UpdateRouteDataMutation = {
  updateRouteData?:  {
    __typename: "RouteData",
    createdAt: string,
    destination: string,
    distance?: number | null,
    frequency?: string | null,
    id: string,
    origin: string,
    updatedAt: string,
  } | null,
};

export type UpdateSystemParameterMutationVariables = {
  condition?: ModelSystemParameterConditionInput | null,
  input: UpdateSystemParameterInput,
};

export type UpdateSystemParameterMutation = {
  updateSystemParameter?:  {
    __typename: "SystemParameter",
    createdAt: string,
    description?: string | null,
    id: string,
    paramName: string,
    paramValue: string,
    updatedAt: string,
  } | null,
};

export type OnCreateAircraftCostSubscriptionVariables = {
  filter?: ModelSubscriptionAircraftCostFilterInput | null,
};

export type OnCreateAircraftCostSubscription = {
  onCreateAircraftCost?:  {
    __typename: "AircraftCost",
    aircraftType: string,
    createdAt: string,
    crewCost?: number | null,
    depreciationCost?: number | null,
    fuelBurnRatePerHour?: number | null,
    fuelCost?: number | null,
    id: string,
    insuranceCost?: number | null,
    maintenanceCost?: number | null,
    otherCost?: number | null,
    totalCostPerHour: number,
    updatedAt: string,
  } | null,
};

export type OnCreateAirportCurrencySubscriptionVariables = {
  filter?: ModelSubscriptionAirportCurrencyFilterInput | null,
};

export type OnCreateAirportCurrencySubscription = {
  onCreateAirportCurrency?:  {
    __typename: "AirportCurrency",
    cityName?: string | null,
    country?: string | null,
    createdAt: string,
    currencyCode: string,
    currencySymbol?: string | null,
    exchangeRateToUsd: number,
    iataCode: string,
    id: string,
    region?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateAuditLogSubscriptionVariables = {
  filter?: ModelSubscriptionAuditLogFilterInput | null,
};

export type OnCreateAuditLogSubscription = {
  onCreateAuditLog?:  {
    __typename: "AuditLog",
    action: string,
    changeData?: string | null,
    createdAt: string,
    id: string,
    tableName?: string | null,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type OnCreateHandlingRateSubscriptionVariables = {
  filter?: ModelSubscriptionHandlingRateFilterInput | null,
};

export type OnCreateHandlingRateSubscription = {
  onCreateHandlingRate?:  {
    __typename: "HandlingRate",
    airportCode: string,
    createdAt: string,
    handlingCostPerTon: number,
    id: string,
    serviceType?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateMarketBenchmarkSubscriptionVariables = {
  filter?: ModelSubscriptionMarketBenchmarkFilterInput | null,
};

export type OnCreateMarketBenchmarkSubscription = {
  onCreateMarketBenchmark?:  {
    __typename: "MarketBenchmark",
    benchmarkCostPerKg: number,
    createdAt: string,
    id: string,
    marketShare?: number | null,
    route: string,
    updatedAt: string,
  } | null,
};

export type OnCreateRouteDataSubscriptionVariables = {
  filter?: ModelSubscriptionRouteDataFilterInput | null,
};

export type OnCreateRouteDataSubscription = {
  onCreateRouteData?:  {
    __typename: "RouteData",
    createdAt: string,
    destination: string,
    distance?: number | null,
    frequency?: string | null,
    id: string,
    origin: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSystemParameterSubscriptionVariables = {
  filter?: ModelSubscriptionSystemParameterFilterInput | null,
};

export type OnCreateSystemParameterSubscription = {
  onCreateSystemParameter?:  {
    __typename: "SystemParameter",
    createdAt: string,
    description?: string | null,
    id: string,
    paramName: string,
    paramValue: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAircraftCostSubscriptionVariables = {
  filter?: ModelSubscriptionAircraftCostFilterInput | null,
};

export type OnDeleteAircraftCostSubscription = {
  onDeleteAircraftCost?:  {
    __typename: "AircraftCost",
    aircraftType: string,
    createdAt: string,
    crewCost?: number | null,
    depreciationCost?: number | null,
    fuelBurnRatePerHour?: number | null,
    fuelCost?: number | null,
    id: string,
    insuranceCost?: number | null,
    maintenanceCost?: number | null,
    otherCost?: number | null,
    totalCostPerHour: number,
    updatedAt: string,
  } | null,
};

export type OnDeleteAirportCurrencySubscriptionVariables = {
  filter?: ModelSubscriptionAirportCurrencyFilterInput | null,
};

export type OnDeleteAirportCurrencySubscription = {
  onDeleteAirportCurrency?:  {
    __typename: "AirportCurrency",
    cityName?: string | null,
    country?: string | null,
    createdAt: string,
    currencyCode: string,
    currencySymbol?: string | null,
    exchangeRateToUsd: number,
    iataCode: string,
    id: string,
    region?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteAuditLogSubscriptionVariables = {
  filter?: ModelSubscriptionAuditLogFilterInput | null,
};

export type OnDeleteAuditLogSubscription = {
  onDeleteAuditLog?:  {
    __typename: "AuditLog",
    action: string,
    changeData?: string | null,
    createdAt: string,
    id: string,
    tableName?: string | null,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type OnDeleteHandlingRateSubscriptionVariables = {
  filter?: ModelSubscriptionHandlingRateFilterInput | null,
};

export type OnDeleteHandlingRateSubscription = {
  onDeleteHandlingRate?:  {
    __typename: "HandlingRate",
    airportCode: string,
    createdAt: string,
    handlingCostPerTon: number,
    id: string,
    serviceType?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteMarketBenchmarkSubscriptionVariables = {
  filter?: ModelSubscriptionMarketBenchmarkFilterInput | null,
};

export type OnDeleteMarketBenchmarkSubscription = {
  onDeleteMarketBenchmark?:  {
    __typename: "MarketBenchmark",
    benchmarkCostPerKg: number,
    createdAt: string,
    id: string,
    marketShare?: number | null,
    route: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRouteDataSubscriptionVariables = {
  filter?: ModelSubscriptionRouteDataFilterInput | null,
};

export type OnDeleteRouteDataSubscription = {
  onDeleteRouteData?:  {
    __typename: "RouteData",
    createdAt: string,
    destination: string,
    distance?: number | null,
    frequency?: string | null,
    id: string,
    origin: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSystemParameterSubscriptionVariables = {
  filter?: ModelSubscriptionSystemParameterFilterInput | null,
};

export type OnDeleteSystemParameterSubscription = {
  onDeleteSystemParameter?:  {
    __typename: "SystemParameter",
    createdAt: string,
    description?: string | null,
    id: string,
    paramName: string,
    paramValue: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAircraftCostSubscriptionVariables = {
  filter?: ModelSubscriptionAircraftCostFilterInput | null,
};

export type OnUpdateAircraftCostSubscription = {
  onUpdateAircraftCost?:  {
    __typename: "AircraftCost",
    aircraftType: string,
    createdAt: string,
    crewCost?: number | null,
    depreciationCost?: number | null,
    fuelBurnRatePerHour?: number | null,
    fuelCost?: number | null,
    id: string,
    insuranceCost?: number | null,
    maintenanceCost?: number | null,
    otherCost?: number | null,
    totalCostPerHour: number,
    updatedAt: string,
  } | null,
};

export type OnUpdateAirportCurrencySubscriptionVariables = {
  filter?: ModelSubscriptionAirportCurrencyFilterInput | null,
};

export type OnUpdateAirportCurrencySubscription = {
  onUpdateAirportCurrency?:  {
    __typename: "AirportCurrency",
    cityName?: string | null,
    country?: string | null,
    createdAt: string,
    currencyCode: string,
    currencySymbol?: string | null,
    exchangeRateToUsd: number,
    iataCode: string,
    id: string,
    region?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateAuditLogSubscriptionVariables = {
  filter?: ModelSubscriptionAuditLogFilterInput | null,
};

export type OnUpdateAuditLogSubscription = {
  onUpdateAuditLog?:  {
    __typename: "AuditLog",
    action: string,
    changeData?: string | null,
    createdAt: string,
    id: string,
    tableName?: string | null,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type OnUpdateHandlingRateSubscriptionVariables = {
  filter?: ModelSubscriptionHandlingRateFilterInput | null,
};

export type OnUpdateHandlingRateSubscription = {
  onUpdateHandlingRate?:  {
    __typename: "HandlingRate",
    airportCode: string,
    createdAt: string,
    handlingCostPerTon: number,
    id: string,
    serviceType?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateMarketBenchmarkSubscriptionVariables = {
  filter?: ModelSubscriptionMarketBenchmarkFilterInput | null,
};

export type OnUpdateMarketBenchmarkSubscription = {
  onUpdateMarketBenchmark?:  {
    __typename: "MarketBenchmark",
    benchmarkCostPerKg: number,
    createdAt: string,
    id: string,
    marketShare?: number | null,
    route: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRouteDataSubscriptionVariables = {
  filter?: ModelSubscriptionRouteDataFilterInput | null,
};

export type OnUpdateRouteDataSubscription = {
  onUpdateRouteData?:  {
    __typename: "RouteData",
    createdAt: string,
    destination: string,
    distance?: number | null,
    frequency?: string | null,
    id: string,
    origin: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSystemParameterSubscriptionVariables = {
  filter?: ModelSubscriptionSystemParameterFilterInput | null,
};

export type OnUpdateSystemParameterSubscription = {
  onUpdateSystemParameter?:  {
    __typename: "SystemParameter",
    createdAt: string,
    description?: string | null,
    id: string,
    paramName: string,
    paramValue: string,
    updatedAt: string,
  } | null,
};
