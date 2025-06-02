
import { useState, useCallback, useMemo } from 'react';

interface UsePaginatedDataOptions<T> {
  data: T[];
  itemsPerPage: number;
  initialPage?: number;
}

interface UsePaginatedDataReturn<T> {
  currentPageData: T[];
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  loadMore: () => void;
  goToPage: (page: number) => void;
  reset: () => void;
  isLoading: boolean;
}

export const usePaginatedData = <T>({
  data,
  itemsPerPage,
  initialPage = 1
}: UsePaginatedDataOptions<T>): UsePaginatedDataReturn<T> => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);

  // חישוב סך הדפים
  const totalPages = useMemo(() => {
    return Math.ceil(data.length / itemsPerPage);
  }, [data.length, itemsPerPage]);

  // נתונים של הדף הנוכחי (בגישת "Load More" - מציג את כל הדפים עד הנוכחי)
  const currentPageData = useMemo(() => {
    return data.slice(0, currentPage * itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  // בדיקה אם יש דף הבא
  const hasNextPage = useMemo(() => {
    return currentPage < totalPages;
  }, [currentPage, totalPages]);

  // בדיקה אם יש דף קודם
  const hasPreviousPage = useMemo(() => {
    return currentPage > 1;
  }, [currentPage]);

  // טעינת עוד פריטים (עדכון דף)
  const loadMore = useCallback(() => {
    if (hasNextPage && !isLoading) {
      setIsLoading(true);
      
      // סימולציה של טעינה (לשיפור UX)
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsLoading(false);
      }, 200);
    }
  }, [hasNextPage, isLoading]);

  // מעבר לדף ספציפי
  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setIsLoading(true);
      
      setTimeout(() => {
        setCurrentPage(page);
        setIsLoading(false);
      }, 200);
    }
  }, [totalPages, currentPage]);

  // איפוס לדף הראשון
  const reset = useCallback(() => {
    setCurrentPage(initialPage);
    setIsLoading(false);
  }, [initialPage]);

  return {
    currentPageData,
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    loadMore,
    goToPage,
    reset,
    isLoading
  };
};

// Hook ייעודי לחיפוש עם Pagination
export const useSearchWithPagination = <T>(
  data: T[],
  searchTerm: string,
  filterFn: (item: T, term: string) => boolean,
  itemsPerPage = 20
) => {
  // סינון הנתונים לפי חיפוש
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    return data.filter(item => filterFn(item, searchTerm.toLowerCase()));
  }, [data, searchTerm, filterFn]);

  // Pagination על הנתונים המסוננים
  const paginatedResult = usePaginatedData({
    data: filteredData,
    itemsPerPage
  });

  return {
    ...paginatedResult,
    totalItems: filteredData.length,
    searchTerm
  };
};
