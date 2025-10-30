interface UserActivityProps {
  userListings: any[];
  userRequests: any[];
}

function UserActivity({ userListings, userRequests }: UserActivityProps) {
  return (
    <div className="user-section">
      <h3>Your Activity</h3>
      <div className="listings-requests">
        <div className="item-list">
          <h4>Your Listings</h4>
          <div>
            {userListings.length === 0 ? (
              <p>No listings yet</p>
            ) : (
              userListings.map((listing) => (
                <div key={listing.id} className="item">
                  Listing #{listing.id} - {listing.isActive ? 'Active' : 'Inactive'} -{' '}
                  {listing.isMatched ? 'Matched' : 'Available'}
                </div>
              ))
            )}
          </div>
        </div>
        <div className="item-list">
          <h4>Your Requests</h4>
          <div>
            {userRequests.length === 0 ? (
              <p>No requests yet</p>
            ) : (
              userRequests.map((request) => (
                <div key={request.id} className="item">
                  Request #{request.id} - {request.isActive ? 'Active' : 'Inactive'} -{' '}
                  {request.isMatched ? 'Matched' : 'Available'}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserActivity;
