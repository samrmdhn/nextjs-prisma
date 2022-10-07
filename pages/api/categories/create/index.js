import prisma from "../../../../lib/prisma";
export default async function handler(req, res) {
  const { method } = req;

  const { name } = req.body;

  switch (method) {
    case "POST":
      try {
        const categories = await prisma.categories.create({
          data: {
            name: name,
          },
        });
        res.status(201);
        res.json({
          data: categories,
          message: `Category name ${categories.name} successfully created!`,
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
