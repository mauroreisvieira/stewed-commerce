"use client";

import React from "react";
// UI Components
import { Theme } from "@stewed/react";

interface ThemeProviderProps {
  children?: React.ReactNode;
}
export default function ThemeProvider({ children }: ThemeProviderProps): React.ReactElement {
  return (
    <Theme
      tokens={{
        default: {
          color: {
            "primary-background": "slate-900",
            "primary-background-hovered": "slate-800",
            "primary-background-pressed": "slate-800",
            "primary-foreground-on-background": "#fff",
            "secondary-background": "slate-100",
            "secondary-background-hovered": "slate-200",
            "secondary-background-pressed": "slate-200",
            "secondary-foreground-on-background": "slate-800"
          },
          components: {
            button: {
              radius: "md"
            }
          }
        }
      }}
    >
      {children}
    </Theme>
  );
}
