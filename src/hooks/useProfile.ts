import { useEffect, useState } from "react";
import { getLoggedinUser } from "@/api";
import { Admin } from "@/interfaces";

export const useProfile = (deps?: any[]) => {
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<Admin | null>(null);

  useEffect(() => {
    const fetchProfile = () => {
      try {
        setLoading(true);
        const userProfile = getLoggedinUser();
        setUserProfile(userProfile);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, deps ?? []);

  return { userProfile, loading };
};
