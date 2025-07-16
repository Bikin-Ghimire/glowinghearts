'use client';
import { SERVICE_URL } from '@/constants/raffleConstants';
import useSWR from 'swr';

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Fetch error: ${res.status}`);
  }
  return res.json();
};

export default function useGetAllRaffles() {
  const getAllRaffleUrl = `${SERVICE_URL}/RaffleList/0/100`;
  const { data, error, isLoading } = useSWR(getAllRaffleUrl, fetcher, {
    revalidateOnFocus: false,
  });

  const raffleList = Array.isArray(data) ? data : [];

  return {
    raffleList,
    isRaffleLoading: isLoading,
    isRaffleError: error,
  };
}
