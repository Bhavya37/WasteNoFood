import type { FoodListing } from '@/lib/types';

export const foodListings: FoodListing[] = [
  {
    id: '1',
    donorName: 'The Grand Eatery',
    foodItems: [
      { name: 'Biryani Rice', quantity: 20 },
      { name: 'Chicken Curry', quantity: 15 },
    ],
    expiryTime: 'Best before 3 hours',
    location: {
      address: '123 Main St, Downtown',
      latitude: 34.0522,
      longitude: -118.2437,
    },
    status: 'Available',
  },
  {
    id: '2',
    donorName: 'City Catering Co.',
    foodItems: [
      { name: 'Vegetable Pasta', quantity: 30 },
      { name: 'Garlic Bread', quantity: 50 },
    ],
    expiryTime: 'Best before 2 hours',
    location: {
      address: '456 Oak Ave, Suburbia',
      latitude: 34.0622,
      longitude: -118.2537,
    },
    status: 'Available',
  },
  {
    id: '3',
    donorName: 'The Royal Hotel',
    foodItems: [
        { name: 'Pancakes', quantity: 40 },
        { name: 'Assorted Pastries', quantity: 100 }
    ],
    expiryTime: 'Best before 6 hours',
    location: {
      address: '789 Pine Ln, Uptown',
      latitude: 34.0722,
      longitude: -118.2637,
    },
    status: 'Claimed',
  },
  {
    id: '4',
    donorName: 'QuickBites Cafe',
    foodItems: [
      { name: 'Sandwiches', quantity: 25 },
      { name: 'Lentil Soup', quantity: 10 },
    ],
    expiryTime: 'Best before 4 hours',
    location: {
      address: '101 Maple Rd, Westside',
      latitude: 34.0822,
      longitude: -118.2737,
    },
    status: 'Available',
  },
];
