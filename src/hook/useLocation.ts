import { useState, useCallback } from "react";
import { Location } from "../class/Location";

export const useLocation = (initialEntities: Location[] = []) => {
  const [entities, setEntities] = useState<Location[]>(initialEntities);

  const addEntity = useCallback((entity: Location) => {
    setEntities((prev) => [...prev, entity]);
  }, []);

  const removeEntity = useCallback((id: number) => {
    setEntities((prev) => prev.filter((e) => e.id !== id));
  }, []);

  return { entities, addEntity, removeEntity };
};
