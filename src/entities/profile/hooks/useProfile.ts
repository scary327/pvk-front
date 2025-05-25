import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { profileApi } from "../api/profileApi";
import { ProfileResponse } from "@/shared/types/api/profile";

export const profileKeys = {
  all: ["profile"] as const,
  current: () => [...profileKeys.all, "me"] as const,
};

type ProfileQueryKey = ReturnType<typeof profileKeys.current>;

export const useCurrentProfile = <TData = ProfileResponse>(
  options?: Omit<
    UseQueryOptions<ProfileResponse, Error, TData, ProfileQueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<ProfileResponse, Error, TData, ProfileQueryKey>({
    queryKey: profileKeys.current(),
    queryFn: profileApi.getCurrentProfile,
    ...options,
  });
};
