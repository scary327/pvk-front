"use client";

import React, { memo } from "react";
import { userData } from "@/shared/api/mocks/profileData";
import { StatsPreviewProfileHeader } from "@/widgets/ProfileHeader/StatsPreviewProfileHeader";
import { ProfileTabs } from "@/widgets/ProfileTabs/ProfileTabs";

export const ProfilePage = memo(() => {
  return (
    <div className="min-h-screen bg-bg-default">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <StatsPreviewProfileHeader userData={userData} />

        {/* Tabs Section */}
        <ProfileTabs userData={userData} />
      </div>
    </div>
  );
});

ProfilePage.displayName = "ProfilePage";

export default ProfilePage;
