import { fakeComputers } from "@/app/services/fakeData"
import {prisma} from '../../../../lib/prisma'
import { Computer } from "@prisma/client"

interface IPageProps {
  params: {id: string}
}

export const revalidate = 30

export async function generateStaticParams() {
  const ourComputers: Computer[] = await prisma.computer.findMany({
    take: 5
  })

  return ourComputers.map(computer => ({id: computer.id + ""}))
}

export default async function ComputerPage({params}: IPageProps) {
  const {id} = params
  const idNumber = Number(id as string)

  const computer: Computer = await prisma.computer.findUniqueOrThrow({
    where: {
      id: idNumber
    }
  })

  return (
    <div>
      <h1>Machine nº{computer?.id}</h1>
      <p>
        <span><strong>CPU</strong> {computer?.cpu}</span> 
      </p>
      <p>
        <span><strong>GPU</strong> {computer?.gpu}</span>
      </p>
      <p>
        <span><strong>Storage</strong> {computer?.storage}</span>
      </p>
      <p>
        <span><strong>RAM</strong> {computer?.ram}</span>
      </p>
      <p>
        <span><strong>Price</strong> R${computer?.price}</span>
      </p>
    </div>
  )
}