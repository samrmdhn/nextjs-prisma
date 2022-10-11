import prisma from "../../../lib/prisma";
export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const brands = await prisma.brands.findMany();
        res.status(200);
        res.json({
          data: brands,
          message: `Brands successfully loaded!`,
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
