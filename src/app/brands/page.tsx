import {prisma} from "../../../lib/prisma"
import { Brand } from "@prisma/client"


export default async function Brands() {
  const brands = await getBrands()

  return (
    <div>
      <h1>Brands Available</h1>
      <br />
      <ul>
        {
          brands.map((brand) => (
            <li key={brand.id}>{brand.name}</li>
          ))
        }
      </ul>
    </div>
  )
}

async function getBrands(): Promise<Brand[]> {
  const ourBrands = await prisma.brand.findMany()

  return ourBrands
}