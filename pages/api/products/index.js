import prisma from "../../../lib/prisma";
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const product = await prisma.product.findMany({
          include: {
            brands: {
              select: {
                id: true,
                name: true,
              },
            },
            categories: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });
        res.status(200);
        res.json({
          data: product,
          message: "Success read all product",
        });
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      res.status(405).end();
      break;
  }
}
