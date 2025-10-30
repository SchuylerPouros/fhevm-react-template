import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { UserListing, UserRequest } from '../lib/contract';

export function useContract(contract: ethers.Contract | null, account: string) {
  const [activeListings, setActiveListings] = useState<number>(0);
  const [activeRequests, setActiveRequests] = useState<number>(0);
  const [userListings, setUserListings] = useState<UserListing[]>([]);
  const [userRequests, setUserRequests] = useState<UserRequest[]>([]);
  const [loading, setLoading] = useState(false);

  const loadStats = useCallback(async () => {
    if (!contract) return;

    try {
      const [listings, requests] = await Promise.all([
        contract.getActiveListingsCount(),
        contract.getActiveRequestsCount(),
      ]);
      setActiveListings(Number(listings));
      setActiveRequests(Number(requests));
    } catch (error) {
      console.error('Load stats error:', error);
    }
  }, [contract]);

  const loadUserData = useCallback(async () => {
    if (!contract || !account) return;

    setLoading(true);
    try {
      const [listings, requests] = await Promise.all([
        contract.getUserListings(account),
        contract.getUserRequests(account),
      ]);

      const listingsDetails = await Promise.all(
        listings.map(async (id: bigint) => {
          const details = await contract.getListingDetails(id);
          return {
            id: id.toString(),
            isActive: details[0],
            isMatched: details[3],
          };
        })
      );

      const requestsDetails = await Promise.all(
        requests.map(async (id: bigint) => {
          const details = await contract.getRequestDetails(id);
          return {
            id: id.toString(),
            isActive: details[0],
            isMatched: details[3],
          };
        })
      );

      setUserListings(listingsDetails);
      setUserRequests(requestsDetails);
    } catch (error) {
      console.error('Load user data error:', error);
    } finally {
      setLoading(false);
    }
  }, [contract, account]);

  const refresh = useCallback(() => {
    loadStats();
    loadUserData();
  }, [loadStats, loadUserData]);

  useEffect(() => {
    if (contract && account) {
      loadStats();
      loadUserData();
    }
  }, [contract, account, loadStats, loadUserData]);

  return {
    activeListings,
    activeRequests,
    userListings,
    userRequests,
    loading,
    refresh,
  };
}
