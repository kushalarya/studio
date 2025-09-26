import data from './destinations.json';

export type Destination = {
  id: string;
  name: string;
  description: string;
  imageUrlId: string;
  visitCount: number;
};

export const destinations: Destination[] = data.destinations;
