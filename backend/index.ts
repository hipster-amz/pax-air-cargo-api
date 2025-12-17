import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";
import { initSchema } from "@aws-amplify/datastore";

import { schema } from "./schema";



type EagerAircraftCostModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AircraftCost, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly aircraftType: string;
  readonly totalCostPerHour: number;
  readonly crewCost?: number | null;
  readonly maintenanceCost?: number | null;
  readonly fuelCost?: number | null;
  readonly depreciationCost?: number | null;
  readonly insuranceCost?: number | null;
  readonly otherCost?: number | null;
  readonly fuelBurnRatePerHour?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAircraftCostModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AircraftCost, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly aircraftType: string;
  readonly totalCostPerHour: number;
  readonly crewCost?: number | null;
  readonly maintenanceCost?: number | null;
  readonly fuelCost?: number | null;
  readonly depreciationCost?: number | null;
  readonly insuranceCost?: number | null;
  readonly otherCost?: number | null;
  readonly fuelBurnRatePerHour?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type AircraftCostModel = LazyLoading extends LazyLoadingDisabled ? EagerAircraftCostModel : LazyAircraftCostModel

export declare const AircraftCostModel: (new (init: ModelInit<AircraftCostModel>) => AircraftCostModel) & {
  copyOf(source: AircraftCostModel, mutator: (draft: MutableModel<AircraftCostModel>) => MutableModel<AircraftCostModel> | void): AircraftCostModel;
}

type EagerAirportCurrencyModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AirportCurrency, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly iataCode: string;
  readonly cityName?: string | null;
  readonly country?: string | null;
  readonly currencyCode: string;
  readonly currencySymbol?: string | null;
  readonly exchangeRateToUsd: number;
  readonly region?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAirportCurrencyModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AirportCurrency, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly iataCode: string;
  readonly cityName?: string | null;
  readonly country?: string | null;
  readonly currencyCode: string;
  readonly currencySymbol?: string | null;
  readonly exchangeRateToUsd: number;
  readonly region?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type AirportCurrencyModel = LazyLoading extends LazyLoadingDisabled ? EagerAirportCurrencyModel : LazyAirportCurrencyModel

export declare const AirportCurrencyModel: (new (init: ModelInit<AirportCurrencyModel>) => AirportCurrencyModel) & {
  copyOf(source: AirportCurrencyModel, mutator: (draft: MutableModel<AirportCurrencyModel>) => MutableModel<AirportCurrencyModel> | void): AirportCurrencyModel;
}

type EagerHandlingRateModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<HandlingRate, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly airportCode: string;
  readonly handlingCostPerTon: number;
  readonly serviceType?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyHandlingRateModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<HandlingRate, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly airportCode: string;
  readonly handlingCostPerTon: number;
  readonly serviceType?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type HandlingRateModel = LazyLoading extends LazyLoadingDisabled ? EagerHandlingRateModel : LazyHandlingRateModel

export declare const HandlingRateModel: (new (init: ModelInit<HandlingRateModel>) => HandlingRateModel) & {
  copyOf(source: HandlingRateModel, mutator: (draft: MutableModel<HandlingRateModel>) => MutableModel<HandlingRateModel> | void): HandlingRateModel;
}

type EagerMarketBenchmarkModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MarketBenchmark, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly route: string;
  readonly benchmarkCostPerKg: number;
  readonly marketShare?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMarketBenchmarkModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MarketBenchmark, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly route: string;
  readonly benchmarkCostPerKg: number;
  readonly marketShare?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type MarketBenchmarkModel = LazyLoading extends LazyLoadingDisabled ? EagerMarketBenchmarkModel : LazyMarketBenchmarkModel

export declare const MarketBenchmarkModel: (new (init: ModelInit<MarketBenchmarkModel>) => MarketBenchmarkModel) & {
  copyOf(source: MarketBenchmarkModel, mutator: (draft: MutableModel<MarketBenchmarkModel>) => MutableModel<MarketBenchmarkModel> | void): MarketBenchmarkModel;
}

type EagerRouteDataModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RouteData, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly origin: string;
  readonly destination: string;
  readonly distance?: number | null;
  readonly frequency?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRouteDataModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RouteData, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly origin: string;
  readonly destination: string;
  readonly distance?: number | null;
  readonly frequency?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type RouteDataModel = LazyLoading extends LazyLoadingDisabled ? EagerRouteDataModel : LazyRouteDataModel

export declare const RouteDataModel: (new (init: ModelInit<RouteDataModel>) => RouteDataModel) & {
  copyOf(source: RouteDataModel, mutator: (draft: MutableModel<RouteDataModel>) => MutableModel<RouteDataModel> | void): RouteDataModel;
}

type EagerSystemParameterModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SystemParameter, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly paramName: string;
  readonly paramValue: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySystemParameterModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SystemParameter, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly paramName: string;
  readonly paramValue: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SystemParameterModel = LazyLoading extends LazyLoadingDisabled ? EagerSystemParameterModel : LazySystemParameterModel

export declare const SystemParameterModel: (new (init: ModelInit<SystemParameterModel>) => SystemParameterModel) & {
  copyOf(source: SystemParameterModel, mutator: (draft: MutableModel<SystemParameterModel>) => MutableModel<SystemParameterModel> | void): SystemParameterModel;
}

type EagerAuditLogModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AuditLog, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly action: string;
  readonly tableName?: string | null;
  readonly changeData?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAuditLogModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AuditLog, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly action: string;
  readonly tableName?: string | null;
  readonly changeData?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type AuditLogModel = LazyLoading extends LazyLoadingDisabled ? EagerAuditLogModel : LazyAuditLogModel

export declare const AuditLogModel: (new (init: ModelInit<AuditLogModel>) => AuditLogModel) & {
  copyOf(source: AuditLogModel, mutator: (draft: MutableModel<AuditLogModel>) => MutableModel<AuditLogModel> | void): AuditLogModel;
}



const { AircraftCost, AirportCurrency, HandlingRate, MarketBenchmark, RouteData, SystemParameter, AuditLog } = initSchema(schema) as {
  AircraftCost: PersistentModelConstructor<AircraftCostModel>;
  AirportCurrency: PersistentModelConstructor<AirportCurrencyModel>;
  HandlingRate: PersistentModelConstructor<HandlingRateModel>;
  MarketBenchmark: PersistentModelConstructor<MarketBenchmarkModel>;
  RouteData: PersistentModelConstructor<RouteDataModel>;
  SystemParameter: PersistentModelConstructor<SystemParameterModel>;
  AuditLog: PersistentModelConstructor<AuditLogModel>;
};

export {
  AircraftCost,
  AirportCurrency,
  HandlingRate,
  MarketBenchmark,
  RouteData,
  SystemParameter,
  AuditLog
};