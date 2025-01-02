"use client";

import React, { useMemo } from "react";
// UI Components
import { Container, Box, Grid } from "@stewed/react";
import { ProductsGrid } from "@/components/products-grid";
// Hooks
import { useGetImages } from "@/api/hooks/useGetImages";
import { useShop } from "@/providers/ShopProvider";
import { Heading } from "@/components/heading";
import { ProductFilters } from "./product-filters";
// Types
import type { IProduct } from "@/api/data";

interface IProductsProps {
  data: IProduct[];
}

export function Products({ data }: IProductsProps): React.ReactElement {
  const { data: images } = useGetImages({ query: "fashion", perPage: data.length });
  const { filters, sort } = useShop();

  const productsList = useMemo(() => {
    // If no filters are applied, return all products
    const filteredProducts = data
      .map((product) => ({
        ...product,
        image: images?.results[product.id - 1]?.urls.small
      }))
      .filter(({ category, color, tag }) => {
        // Check if the product matches the Tag filter (only if filters.tag is not empty)
        const matchesTag = filters.tag.length === 0 || filters.tag.includes(tag);

        // Check if the product matches the Category filter (only if filters.category is not empty)
        const matchesCategory =
          filters.category.length === 0 || filters.category.includes(category);

        // Check if the product matches the Color filter (only if filters.color is not empty)
        const matchesColor =
          filters.color.length === 0 || color.some((co) => filters.color.includes(co));

        // Return product only if it matches all selected filters
        return matchesTag && matchesCategory && matchesColor;
      });

    if (sort.price) {
      filteredProducts.sort((a, b) => {
        if (sort.price === "high") {
          return b.price?.value - a.price.value;
        }

        if (sort.price === "low") {
          return a.price.value - b.price.value;
        }

        return 0;
      });
    }

    if (sort.popular) {
      filteredProducts.sort((a, b) => {
        switch (sort.popular) {
          case "most":
            // Assuming "most" refers to sales products
            return b.sales - a.sales;
          case "best":
            // You could use the rate or another logic for "best" products
            return b.rate - a.rate; // You can change this based on your logic
          default:
            return 0;
        }
      });
    }

    return filteredProducts;
  }, [
    data,
    sort.price,
    sort.popular,
    images?.results,
    filters.tag,
    filters.category,
    filters.color
  ]);

  return (
    <Box>
      <Heading />

      <Container screen="xl" alignment="center" padding={{ block: "7xl", inline: "lg" }}>
        <Grid cols={4}>
          <ProductFilters />
          <Grid.Item colSpan={4} responsive={{ md: { colSpan: 3 } }}>
            <ProductsGrid data={productsList} showQuickActions />
          </Grid.Item>
        </Grid>
      </Container>
    </Box>
  );
}
