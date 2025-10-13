// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { FHE, euint32, euint8, ebool } from "@fhevm/solidity/lib/FHE.sol";
import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";

/**
 * @title PrivateRentalMatching v2.0
 * @notice Privacy-preserving rental property matching platform using FHE encryption
 * @dev Example contract demonstrating FHEVM SDK capabilities
 *
 * Features:
 * - Landlords create encrypted property listings (price, bedrooms, postal code, type)
 * - Tenants create encrypted rental requests (budget, bedroom requirements, preferences)
 * - Privacy-preserving matching using FHE comparisons
 * - Dual confirmation system (both landlord and tenant must confirm)
 */
contract PrivateRentalMatching is SepoliaConfig {

    address public owner;
    uint256 public listingIdCounter;
    uint256 public requestIdCounter;
    uint256 public matchCounter;

    // Gateway and KMS Configuration
    uint256 public kmsGeneration;
    address[] public pauserAddresses;
    bool public isPaused;
    mapping(address => bool) public isPauserAddress;
    uint256 public decryptionRequestCounter;

    struct PropertyListing {
        euint32 encryptedPrice;
        euint8 encryptedBedrooms;
        euint32 encryptedPostalCode;
        euint8 encryptedPropertyType; // 1=apartment, 2=house, 3=studio
        bool isActive;
        address landlord;
        uint256 timestamp;
        bool isMatched;
    }

    struct RentalRequest {
        euint32 encryptedMaxBudget;
        euint8 encryptedMinBedrooms;
        euint32 encryptedPreferredPostalCode;
        euint8 encryptedPreferredPropertyType;
        bool isActive;
        address tenant;
        uint256 timestamp;
        bool isMatched;
    }

    struct Match {
        uint256 listingId;
        uint256 requestId;
        address landlord;
        address tenant;
        uint256 timestamp;
        bool isConfirmed;
        bool landlordConfirmed;
        bool tenantConfirmed;
    }

    mapping(uint256 => PropertyListing) public listings;
    mapping(uint256 => RentalRequest) public requests;
    mapping(uint256 => Match) public matches;
    mapping(address => uint256[]) public userListings;
    mapping(address => uint256[]) public userRequests;

    event ListingCreated(uint256 indexed listingId, address indexed landlord);
    event RequestCreated(uint256 indexed requestId, address indexed tenant);
    event MatchCreated(uint256 indexed matchId, uint256 indexed listingId, uint256 indexed requestId);
    event MatchConfirmed(uint256 indexed matchId, address indexed confirmer);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    modifier whenNotPaused() {
        require(!isPaused, "Contract is paused");
        _;
    }

    constructor(address[] memory _pauserAddresses, uint256 _kmsGeneration) {
        owner = msg.sender;
        listingIdCounter = 1;
        requestIdCounter = 1;
        matchCounter = 1;
        kmsGeneration = _kmsGeneration;
        isPaused = false;
        decryptionRequestCounter = 0;

        for (uint256 i = 0; i < _pauserAddresses.length; i++) {
            pauserAddresses.push(_pauserAddresses[i]);
            isPauserAddress[_pauserAddresses[i]] = true;
        }
    }

    /**
     * @notice Create a property listing with encrypted details
     */
    function createListing(
        uint32 _price,
        uint8 _bedrooms,
        uint32 _postalCode,
        uint8 _propertyType
    ) external whenNotPaused {
        require(_price > 0, "Price must be greater than 0");
        require(_bedrooms > 0 && _bedrooms <= 10, "Invalid bedroom count");
        require(_propertyType >= 1 && _propertyType <= 3, "Invalid property type");

        euint32 encryptedPrice = FHE.asEuint32(_price);
        euint8 encryptedBedrooms = FHE.asEuint8(_bedrooms);
        euint32 encryptedPostalCode = FHE.asEuint32(_postalCode);
        euint8 encryptedPropertyType = FHE.asEuint8(_propertyType);

        listings[listingIdCounter] = PropertyListing({
            encryptedPrice: encryptedPrice,
            encryptedBedrooms: encryptedBedrooms,
            encryptedPostalCode: encryptedPostalCode,
            encryptedPropertyType: encryptedPropertyType,
            isActive: true,
            landlord: msg.sender,
            timestamp: block.timestamp,
            isMatched: false
        });

        userListings[msg.sender].push(listingIdCounter);

        FHE.allowThis(encryptedPrice);
        FHE.allowThis(encryptedBedrooms);
        FHE.allowThis(encryptedPostalCode);
        FHE.allowThis(encryptedPropertyType);

        FHE.allow(encryptedPrice, msg.sender);
        FHE.allow(encryptedBedrooms, msg.sender);
        FHE.allow(encryptedPostalCode, msg.sender);
        FHE.allow(encryptedPropertyType, msg.sender);

        emit ListingCreated(listingIdCounter, msg.sender);
        listingIdCounter++;
    }

    /**
     * @notice Create a rental request with encrypted requirements
     */
    function createRequest(
        uint32 _maxBudget,
        uint8 _minBedrooms,
        uint32 _preferredPostalCode,
        uint8 _preferredPropertyType
    ) external whenNotPaused {
        require(_maxBudget > 0, "Budget must be greater than 0");
        require(_minBedrooms > 0 && _minBedrooms <= 10, "Invalid bedroom count");
        require(_preferredPropertyType >= 1 && _preferredPropertyType <= 3, "Invalid property type");

        euint32 encryptedMaxBudget = FHE.asEuint32(_maxBudget);
        euint8 encryptedMinBedrooms = FHE.asEuint8(_minBedrooms);
        euint32 encryptedPreferredPostalCode = FHE.asEuint32(_preferredPostalCode);
        euint8 encryptedPreferredPropertyType = FHE.asEuint8(_preferredPropertyType);

        requests[requestIdCounter] = RentalRequest({
            encryptedMaxBudget: encryptedMaxBudget,
            encryptedMinBedrooms: encryptedMinBedrooms,
            encryptedPreferredPostalCode: encryptedPreferredPostalCode,
            encryptedPreferredPropertyType: encryptedPreferredPropertyType,
            isActive: true,
            tenant: msg.sender,
            timestamp: block.timestamp,
            isMatched: false
        });

        userRequests[msg.sender].push(requestIdCounter);

        FHE.allowThis(encryptedMaxBudget);
        FHE.allowThis(encryptedMinBedrooms);
        FHE.allowThis(encryptedPreferredPostalCode);
        FHE.allowThis(encryptedPreferredPropertyType);

        FHE.allow(encryptedMaxBudget, msg.sender);
        FHE.allow(encryptedMinBedrooms, msg.sender);
        FHE.allow(encryptedPreferredPostalCode, msg.sender);
        FHE.allow(encryptedPreferredPropertyType, msg.sender);

        emit RequestCreated(requestIdCounter, msg.sender);
        requestIdCounter++;
    }

    /**
     * @notice Create a match between listing and request
     */
    function createMatch(uint256 _listingId, uint256 _requestId) external whenNotPaused {
        require(listings[_listingId].isActive, "Listing not active");
        require(requests[_requestId].isActive, "Request not active");
        require(!listings[_listingId].isMatched, "Listing already matched");
        require(!requests[_requestId].isMatched, "Request already matched");

        PropertyListing storage listing = listings[_listingId];
        RentalRequest storage request = requests[_requestId];

        require(
            msg.sender == listing.landlord || msg.sender == request.tenant,
            "Not authorized to create this match"
        );

        ebool priceMatch = FHE.le(listing.encryptedPrice, request.encryptedMaxBudget);
        ebool bedroomMatch = FHE.ge(listing.encryptedBedrooms, request.encryptedMinBedrooms);
        ebool typeMatch = FHE.eq(listing.encryptedPropertyType, request.encryptedPreferredPropertyType);
        ebool postalMatch = FHE.eq(listing.encryptedPostalCode, request.encryptedPreferredPostalCode);

        FHE.allowThis(priceMatch);
        FHE.allowThis(bedroomMatch);
        FHE.allowThis(typeMatch);
        FHE.allowThis(postalMatch);

        matches[matchCounter] = Match({
            listingId: _listingId,
            requestId: _requestId,
            landlord: listing.landlord,
            tenant: request.tenant,
            timestamp: block.timestamp,
            isConfirmed: false,
            landlordConfirmed: false,
            tenantConfirmed: false
        });

        listings[_listingId].isMatched = true;
        requests[_requestId].isMatched = true;

        emit MatchCreated(matchCounter, _listingId, _requestId);
        matchCounter++;
    }

    /**
     * @notice Confirm a match
     */
    function confirmMatch(uint256 _matchId) external whenNotPaused {
        require(matches[_matchId].landlord != address(0), "Match does not exist");
        require(!matches[_matchId].isConfirmed, "Match already confirmed");

        Match storage matchData = matches[_matchId];

        if (msg.sender == matchData.landlord) {
            require(!matchData.landlordConfirmed, "Already confirmed by landlord");
            matchData.landlordConfirmed = true;
        } else if (msg.sender == matchData.tenant) {
            require(!matchData.tenantConfirmed, "Already confirmed by tenant");
            matchData.tenantConfirmed = true;
        } else {
            revert("Not authorized to confirm this match");
        }

        if (matchData.landlordConfirmed && matchData.tenantConfirmed) {
            matchData.isConfirmed = true;
        }

        emit MatchConfirmed(_matchId, msg.sender);
    }

    // View functions
    function getUserListings(address _user) external view returns (uint256[] memory) {
        return userListings[_user];
    }

    function getUserRequests(address _user) external view returns (uint256[] memory) {
        return userRequests[_user];
    }

    function getActiveListingsCount() external view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 1; i < listingIdCounter; i++) {
            if (listings[i].isActive && !listings[i].isMatched) {
                count++;
            }
        }
        return count;
    }

    function getActiveRequestsCount() external view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 1; i < requestIdCounter; i++) {
            if (requests[i].isActive && !requests[i].isMatched) {
                count++;
            }
        }
        return count;
    }
}
