import { fakeBrands } from "@/app/services/fakeData";

interface IPageProps {
  params: {id: string}
}

export const revalidate = 30;

export async function generateStaticParams() {
  const ourBrands = await fakeBrands

  return ourBrands.map(brand => ({id: brand.id + ""}))
}

export default async function BrandPage({params} : IPageProps) {
  const brand = await fakeBrands.find((brand) => brand.id == Number(params.id))

  return (
    <h1>{brand?.name}</h1>
  )
}