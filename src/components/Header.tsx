"use client";

import React from "react";
// UI Components
import { Box, Text, Container, Stack } from "@stewed/react";
import Link from "next/link";

export function Header(): React.ReactElement {
  return (
    <Box
      skin="primary-faded"
      padding={{ block: "lg" }}
      style={{ position: "sticky", top: 0, zIndex: 1 }}
    >
      <Container screen="xl" alignment="center" padding={{ inline: "lg" }}>
        <Stack justify="between">
          <Stack gap="6xl">
            <Text weight="extra-bold" size="sm">
              Logo
            </Text>
            <Stack gap="2xl">
              <Link href="/">
                <Text size="sm" skin="neutral">
                  Home
                </Text>
              </Link>

              <Link href="/products">
                <Text size="sm" skin="neutral">
                  Shop
                </Text>
              </Link>
            </Stack>
          </Stack>
          <div>Cart/User</div>
        </Stack>
      </Container>
    </Box>
  );
}
