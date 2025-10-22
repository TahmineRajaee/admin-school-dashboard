import { useState, useMemo } from "react";

const useSearch = (data, searchFields = []) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    const lowercasedSearch = searchTerm.toLowerCase();

    return data.filter((item) => {
      if (searchFields.length > 0) {
        return searchFields.some(
          (field) =>
            item[field] &&
            item[field].toString().toLowerCase().includes(lowercasedSearch)
        );
      }

      return Object.values(item).some(
        (value) =>
          value && value.toString().toLowerCase().includes(lowercasedSearch)
      );
    });
  }, [data, searchTerm, searchFields]);

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
  };
};

export default useSearch;
