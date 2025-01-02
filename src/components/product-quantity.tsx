import React, { useEffect } from "react";
// UI Components
import { FormField, Box, Group, Button, TextField } from "@stewed/react";
// Hooks
import { useInput } from "@stewed/hooks";
// Icons
import { HiMinusSm, HiOutlinePlusSm } from "react-icons/hi";

interface ProductQuantityProps {
  max: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
}

export function ProductQuantity({
  max,
  defaultValue = 1,
  onValueChange
}: ProductQuantityProps): React.ReactElement {
  // Using a custom hook `useInput` to manage the input value for the quantity.
  const {
    value: quantity,
    setValue: setQuantity,
    onChange: onQuantityChange
  } = useInput<number>(defaultValue);

  useEffect(() => {
    onValueChange?.(quantity);
  }, [onValueChange, quantity]);

  return (
    <FormField>
      <FormField.Label htmlFor="quantity">Quantity</FormField.Label>
      <FormField.Control>
        <Box
          radius="md"
          borderColor="neutral-faded"
          borderStyle="solid"
          borderWidth={1}
          padding={{ block: "xxs", inline: "xxs" }}
        >
          <Group gap="xxs">
            <Button
              size="sm"
              skin="neutral"
              appearance="soft"
              leftSlot={<HiMinusSm size={16} />}
              onClick={() => setQuantity(quantity - 1)}
              disabled={quantity <= 1}
              iconOnly
            >
              Decrease
            </Button>

            <TextField
              id="quantity"
              skin={quantity > max ? "critical" : "neutral"}
              size="sm"
              appearance="ghost"
              name="quantity"
              value={quantity}
              onChange={onQuantityChange}
              maxChars={max.toString().length}
              alignment="center"
              pattern="\d*"
              autoComplete="off"
            />

            <Button
              size="sm"
              skin="neutral"
              appearance="soft"
              leftSlot={<HiOutlinePlusSm size={16} />}
              onClick={() => setQuantity(quantity + 1)}
              disabled={quantity === max}
              iconOnly
            >
              Increase
            </Button>
          </Group>
        </Box>
      </FormField.Control>
    </FormField>
  );
}
