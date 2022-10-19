import prisma from "../../../lib/prisma";
export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "PATCH":
      try {
        const product = await prisma.product.update({
          where: {
            id: Number(id),
          },
          data: {
            brands: {
              create: {
                id: 70,
                name: "PERKS",
              },
            },
          },
        });

        const findProduct = await prisma.product.findUnique({
          where: {
            id: Number(product.id),
          },
          select: {
            categories: true,
            brands: true,
          },
        });

        res.status(201);
        res.json({
          data: findProduct,
          message: "New Categories added",
        });
      } catch (error) {
        console.log(error);
        res.status(400).end();
      }
      break;

    default:
      res.status(405).end();
      break;
  }
}
