import { expect } from 'chai';
import { ethers } from 'hardhat';
import { PrivateRentalMatching } from '../typechain-types';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';

describe('PrivateRentalMatching', function () {
  let contract: PrivateRentalMatching;
  let owner: SignerWithAddress;
  let landlord: SignerWithAddress;
  let tenant: SignerWithAddress;
  let pauser: SignerWithAddress;
  let pauserAddresses: string[];

  beforeEach(async function () {
    [owner, landlord, tenant, pauser] = await ethers.getSigners();

    pauserAddresses = [
      pauser.address,
      owner.address,
      owner.address,
      owner.address,
    ];

    const PrivateRentalMatching = await ethers.getContractFactory('PrivateRentalMatching');
    contract = await PrivateRentalMatching.deploy(pauserAddresses, 1);
    await contract.waitForDeployment();
  });

  describe('Deployment', function () {
    it('Should set the correct owner', async function () {
      expect(await contract.owner()).to.equal(owner.address);
    });

    it('Should initialize with unpaused state', async function () {
      expect(await contract.paused()).to.equal(false);
    });

    it('Should set correct pauser addresses', async function () {
      expect(await contract.isPauser(pauser.address)).to.equal(true);
      expect(await contract.isPauser(owner.address)).to.equal(true);
    });

    it('Should initialize counters to zero', async function () {
      expect(await contract.listingCounter()).to.equal(0);
      expect(await contract.requestCounter()).to.equal(0);
      expect(await contract.matchCounter()).to.equal(0);
    });
  });

  describe('Property Listings', function () {
    const testPrice = 2000;
    const testBedrooms = 2;
    const testPostalCode = 12345;
    const testPropertyType = 1; // APARTMENT

    it('Should create a new listing', async function () {
      await expect(
        contract.connect(landlord).createListing(
          testPrice,
          testBedrooms,
          testPostalCode,
          testPropertyType
        )
      ).to.emit(contract, 'ListingCreated');

      expect(await contract.listingCounter()).to.equal(1);
    });

    it('Should fail to create listing with zero price', async function () {
      await expect(
        contract.connect(landlord).createListing(
          0,
          testBedrooms,
          testPostalCode,
          testPropertyType
        )
      ).to.be.revertedWith('Price must be greater than 0');
    });

    it('Should fail to create listing with zero bedrooms', async function () {
      await expect(
        contract.connect(landlord).createListing(
          testPrice,
          0,
          testPostalCode,
          testPropertyType
        )
      ).to.be.revertedWith('Bedrooms must be greater than 0');
    });

    it('Should fail to create listing with zero postal code', async function () {
      await expect(
        contract.connect(landlord).createListing(
          testPrice,
          testBedrooms,
          0,
          testPropertyType
        )
      ).to.be.revertedWith('Postal code must be greater than 0');
    });

    it('Should fail to create listing when paused', async function () {
      await contract.connect(pauser).pause();

      await expect(
        contract.connect(landlord).createListing(
          testPrice,
          testBedrooms,
          testPostalCode,
          testPropertyType
        )
      ).to.be.revertedWith('Pausable: paused');
    });

    it('Should allow landlord to deactivate own listing', async function () {
      await contract.connect(landlord).createListing(
        testPrice,
        testBedrooms,
        testPostalCode,
        testPropertyType
      );

      await expect(
        contract.connect(landlord).deactivateListing(1)
      ).to.emit(contract, 'ListingDeactivated').withArgs(1);
    });

    it('Should fail to deactivate non-existent listing', async function () {
      await expect(
        contract.connect(landlord).deactivateListing(999)
      ).to.be.revertedWith('Listing does not exist');
    });

    it('Should fail to deactivate listing by non-owner', async function () {
      await contract.connect(landlord).createListing(
        testPrice,
        testBedrooms,
        testPostalCode,
        testPropertyType
      );

      await expect(
        contract.connect(tenant).deactivateListing(1)
      ).to.be.revertedWith('Not the listing owner');
    });
  });

  describe('Rental Requests', function () {
    const testMaxBudget = 2500;
    const testMinBedrooms = 2;
    const testPreferredPostalCode = 12345;
    const testPropertyType = 1; // APARTMENT

    it('Should create a new rental request', async function () {
      await expect(
        contract.connect(tenant).createRequest(
          testMaxBudget,
          testMinBedrooms,
          testPreferredPostalCode,
          testPropertyType
        )
      ).to.emit(contract, 'RequestCreated');

      expect(await contract.requestCounter()).to.equal(1);
    });

    it('Should fail to create request with zero budget', async function () {
      await expect(
        contract.connect(tenant).createRequest(
          0,
          testMinBedrooms,
          testPreferredPostalCode,
          testPropertyType
        )
      ).to.be.revertedWith('Max budget must be greater than 0');
    });

    it('Should fail to create request with zero bedrooms', async function () {
      await expect(
        contract.connect(tenant).createRequest(
          testMaxBudget,
          0,
          testPreferredPostalCode,
          testPropertyType
        )
      ).to.be.revertedWith('Min bedrooms must be greater than 0');
    });

    it('Should fail to create request when paused', async function () {
      await contract.connect(pauser).pause();

      await expect(
        contract.connect(tenant).createRequest(
          testMaxBudget,
          testMinBedrooms,
          testPreferredPostalCode,
          testPropertyType
        )
      ).to.be.revertedWith('Pausable: paused');
    });

    it('Should allow tenant to cancel own request', async function () {
      await contract.connect(tenant).createRequest(
        testMaxBudget,
        testMinBedrooms,
        testPreferredPostalCode,
        testPropertyType
      );

      await expect(
        contract.connect(tenant).cancelRequest(1)
      ).to.emit(contract, 'RequestCancelled').withArgs(1);
    });

    it('Should fail to cancel non-existent request', async function () {
      await expect(
        contract.connect(tenant).cancelRequest(999)
      ).to.be.revertedWith('Request does not exist');
    });

    it('Should fail to cancel request by non-owner', async function () {
      await contract.connect(tenant).createRequest(
        testMaxBudget,
        testMinBedrooms,
        testPreferredPostalCode,
        testPropertyType
      );

      await expect(
        contract.connect(landlord).cancelRequest(1)
      ).to.be.revertedWith('Not the request owner');
    });
  });

  describe('Matching System', function () {
    beforeEach(async function () {
      // Create a listing
      await contract.connect(landlord).createListing(
        2000, // price
        2,    // bedrooms
        12345, // postal code
        1     // property type (APARTMENT)
      );

      // Create a request
      await contract.connect(tenant).createRequest(
        2500, // max budget
        2,    // min bedrooms
        12345, // preferred postal code
        1     // property type (APARTMENT)
      );
    });

    it('Should create a match between listing and request', async function () {
      await expect(
        contract.connect(owner).createMatch(1, 1)
      ).to.emit(contract, 'MatchCreated');

      expect(await contract.matchCounter()).to.equal(1);
    });

    it('Should fail to match non-existent listing', async function () {
      await expect(
        contract.connect(owner).createMatch(999, 1)
      ).to.be.revertedWith('Listing does not exist');
    });

    it('Should fail to match non-existent request', async function () {
      await expect(
        contract.connect(owner).createMatch(1, 999)
      ).to.be.revertedWith('Request does not exist');
    });

    it('Should fail to match inactive listing', async function () {
      await contract.connect(landlord).deactivateListing(1);

      await expect(
        contract.connect(owner).createMatch(1, 1)
      ).to.be.revertedWith('Listing is not active');
    });

    it('Should fail to match cancelled request', async function () {
      await contract.connect(tenant).cancelRequest(1);

      await expect(
        contract.connect(owner).createMatch(1, 1)
      ).to.be.revertedWith('Request is not active');
    });

    it('Should fail to match when paused', async function () {
      await contract.connect(pauser).pause();

      await expect(
        contract.connect(owner).createMatch(1, 1)
      ).to.be.revertedWith('Pausable: paused');
    });
  });

  describe('Access Control - Pause Functionality', function () {
    it('Should allow pauser to pause contract', async function () {
      await expect(
        contract.connect(pauser).pause()
      ).to.emit(contract, 'Paused');

      expect(await contract.paused()).to.equal(true);
    });

    it('Should allow pauser to unpause contract', async function () {
      await contract.connect(pauser).pause();

      await expect(
        contract.connect(pauser).unpause()
      ).to.emit(contract, 'Unpaused');

      expect(await contract.paused()).to.equal(false);
    });

    it('Should fail to pause if not pauser', async function () {
      await expect(
        contract.connect(tenant).pause()
      ).to.be.revertedWith('Not authorized to pause');
    });

    it('Should fail to unpause if not pauser', async function () {
      await contract.connect(pauser).pause();

      await expect(
        contract.connect(tenant).unpause()
      ).to.be.revertedWith('Not authorized to pause');
    });

    it('Should fail to pause when already paused', async function () {
      await contract.connect(pauser).pause();

      await expect(
        contract.connect(pauser).pause()
      ).to.be.revertedWith('Pausable: paused');
    });

    it('Should fail to unpause when not paused', async function () {
      await expect(
        contract.connect(pauser).unpause()
      ).to.be.revertedWith('Pausable: not paused');
    });
  });

  describe('Access Control - Owner Functions', function () {
    it('Should allow owner to add pauser', async function () {
      const newPauser = ethers.Wallet.createRandom().address;

      await expect(
        contract.connect(owner).addPauser(newPauser)
      ).to.emit(contract, 'PauserAdded').withArgs(newPauser);

      expect(await contract.isPauser(newPauser)).to.equal(true);
    });

    it('Should allow owner to remove pauser', async function () {
      await expect(
        contract.connect(owner).removePauser(pauser.address)
      ).to.emit(contract, 'PauserRemoved').withArgs(pauser.address);

      expect(await contract.isPauser(pauser.address)).to.equal(false);
    });

    it('Should fail to add pauser if not owner', async function () {
      const newPauser = ethers.Wallet.createRandom().address;

      await expect(
        contract.connect(tenant).addPauser(newPauser)
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('Should fail to remove pauser if not owner', async function () {
      await expect(
        contract.connect(tenant).removePauser(pauser.address)
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('Should fail to add zero address as pauser', async function () {
      await expect(
        contract.connect(owner).addPauser(ethers.ZeroAddress)
      ).to.be.revertedWith('Invalid pauser address');
    });
  });

  describe('Getter Functions', function () {
    beforeEach(async function () {
      // Create test data
      await contract.connect(landlord).createListing(2000, 2, 12345, 1);
      await contract.connect(tenant).createRequest(2500, 2, 12345, 1);
    });

    it('Should get user listings', async function () {
      const listings = await contract.getUserListings(landlord.address);
      expect(listings.length).to.equal(1);
      expect(listings[0]).to.equal(1);
    });

    it('Should get user requests', async function () {
      const requests = await contract.getUserRequests(tenant.address);
      expect(requests.length).to.equal(1);
      expect(requests[0]).to.equal(1);
    });

    it('Should return empty array for user with no listings', async function () {
      const listings = await contract.getUserListings(tenant.address);
      expect(listings.length).to.equal(0);
    });

    it('Should return empty array for user with no requests', async function () {
      const requests = await contract.getUserRequests(landlord.address);
      expect(requests.length).to.equal(0);
    });
  });

  describe('Edge Cases', function () {
    it('Should handle maximum uint32 price', async function () {
      const maxPrice = 4294967295; // 2^32 - 1

      await expect(
        contract.connect(landlord).createListing(
          maxPrice,
          2,
          12345,
          1
        )
      ).to.emit(contract, 'ListingCreated');
    });

    it('Should handle maximum uint8 bedrooms', async function () {
      const maxBedrooms = 255; // 2^8 - 1

      await expect(
        contract.connect(landlord).createListing(
          2000,
          maxBedrooms,
          12345,
          1
        )
      ).to.emit(contract, 'ListingCreated');
    });

    it('Should handle multiple listings from same landlord', async function () {
      await contract.connect(landlord).createListing(2000, 2, 12345, 1);
      await contract.connect(landlord).createListing(3000, 3, 54321, 2);

      const listings = await contract.getUserListings(landlord.address);
      expect(listings.length).to.equal(2);
    });

    it('Should handle multiple requests from same tenant', async function () {
      await contract.connect(tenant).createRequest(2500, 2, 12345, 1);
      await contract.connect(tenant).createRequest(3500, 3, 54321, 2);

      const requests = await contract.getUserRequests(tenant.address);
      expect(requests.length).to.equal(2);
    });
  });
});
