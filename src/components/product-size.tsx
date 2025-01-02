import React, { useEffect, useState } from "react";
// UI Components
import { FormField, Group, Button } from "@stewed/react";
// Icons
import { SIZES } from "@/api/data";

interface ProductSizeProps {
  values: string[];
  onValueChange?: (string: string) => void;
}

export function ProductSize({ values, onValueChange }: ProductSizeProps): React.ReactElement {
  // State to manage the selected size of the product
  const [size, setSize] = useState("");

  useEffect(() => {
    onValueChange?.(size);
  }, [onValueChange, size]);

  return (
    <FormField>
      <FormField.Label htmlFor="group">Size</FormField.Label>
      <FormField.Control>
        <Group gap="sm">
          {SIZES.map((value) => (
            <Button
              key={value}
              size="sm"
              disabled={!values.includes(value)}
              tabIndex={value === size ? 0 : -1}
              pressed={value === size}
              skin={value === size ? "primary" : "neutral"}
              appearance={value === size ? "filled" : "outline"}
              onClick={() => setSize(value)}
            >
              {value}
            </Button>
          ))}
        </Group>
      </FormField.Control>
    </FormField>
  );
}
