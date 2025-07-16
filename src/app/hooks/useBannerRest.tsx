// hooks/useUsers.ts
import { SERVICE_URL } from '@/constants/raffleConstants';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(res => res.json())

export default function useBannerREST(id){
    const getRaffleBannerUrl = SERVICE_URL + '/Banner/'+ id + '/50';
    const { data, error, isLoading } = useSWR(getRaffleBannerUrl, fetcher);
    const charityData = Array.isArray(data) ? data : [data]
    return {
        charityData,
        isLoading,
        isBannerError: error
    }
}
