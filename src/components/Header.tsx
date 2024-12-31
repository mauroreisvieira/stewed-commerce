import React from "react";
// UI Components
import { Box, Text, Container, Stack, Dropdown, ListBox } from "@stewed/react";
// Hooks
import { useShop, type ISort } from "@/providers/ShopProvider";
// Icons
import { LuCheck } from "react-icons/lu";

interface IPopularSort {
  name: string;
  value: ISort["popular"];
}

interface IPriceSort {
  name: string;
  value: ISort["price"];
}

const RatingSort: IPopularSort[] = [
  {
    name: "Most popular",
    value: "most"
  },
  {
    name: "Best rating",
    value: "best"
  },
  {
    name: "Newest",
    value: "newest"
  }
];

const PriceSort: IPriceSort[] = [
  {
    name: "Low to high",
    value: "low"
  },
  {
    name: "High to low",
    value: "high"
  }
];

export function Header(): React.ReactElement {
  const { sort, setSort } = useShop();

  return (
    <Box skin="neutral-faded" padding={{ block: "4xl" }}>
      <Container screen="xl" alignment="center" padding={{ block: "7xl", inline: "lg" }}>
        <Stack justify="between" items="baseline">
          <div>
            <Text as="h1" size="3xl" weight="medium">
              Collections
            </Text>
            <Text weight="light" skin="neutral">
              You deserve the best. Shop our latest collections and find the perfect piece for your
              wardrobe.
            </Text>
          </div>
          <Dropdown<HTMLButtonElement>
            renderAnchor={({ ref, isOpen, open, close }) => (
              <Dropdown.Button ref={ref} onClick={isOpen ? close : open} size="md">
                Filter
              </Dropdown.Button>
            )}
            placement="bottom-end"
          >
            {({ close }) => {
              return (
                <Box padding={{ inline: "xs", block: "md" }}>
                  <ListBox>
                    <ListBox.Group title="Sort by">
                      {RatingSort.map(({ value, name }) => (
                        <ListBox.Item
                          key={value}
                          as="button"
                          rightSlot={value === sort.popular ? <LuCheck /> : undefined}
                          onClick={() => {
                            setSort({ popular: value });
                            close();
                          }}
                        >
                          {name}
                        </ListBox.Item>
                      ))}
                    </ListBox.Group>
                    <ListBox.Separator />
                    <ListBox.Group title="Price">
                      {PriceSort.map(({ value, name }) => (
                        <ListBox.Item
                          key={value}
                          as="button"
                          rightSlot={value === sort.price ? <LuCheck /> : undefined}
                          onClick={() => {
                            setSort({ price: value });
                            close();
                          }}
                        >
                          {name}
                        </ListBox.Item>
                      ))}
                    </ListBox.Group>
                  </ListBox>
                </Box>
              );
            }}
          </Dropdown>
        </Stack>
      </Container>
    </Box>
  );
}
