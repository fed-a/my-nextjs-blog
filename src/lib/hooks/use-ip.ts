import cookies from 'browser-cookies';
import { useEffect, useState } from 'react';

export const useUserIp = () => {
  const [ip, setUserIp] = useState<string>('');

  useEffect(() => {
    const userIp = cookies.get('user-ip') ?? '';
    setUserIp(userIp);
  }, []);

  return ip;
};
