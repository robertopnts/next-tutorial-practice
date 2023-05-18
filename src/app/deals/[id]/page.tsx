import { GetServerSideProps } from "next";
import { prisma } from "../../../../lib/prisma";
import { Brand, Computer } from "@prisma/client";

interface IPageProps {
    params: {id: string}
}


export default async function Deals ({params}: IPageProps) {
    const computer: Computer & {brand: Brand} = await getComputerDeal({params})

    return (
        <div>
        <h1>Machine nº{computer.id}</h1>
        <p>
          <span><strong>CPU</strong>: {computer.cpu}</span> 
        </p>
        <p>
          <span><strong>GPU</strong>: {computer.gpu}</span>
        </p>
        <p>
          <span><strong>Storage</strong>: {computer.storage}</span>
        </p>
        <p>
          <span><strong>RAM</strong>: {computer.ram}</span>
        </p>
        <p>
          <span><strong>Brand</strong>: {computer.brand.name}</span>
        </p>
        <p>
          <span><strong>Price</strong>: R${computer.price.toFixed(2)}</span>
        </p>
      </div>
    )
}

async function getComputerDeal({params}: IPageProps) {
    const {id} = params
    const idNumber = Number(id as string)

    const selectedComputer = await prisma.computer.findUnique({
        where: {
            id: idNumber
        },
        include: {
            brand: true
        }
    })

    if (selectedComputer) {
        selectedComputer.price = selectedComputer.price - selectedComputer.price * Math.random() * 0.15
    }

    return selectedComputer!
}