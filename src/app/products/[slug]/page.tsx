import { ProductDetail } from "@/components/product-detail";
import { PRODUCTS } from "@/api/data";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const product = PRODUCTS.find((product) => product.slug === slug);

  return (
    <ProductDetail
      data={product}
      related={PRODUCTS.filter(
        ({ category, id }) => category === product?.category && id !== product.id
      )}
    />
  );
}
