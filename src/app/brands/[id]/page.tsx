import { fakeBrands } from "@/app/services/fakeData";
import { prisma } from "../../../../lib/prisma";

interface IPageProps {
  params: {id: string}
}

export const revalidate = 30;

export async function generateStaticParams() {
  const ourBrands = await fakeBrands

  return ourBrands.map(brand => ({id: brand.id + ""}))
}

export default async function BrandPage({params} : IPageProps) {
  const {id} = params
  const idNumber = Number(id as string)

  const brand = await prisma.brand.findUnique({
    where: {
      id: idNumber
    }
  })

  return (
    <h1>{brand?.name}</h1>
  )
}