// src/hooks/useRaffleDetails.ts
import { useEffect, useState } from 'react';
import { initiateSocket, getSocket, disconnectSocket } from '@/app/lib/socket';
import {
  RAFFLE_EVENT_REQUEST,
  RAFFLE_EVENT_RESPONSE,
} from '@/constants/raffleConstants';

export function useRaffleDetails(raffleId: string) {
  const [raffles, setRaffles] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!raffleId) return;

    initiateSocket();
    const socket = getSocket();
    socket.connect();

    socket.emit(RAFFLE_EVENT_REQUEST, {
      Guid_RaffleId: raffleId,
    });

     
    socket.on(RAFFLE_EVENT_RESPONSE, (data: any) => {
      setRaffles(Array.isArray(data) ? data : [data]);
      setLoading(false);
    });

     
    socket.on('connect_error', (err) => {
      console.error('Socket connect error:', err);
      setError('Socket connection failed');
      setLoading(false);
    });
     
    return () => {
      socket.off(RAFFLE_EVENT_RESPONSE);
      disconnectSocket();
    };
  }, [raffleId]);

  return { raffles, loading, error };
}
