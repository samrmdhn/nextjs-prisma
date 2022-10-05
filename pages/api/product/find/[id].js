import prisma from "../../../../lib/prisma";export default async function handler(req, res) {
  const { id } = req.query;

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const product = await prisma.product.findUnique({
          where: {
            id: Number(id),
          },
        });

        res.status(200);

        res.json({
          data: product,
          message: `Success get data ${product.id}`,
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
