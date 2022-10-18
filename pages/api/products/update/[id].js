import prisma from "../../../../lib/prisma";
export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  const { name, price, brandId, categoriesId1, categoriesId2 } = req.body;
  switch (method) {
    case "PATCH":
      try {
        const searchProduct = await prisma.product.findUnique({
          where: {
            id: Number(id),
          },
          include: {
            categories: {
              select: {
                id: true,
                name: true,
              },
            },
            brands: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });

        console.log(searchProduct);

        const product = await prisma.product.update({
          where: {
            id: Number(id),
          },
          data: {
            name: name,
            price: price,
            categories: {
              disconnect: [
                { id: Number(searchProduct.categories[0].id) },
                { id: Number(searchProduct.categories[1].id) },
              ],
              connect: [
                { id: Number(categoriesId1) },
                { id: Number(categoriesId2) },
              ],
            },
            brands: {
              connect: {
                id: Number(brandId),
              },
            },
          },
        });

        /*
          data: {
            name: name,
            price: price,
            categories: {
              deleteMany: {},
              create: [
                {
                  connect: {
                    id: Number(categoriesId1),
                  },
                },
                {
                  connect: {
                    id: Number(categoriesId2),
                  },
                },
              ],
            },
            brands: {
              connect: {
                id: Number(brandId),
              },
            },
          },
        });
        */

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

        res.status(200);

        res.json({
          data: findProduct,
          message: `Product ${findProduct.id} successfully edited`,
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
