import prisma from "../../../../lib/prisma";
export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  switch (method) {
    case "DELETE":
      try {
        const brands = await prisma.brands.delete({
          where: {
            id: Number(id),
          },
        });
        res.status(200);
        res.json({
          message: `Brands successfully deleted!`,
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
