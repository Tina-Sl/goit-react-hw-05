// не використовую
import { useEffect, useState } from "react";
export const useLoading = (func, param) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await func(param);
        setData(data);
      } catch (error) {
        console.alert("Error...", error);
      }
    };
    getData();
  }, [func, param]);

  return [data, setData];
};
