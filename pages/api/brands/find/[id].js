import prisma from "../../../../lib/prisma";
export default async function handler(req, res) {
  const { method } = req;

  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const brands = await prisma.brands.findUnique({
          where: {
            id: Number(id),
          },
        });

        const product = await prisma.product.findMany({
          where: {
            brandsId: brands.id,
          },
        });

        res.status(200);
        res.json({
          data: product,
          message: `Brands found successfully!`,
        });
      } catch (error) {
        res.status(400).end();
      }
      break;
    default:
      res.status(405).end();
      break;
  }
}
