import prisma from "../../../../lib/prisma";
export default async function handler(req, res) {
  const { method } = req;

  const { name, price, brId } = req.body;

  switch (method) {
    case "POST":
      try {
        const product = await prisma.product.create({
          data: {
            name: name,
            price: price,
            brands: {
              connect: {
                id: brId,
              },
            },
          },
        });
        res.status(200);
        res.json({
          data: product,
          message: "Success Created",
        });
      } catch (error) {
        console.log(error);
        res.status(400);
      }

      break;
    default:
      res.status(405).end();
      break;
  }
}
