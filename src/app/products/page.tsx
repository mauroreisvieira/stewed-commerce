import { Products } from "@/components/products";
// Data
import { PRODUCTS } from "@/api/data";

export default function Page() {
  return <Products data={PRODUCTS} />;
}
