import prisma from "../../../../lib/prisma";
export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  const { name } = req.body;
  switch (method) {
    case "PATCH":
      try {
        const categories = await prisma.categories.update({
          where: {
            id: Number(id),
          },
          data: {
            name: name,
          },
        });
        res.status(200);
        res.json({
          data: categories,
          message: `Categories ${categories.name} successfully updated!`,
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
