"use client";

import React, { useMemo } from "react";
// Next
import Image from "next/image";
// UI Components
import {
  Text,
  Container,
  Stack,
  Box,
  Grid,
  Tag,
  Button,
  AspectRatio,
  Avatar,
  Separator,
  Progress
} from "@stewed/react";
import { ProductsGrid } from "@/components/products-grid";
import { ProductQuantity } from "./product-quantity";
// Icons
import { HiStar } from "react-icons/hi";
import { useGetImages } from "@/api/hooks/useGetImages";
// Data
import { IProduct, REVIEWS } from "@/api/data";
import { ProductSize } from "./product-size";
import { ProductColor } from "./product-color";

interface ProductDetailProps {
  related: IProduct[];
  data: IProduct | undefined;
}

export function ProductDetail({ data, related }: ProductDetailProps): React.ReactElement {
  const { data: images } = useGetImages({ query: "fashion", perPage: 5 });
  const { data: profiles } = useGetImages({ query: "profile", perPage: REVIEWS.length });

  const productsRelated = useMemo(
    () =>
      related
        .map((product) => ({
          ...product,
          image: images?.results[product.id - 1]?.urls.small
        }))
        .slice(1, 5),
    [related, images?.results]
  );

  const reviewAnalysis = useMemo(() => {
    const distribution = REVIEWS.reduce(
      (acc, { reviewRate }) => {
        acc[reviewRate] = (acc[reviewRate] || 0) + 1;
        return acc;
      },
      { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    );

    return Object.entries(distribution)
      .map(([rate, count]) => ({
        rate: Number(rate),
        percentage: Math.round((count / REVIEWS.length) * 100)
      }))
      .reverse();
  }, []);

  return (
    <Box>
      <Container screen="xl" alignment="center" padding={{ block: "7xl", inline: "lg" }}>
        <Box as="section" space={{ y: "8xl" }}>
          <Grid gap="2xl" cols={1} responsive={{ md: { cols: 2 } }}>
            <AspectRatio ratio="1:1" radius="md">
              {images?.results[0]?.urls.raw && (
                <Image
                  src={images?.results[0]?.urls.raw}
                  alt={data?.name}
                  width={400}
                  height={800}
                />
              )}
            </AspectRatio>

            <Stack direction="column">
              <Text as="h3" space={{ y: "md" }}>
                {data?.name}
              </Text>

              <Text size="sm" skin="neutral" space={{ y: "2xl" }}>
                {data?.category} / {data?.tag}
              </Text>

              <Stack direction="column" gap="2xl">
                <Stack gap="sm" grow>
                  {data?.discount && (
                    <Text size="3xl" weight="light" variation="line-through" skin="neutral-faded">
                      {(data.price.value * data?.discount) / 100}
                      {data.price.currency}
                    </Text>
                  )}

                  <Text size="3xl" weight="semi-bold">
                    {data?.price.value}
                    {data?.price.currency}
                  </Text>

                  {data?.discount && <Tag size="xs">{data.discount}% of discount</Tag>}
                </Stack>

                {data?.rate && (
                  <Stack items="center" gap="sm">
                    <Stack direction="row">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Text
                          key={index}
                          as="div"
                          skin={index + 1 <= Math.floor(data?.rate) ? "warning" : "neutral-faded"}
                        >
                          <HiStar size={24} />
                        </Text>
                      ))}
                    </Stack>

                    <Text as="a" href="/" skin="neutral" size="xs">
                      ({data?.reviews} reviews)
                    </Text>
                  </Stack>
                )}

                <Text as="div" size="sm" whiteSpace="pre-wrap">
                  {data?.description}
                </Text>

                <Box space={{ y: "lg" }}>
                  <Stack direction="column" gap="xl">
                    <ProductQuantity max={data?.stock || 0} />
                    <ProductSize values={data?.sizes || []} />
                    <ProductColor values={data?.color || []} />
                  </Stack>
                </Box>

                <Stack direction="row" gap="md">
                  <Button skin="neutral" appearance="outline" size="lg" fullWidth>
                    Add to cart
                  </Button>
                  <Button skin="primary" size="lg" fullWidth>
                    Checkout now
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Box>

        {productsRelated.length > 0 && (
          <Box as="section">
            <Text size="lg" weight="semi-bold" space={{ y: "xs" }}>
              You May Also Like
            </Text>
            <Text size="sm" skin="neutral" space={{ y: "2xl" }}>
              {"Browse similar products to the ones you're viewing"}
            </Text>

            <ProductsGrid data={productsRelated} />
          </Box>
        )}

        <Box as="section">
          <Grid cols={1} responsive={{ md: { cols: 5 } }} gap="9xl">
            <Grid.Item responsive={{ md: { colSpan: 2 } }}>
              <Stack direction="column">
                <Text as="h4" space={{ y: "md" }}>
                  Customer Reviews
                </Text>

                <Box space={{ y: "xl" }}>
                  {data?.rate && (
                    <Stack items="center" gap="sm">
                      <Stack direction="row">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Text
                            key={index}
                            as="div"
                            skin={index + 1 <= Math.floor(data?.rate) ? "warning" : "neutral-faded"}
                          >
                            <HiStar size={20} />
                          </Text>
                        ))}
                      </Stack>

                      <Text skin="neutral" size="xs">
                        based on {data?.reviews} reviews
                      </Text>
                    </Stack>
                  )}
                </Box>

                <Box space={{ y: "4xl" }}>
                  <Stack direction="column" gap="md">
                    {reviewAnalysis.map(({ rate, percentage }) => (
                      <Stack key={rate} gap="sm" items="baseline">
                        <Stack gap="xs" direction="column" grow>
                          <Stack justify="between">
                            <Text size="xs" weight="semi-bold">
                              {rate} <HiStar size={10} />
                            </Text>
                            <Text size="xs" skin="neutral-faded">
                              {percentage}%
                            </Text>
                          </Stack>
                          <Progress value={percentage} />
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                </Box>

                <Box>
                  <Text size="lg" weight="semi-bold" space={{ y: "xs" }}>
                    Drop your thoughts
                  </Text>
                  <Text size="sm" skin="neutral" space={{ y: "2xl" }}>
                    Got something to say about this? Share your take with everyone.
                  </Text>

                  <Button size="lg" fullWidth>
                    Write a review
                  </Button>
                </Box>
              </Stack>
            </Grid.Item>

            <Grid.Item responsive={{ md: { colSpan: 3 } }}>
              {REVIEWS.slice(0, 5).map(({ name, reviewRate, review }, idx) => (
                <Box key={idx}>
                  <Stack key={idx} direction="column" gap="lg">
                    <Stack gap="md" items="center">
                      <Avatar name={name} image={{ src: profiles?.results[idx]?.urls.thumb }} />
                      <Stack direction="column" gap="xs">
                        <Text size="xs" weight="medium">
                          {name}
                        </Text>
                        <Stack>
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Text
                              key={index}
                              as="div"
                              skin={
                                index + 1 <= Math.floor(reviewRate) ? "warning" : "neutral-faded"
                              }
                            >
                              <HiStar size={16} />
                            </Text>
                          ))}
                        </Stack>
                      </Stack>
                    </Stack>
                    <Text variation={"italic"} size="sm" skin="neutral">
                      {review}
                    </Text>
                  </Stack>
                  <Separator space={{ block: "2xl" }} />
                </Box>
              ))}
            </Grid.Item>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
