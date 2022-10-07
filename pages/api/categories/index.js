import prisma from "../../../lib/prisma";
export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const categories = await prisma.categories.findMany();
        res.status(200);
        res.json({
          data: categories,
          message: `Categories has been loaded!`,
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
