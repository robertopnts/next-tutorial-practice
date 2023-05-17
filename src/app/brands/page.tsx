import { fakeBrands } from "../services/fakeData"

interface IBrandsProps {
  brands: Array<string>
}

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

async function getBrands() {
  const ourBrands = fakeBrands

  return ourBrands
}