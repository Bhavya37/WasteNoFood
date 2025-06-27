export type FoodItem = {
  name: string;
  quantity: number;
};

export type FoodListing = {
  id: string;
  donorName: string;
  foodItems: FoodItem[];
  expiryTime: string; // e.g., "4 hours"
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  status: 'Available' | 'Claimed';
};
