import React, { useCallback, useState } from "react";
// Next
import Link from "next/link";
// UI Components
import { Theme, Box, Grid, Stack, Text, useTheme } from "@stewed/react";
// Partials
import { ProductCard, type ProductCardProps } from "./product-card";
import { ProductQuickView } from "./product-quick-view";
// Types
import type { IProduct } from "@/api/data";

interface ProductsGridProps extends Pick<ProductCardProps, "showQuickActions"> {
  data: IProduct[];
}

export function ProductsGrid({ showQuickActions, data }: ProductsGridProps): React.ReactElement {
  const [isOpen, setOpen] = useState(false);
  const [product, setProduct] = useState<IProduct | undefined>();

  const onHandleQuickView = useCallback((details: IProduct) => {
    setOpen(true);
    setProduct(details);
  }, []);

  const { tokens } = useTheme();

  return (
    <>
      <Theme
        cssScope="product-item"
        tokens={{
          default: {
            ...tokens?.default,
            components: {
              button: {
                radius: "full"
              }
            }
          }
        }}
      >
        <Box fullHeight>
          {data.length ? (
            <Grid
              cols={1}
              responsive={{ sm: { cols: 2 }, md: { cols: 3 }, lg: { cols: 4 } }}
              gap="xl"
            >
              {data.map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`}>
                  <ProductCard
                    {...product}
                    showQuickActions={showQuickActions}
                    onQuickView={onHandleQuickView}
                  />
                </Link>
              ))}
            </Grid>
          ) : (
            <Box padding={{ block: "9xl" }} fullWidth>
              <Stack direction="column" items="center" justify="center" style={{ height: "100%" }}>
                <Text size="2xl" weight="semi-bold" skin="neutral-faded" space={{ y: "sm" }}>
                  No products found
                </Text>
                <Text>Your search did not match any product</Text>
              </Stack>
            </Box>
          )}
        </Box>
      </Theme>

      <ProductQuickView product={product} open={isOpen} onClose={() => setOpen(false)} />
    </>
  );
}
