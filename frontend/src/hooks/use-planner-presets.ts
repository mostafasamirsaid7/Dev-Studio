import { useState, useEffect } from "react";
import { getPlannerPresets, type PlannerPresetsResponse } from "../lib/api/planner";

let cachedPresets: PlannerPresetsResponse | null = null;
let promise: Promise<PlannerPresetsResponse> | null = null;

export function usePlannerPresets() {
  const [data, setData] = useState<PlannerPresetsResponse | null>(cachedPresets);
  const [loading, setLoading] = useState(!cachedPresets);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedPresets) {
      setData(cachedPresets);
      setLoading(false);
      return;
    }

    if (!promise) {
      promise = getPlannerPresets()
        .then((res) => {
          cachedPresets = res;
          return res;
        })
        .catch((err) => {
          promise = null; // retry on failure
          throw err;
        });
    }

    let isMounted = true;
    promise
      .then((res) => {
        if (isMounted) {
          setData(res);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to load planner presets");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
}
