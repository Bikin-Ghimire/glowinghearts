// hooks/useUsers.ts
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(res => res.json())

export default function useBannerREST(id){
    const getRaffleBannerUrl = 'https://5050-test.mikematich.ca' + '/Banner/'+ id + '/1';
    const { data, error, isLoading } = useSWR(getRaffleBannerUrl, fetcher);
    const charityData = Array.isArray(data) ? data : [data]
    return {
        charityData,
        isLoading,
        isBannerError: error
    }
}
