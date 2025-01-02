import React from "react";
// UI Components
import { Text, Stack, Accordion, Checkbox, Separator } from "@stewed/react";
// Hooks
import { useShop } from "@/providers/ShopProvider";
// Icons
import { HiMinusSm, HiOutlinePlusSm } from "react-icons/hi";
// Data
import { FILTERS } from "@/api/data";

export function ProductFilters(): React.ReactElement {
  const { filters, setFilters } = useShop();

  return (
    <Stack responsive={{ md: { hidden: false } }} hidden>
      <Accordion multipleExpanded>
        {FILTERS.map(({ name, key, values, defaultOpen }) => (
          <Accordion.Item key={name} value={name} defaultOpen={defaultOpen}>
            {({ open }) => (
              <>
                <Accordion.Header rightSlot={open ? <HiMinusSm /> : <HiOutlinePlusSm />}>
                  {name}
                </Accordion.Header>
                <Accordion.Body>
                  <Checkbox.Group
                    orientation="vertical"
                    checkedValues={filters[key]}
                    onCheckedChange={(value) => setFilters({ [key]: value })}
                  >
                    {values.map((value) => (
                      <Checkbox key={value} value={value}>
                        <Text weight="normal" size="sm">
                          {value}
                        </Text>
                      </Checkbox>
                    ))}
                  </Checkbox.Group>
                </Accordion.Body>
              </>
            )}
          </Accordion.Item>
        ))}
      </Accordion>

      <Separator space={{ inline: "6xl" }} orientation="vertical" />
    </Stack>
  );
}
