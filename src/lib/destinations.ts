import data from './destinations.json';

export type Destination = {
  id: string;
  name: string;
  description: string;
  imageUrlId: string;
  visitCount: number;
  tags: string[];
};

export const destinations: Destination[] = data.destinations;
