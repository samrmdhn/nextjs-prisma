import prisma from "../../../../lib/prisma";
export default async function handler(req, res) {
  const { method } = req;
  const { name } = req.body;

  switch (method) {
    case "POST":
      try {
        const brands = await prisma.brands.create({
          data: {
            name: name,
          },
        });
        res.status(201);
        res.json({
          data: brands,
          message: `Brands ${brands.name} successfully created!`,
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
