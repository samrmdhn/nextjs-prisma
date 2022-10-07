import prisma from "../../../../lib/prisma";
export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  switch (method) {
    case "GET":
      try {
        const categories = await prisma.categories.findUnique({
          where: {
            id: Number(id),
          },
        });
        res.status(200);
        res.json({
          data: categories,
          message: `Categories ${categories.id} successfully loaded!`,
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
