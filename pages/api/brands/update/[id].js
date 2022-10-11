import prisma from "../../../../lib/prisma";
export default async function handler(req, res) {
  const { method } = req;
  const { name } = req.body;
  const { id } = req.query;
  switch (method) {
    case "PATCH":
      try {
        const brands = await prisma.brands.update({
          where: {
            id: Number(id),
          },
          data: {
            name: name,
          },
        });
        res.status(200);
        res.json({
          data: brands,
          message: `Brands ${brands.name} successfully updated!`,
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
