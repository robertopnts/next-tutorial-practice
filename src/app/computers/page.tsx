import { Computer } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export default async function Computers() {
    const computers = await getComputers()

    return (
        <div>
            <h1>Computers</h1>
            <br />
            <ul>
                {
                    computers.map(computer => (
                        <li key={computer.id}>{computer.cpu} - {computer.gpu}</li>
                    ))
                }
            </ul>
        </div>
    )
}

async function getComputers(): Promise<Computer[]> {
    const ourComputers = await prisma.computer.findMany()

    return ourComputers
}