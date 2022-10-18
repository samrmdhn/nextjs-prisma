import prisma from "../../../../lib/prisma";
export default async function handler(req, res) {
  const { method } = req;

  const { name, price, brandId, categoriesId1, categoriesId2 } = req.body;

  switch (method) {
    case "POST":
      try {
        const product = await prisma.product.create({
          data: {
            name: name,
            price: price,
            brands: {
              connect: {
                id: Number(brandId),
              },
            },
            categories: {
              connect: [
                { id: Number(categoriesId1) },
                { id: Number(categoriesId2) },
              ],
            },
          },
        });

        const findProduct = await prisma.product.findUnique({
          where: {
            id: Number(product.id),
          },
          include: {
            categories: {
              select: {
                name: true,
              },
            },
            brands: {
              select: {
                name: true,
              },
            },
          },
        });

        console.log(findProduct);

        res.status(200);

        res.json({
          data: findProduct,
          message: "Success Created",
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
