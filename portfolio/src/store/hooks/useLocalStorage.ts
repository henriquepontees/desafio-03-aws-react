import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: any, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        setStoredValue(JSON.parse(item));
      } catch (error) {
        console.error(`Erro ao carregar ${key} do localStorage:`, error);
      }
    } else {
      setStoredValue(initialValue);
    }
  }, [key, initialValue]);

  useEffect(() => {
    if (storedValue !== undefined && key !== 'myHistory' && key !== 'myLinkedln' && key !== 'myInstagram' && key !== 'myFacebook' && key !== 'myTwitter' && key !== 'myYoutube' && key !== 'myEmailText' ) {
      try {
        localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error(`Erro ao salvar ${key} no localStorage:`, error);
      }
    }
  }, [key, storedValue]);

  const updateObjectInLocalStorage = (key: any, updatedData: any) => {
    if (key === 'myHistory' || key === 'myLinkedln' || key === 'myInstagram' || key === 'myFacebook' || key === 'myTwitter' || key === 'myYoutube' || key === 'myEmailText' ) return; // Ignora atualizações para estas chaves

    const storedItem = localStorage.getItem(key);
    if (storedItem) {
      try {
        const parsedItem = JSON.parse(storedItem);
        if (Array.isArray(parsedItem)) {
          const updatedArray = parsedItem.map((user: any) => 
            user.id === updatedData.id ? { ...user, ...updatedData } : user
          );
          localStorage.setItem(key, JSON.stringify(updatedArray));
        } else if (typeof parsedItem === 'object') {
          localStorage.setItem(key, JSON.stringify({ ...parsedItem, ...updatedData }));
        }
      } catch (error) {
        console.error(`Erro ao atualizar ${key} no localStorage:`, error);
      }
    }
  };

  

  return [storedValue, setStoredValue, updateObjectInLocalStorage] as const;
}

export default useLocalStorage;
