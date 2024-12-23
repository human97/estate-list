import apiClient from './client';

export interface Estate {
  id: number;
  address: string;
  city: string;
  type: string;
  price: number;
}

export interface GetEstatesParams {
  city?: string;
  type?: string;
  search?: string;
}

export async function getEstates(params: GetEstatesParams): Promise<Estate[]> {
  const response = await apiClient.get('/estates', { params })
  return response.data
}
