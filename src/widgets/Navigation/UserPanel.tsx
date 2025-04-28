"use client";

import { memo } from "react";
import { Avatar, Card, Flex, Box, Text } from "@radix-ui/themes";
import { GearIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface UserPanelProps {
  name: string;
  avatarUrl?: string;
  className?: string;
}

export const UserPanel = memo(function UserPanel({
  name,
  avatarUrl,
  className,
}: UserPanelProps) {
  return (
    <Box style={{ maxWidth: 320 }} className={className}>
      <Card
        size="1"
        className="border-2 border-[color:var(--color-primary)] !rounded-lg shadow-none p-3"
      >
        <Flex gap="3" align="center">
          <Avatar
            size="3"
            src={avatarUrl}
            fallback={name[0].toUpperCase()}
            radius="full"
            className="border-2 border-[color:var(--color-primary)]"
          />
          <Box>
            <Text as="div" size="3" weight="bold">
              {name}
            </Text>
            <Text as="div" size="2" color="gray">
              Engineering
            </Text>
          </Box>
          {/* <Link
            href="/settings"
            className="ml-auto p-2 rounded-lg hover:bg-[color:var(--color-gray-300)] hover:bg-opacity-20 transition-colors"
          >
            <GearIcon
              width={20}
              height={20}
              className="text-[color:var(--color-default-text)]"
            />
          </Link> */}
        </Flex>
      </Card>
    </Box>
  );
});
