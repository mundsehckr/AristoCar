
// src/services/locationService.ts

/**
 * @fileOverview A mock service for handling location-based queries.
 * In a real-world application, this would connect to a Pincode API.
 */

export interface LocationDetails {
  pincode: string;
  city: string;
  state: string;
}

// Mock database of Indian Pincodes
const pincodeData: Record<string, Omit<LocationDetails, 'pincode'>> = {
  '400001': { city: 'Mumbai', state: 'Maharashtra' },
  '400050': { city: 'Mumbai', state: 'Maharashtra' },
  '110001': { city: 'New Delhi', state: 'Delhi' },
  '110006': { city: 'New Delhi', state: 'Delhi' },
  '560001': { city: 'Bengaluru', state: 'Karnataka' },
  '560095': { city: 'Bengaluru', state: 'Karnataka' },
  '700001': { city: 'Kolkata', state: 'West Bengal' },
  '600001': { city: 'Chennai', state: 'Tamil Nadu' },
  '500001': { city: 'Hyderabad', state: 'Telangana' },
  '411001': { city: 'Pune', state: 'Maharashtra' },
  '380001': { city: 'Ahmedabad', state: 'Gujarat' },
  '302001': { city: 'Jaipur', state: 'Rajasthan' },
};

/**
 * Fetches city and state for a given Indian Pincode.
 * @param pincode - The 6-digit Indian Pincode.
 * @returns A promise that resolves to LocationDetails or null if not found.
 */
export async function getCityFromPincode(pincode: string): Promise<LocationDetails | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));

  if (pincodeData[pincode]) {
    return {
      pincode,
      ...pincodeData[pincode],
    };
  }
  
  return null;
}

/**
 * A mock function to get pincodes for a given city.
 * In a real app, this would query a database.
 * @param city - The name of the city.
 * @returns A promise that resolves to an array of matching pincodes.
 */
export async function getPincodesFromCity(city: string): Promise<string[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const lowerCity = city.toLowerCase();
    const matchingPincodes = Object.entries(pincodeData)
        .filter(([, details]) => details.city.toLowerCase() === lowerCity)
        .map(([pincode]) => pincode);
        
    return matchingPincodes;
}
