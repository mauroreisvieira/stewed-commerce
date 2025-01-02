import React from "react";
// UI Components
import { Text, Drawer, Stack, Button, Separator, Tag } from "@stewed/react";
import { ProductQuantity } from "./product-quantity";
import { ProductColor } from "./product-color";
import { ProductSize } from "./product-size";
// Icons
import { HiStar } from "react-icons/hi";
import { IProduct } from "@/api/data";
// Data

interface IProductQuickViewProps {
  product: IProduct | undefined;
  open: boolean;
  onClose: () => void;
}

export function ProductQuickView({
  open = false,
  onClose,
  product
}: IProductQuickViewProps): React.ReactElement {
  return (
    <Drawer
      placement="right"
      open={open}
      onClose={onClose}
      onEscape={onClose}
      onClickOutside={onClose}
    >
      <Drawer.Header>
        <Text as="h3" space={{ y: "md" }}>
          {product?.name}
        </Text>

        <Text size="sm" skin="neutral">
          {product?.category} / {product?.tag}
        </Text>
      </Drawer.Header>

      <Drawer.Body>
        <Stack direction="column" gap="2xl">
          <Stack gap="sm" grow>
            {product?.discount && (
              <Text size="3xl" weight="light" variation="line-through" skin="neutral-faded">
                {(product.price.value * product?.discount) / 100}
                {product.price.currency}
              </Text>
            )}

            <Text size="3xl" weight="semi-bold">
              {product?.price.value}
              {product?.price.currency}
            </Text>

            {product?.discount && <Tag size="xs">{product.discount}% of discount</Tag>}
          </Stack>

          {product?.rate && (
            <Stack items="center" gap="sm">
              <Stack direction="row">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Text
                    key={index}
                    as="div"
                    skin={index + 1 <= Math.floor(product?.rate) ? "warning" : "neutral-faded"}
                  >
                    <HiStar size={24} />
                  </Text>
                ))}
              </Stack>

              <Text as="a" href="/" skin="neutral" size="xs">
                ({product?.reviews} reviews)
              </Text>
            </Stack>
          )}

          <Text as="div" size="sm" whiteSpace="pre-wrap">
            {product?.description}
          </Text>

          <ProductQuantity max={product?.stock || 0} />
          <ProductSize values={product?.sizes || []} />
          <ProductColor values={product?.color || []} />
        </Stack>
      </Drawer.Body>
      <Separator />
      <Drawer.Footer>
        <Stack direction="row" gap="md">
          <Button skin="primary" fullWidth>
            Checkout now
          </Button>
          <Button skin="neutral" appearance="outline" fullWidth>
            Add to cart
          </Button>
        </Stack>
      </Drawer.Footer>
    </Drawer>
  );
}
