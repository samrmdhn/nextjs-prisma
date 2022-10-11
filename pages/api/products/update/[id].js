import prisma from "../../../../lib/prisma";
export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  const { name, price } = req.body;
  switch (method) {
    case "PUT":
      try {
        const product = await prisma.product.update({
          where: {
            id: Number(id),
          },
          data: {
            name,
            price,
          },
        });

        res.status(200);

        res.json({
          data: product,
          message: `Product ${product.id} successfully edited`,
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
