
// General Types
export interface SearchSuggestion {
  id: string;
  value: string;
  type?: string;
  icon?: React.ReactNode;
}

// Alias imports from central types
export type {
  User,
  Provider,
  Service,
  SearchResultService,
  Booking,
  BookingRequest,
  Review,
  Commission,
  SystemConfig,
  SearchFilters,
  ProviderProfile,
  ServiceProfile,
  CateringLead
} from '@/types';
