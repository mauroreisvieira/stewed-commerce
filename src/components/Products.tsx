import React, { useCallback, useState } from "react";
// Next
import Link from "next/link";
// UI Components
import { Theme, Box, Grid, Stack, Text, useTheme } from "@stewed/react";
// Partials
import { Product, type ProductProps } from "./Product";
import { QuickView } from "./QuickView";
import { IProduct } from "@/api/data";

interface ProductsProps {
  data: ProductProps[];
}

export function Products({ data }: ProductsProps): React.ReactElement {
  const { tokens } = useTheme();
  const [isOpen, setOpen] = useState(false);
  const [product, setProduct] = useState<IProduct | undefined>();

  const onHandleQuickView = useCallback((details: IProduct) => {
    setOpen(true);
    setProduct(details);
  }, []);

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
                <Link key={product.id} href={`/collections/products/${product.slug}`}>
                  <Product {...product} onQuickView={onHandleQuickView} />
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
      <QuickView product={product} open={isOpen} onClose={() => setOpen(false)} />
    </>
  );
}
