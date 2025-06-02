
// Central types export - all types are now unified
export * from './unified';

// Backwards compatibility aliases
export type {
  SearchResultService as Service,
  ProviderProfile as Provider,
  ServiceProfile as ServiceDetails
} from './unified';
