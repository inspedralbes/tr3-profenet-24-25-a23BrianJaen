import { useTheme } from "next-themes";
import { Courses } from "../../../types/types";
import { useEffect, useState, useRef, useCallback } from "react";

interface SelectedCloneClassesProps {
  classes: Courses[];
  selectedClasses: Courses[];
  handleClassesClick: (classItem: Courses) => void;
  fetchMoreClasses: (page: number) => Promise<Courses[]>;
}

export default function SelectedCloneClasses({
  classes: initialClasses,
  selectedClasses,
  handleClassesClick,
  fetchMoreClasses
}: SelectedCloneClassesProps) {
  const { theme } = useTheme();

  // Estate for managing loaded classes
  const [classes, setClasses] = useState<Courses[]>(initialClasses);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Reference for observer element
  const observerRef = useRef<HTMLDivElement>(null);

  // Function for load more classes
  const loadMoreClasses = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newClasses = await fetchMoreClasses(page);
      if (newClasses.length === 0) {
        setHasMore(false);
      } else {
        setClasses(prev => [...prev, ...newClasses]);
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error("Error loading more classes:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchMoreClasses, page, loading, hasMore]);

  // Config Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreClasses();
        }
      },
      { threshold: 0.1 }
    );

    const currentObserver = observerRef.current;
    if (currentObserver) {
      observer.observe(currentObserver);
    }

    return () => {
      if (currentObserver) {
        observer.unobserve(currentObserver);
      }
    };
  }, [loadMoreClasses, hasMore]);

  useEffect(() => {
    console.log(selectedClasses);
  }, [selectedClasses]);

  return (
    <div className="max-h-[60vh] overflow-y-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {classes.map((classItem) => {
          // Compares with the current class is selected
          const isSelected = selectedClasses.some(
            (selectedClass) => selectedClass.id === classItem.id
          );

          return (
            <div
              key={classItem.id}
              onClick={() => handleClassesClick(classItem)}
              className={`flex items-center justify-center rounded-lg hover:scale-110 hover:cursor-pointer
                hover:border hover:border-primary transition-transform duration-300 ease-in-out py-3 px-2 m-2
                origin-center
                ${isSelected ? 'scale-105 border border-primary' : ''} 
                ${isSelected ? (theme === "dark" ? "bg-blue-950" : "bg-blue-100") : ""}`}
            >
              <p className="text-primary">{classItem.name}</p>
            </div>
          );
        })}
      </div>

      {/* Elemento observado para activar carga de más elementos */}
      <div
        ref={observerRef}
        className="h-10 w-full flex items-center justify-center my-2"
      >
        {loading && (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        )}
        {!hasMore && classes.length > 0 && (
          <p className="text-sm text-primary">No hi ha més clases disponibles.</p>
        )}
      </div>
    </div>
  );
}
