"use client";

import React, {memo, useState, useRef} from "react";
import {StatsPreviewProfileHeader} from "@/widgets/ProfileHeader/StatsPreviewProfileHeader";
import {useCurrentProfile} from "@/entities/profile/hooks/useProfile";
import {ProfileTabs} from "@/widgets/ProfileTabs/ProfileTabs";
import {SelectMainCategoryPopover} from "@/widgets/ProfileHeader/components/SelectMainCategoryPopover";

export const ProfilePage = memo(() => {
		const {data: profileData, isLoading, error} = useCurrentProfile();
		const [isPopoverOpen, setIsPopoverOpen] = useState(false);
		const editButtonRef = useRef<HTMLButtonElement>(null);

		if (isLoading) {
				return (
						<div className="min-h-screen bg-bg-default flex items-center justify-center">
								Loading...
						</div>
				);
		}

		if (error || !profileData) {
				return (
						<div className="min-h-screen bg-bg-default flex items-center justify-center text-red-500">
								{error instanceof Error ? error.message : "Failed to load profile"}
						</div>
				);
		}

		const handleOpenPopover = () => setIsPopoverOpen(true);
		const handleClosePopover = () => {
				setIsPopoverOpen(false);
		};

		return (
				<>
						<div className="min-h-screen bg-bg-default">
								<div className="max-w-6xl mx-auto px-4 py-8">
										<StatsPreviewProfileHeader
												profileData={profileData}
												isOwnProfile={true}
												onEditMainCategory={handleOpenPopover}
												editButtonRef={editButtonRef}
										/>
										<ProfileTabs/>
								</div>
						</div>
						<SelectMainCategoryPopover
								isOpen={isPopoverOpen}
								onClose={handleClosePopover}
								currentCategoryId={profileData.mainSkillCategory?.id}
								anchorElement={editButtonRef.current}
						/>
				</>
		);
});

ProfilePage.displayName = "ProfilePage";

export default ProfilePage;
