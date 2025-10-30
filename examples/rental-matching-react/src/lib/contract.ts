export const CONTRACT_ADDRESS = '0xAe4aE413A41b03273Ba7ae927140Ca7a924cBFfE';

export const CONTRACT_ABI = [
  'function createListing(uint32 _price, uint8 _bedrooms, uint32 _postalCode, uint8 _propertyType) external',
  'function createRequest(uint32 _maxBudget, uint8 _minBedrooms, uint32 _preferredPostalCode, uint8 _preferredPropertyType) external',
  'function createMatch(uint256 _listingId, uint256 _requestId) external',
  'function confirmMatch(uint256 _matchId) external',
  'function getActiveListingsCount() external view returns (uint256)',
  'function getActiveRequestsCount() external view returns (uint256)',
  'function getUserListings(address _user) external view returns (uint256[])',
  'function getUserRequests(address _user) external view returns (uint256[])',
  'function getListingDetails(uint256 _listingId) external view returns (bool, address, uint256, bool)',
  'function getRequestDetails(uint256 _requestId) external view returns (bool, address, uint256, bool)',
  'function getMatchDetails(uint256 _matchId) external view returns (uint256, uint256, address, address, uint256, bool, bool, bool)',
  'event ListingCreated(uint256 indexed listingId, address indexed landlord)',
  'event RequestCreated(uint256 indexed requestId, address indexed tenant)',
  'event MatchCreated(uint256 indexed matchId, uint256 indexed listingId, uint256 indexed requestId)',
  'event MatchConfirmed(uint256 indexed matchId, address indexed confirmer)',
];

export interface ListingData {
  price: number;
  bedrooms: number;
  postalCode: number;
  propertyType: number;
}

export interface RequestData {
  maxBudget: number;
  minBedrooms: number;
  preferredPostalCode: number;
  preferredPropertyType: number;
}

export interface UserListing {
  id: string;
  isActive: boolean;
  isMatched: boolean;
}

export interface UserRequest {
  id: string;
  isActive: boolean;
  isMatched: boolean;
}
