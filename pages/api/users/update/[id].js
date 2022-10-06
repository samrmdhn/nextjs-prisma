import prisma from "../../../../lib/prisma";
export default async function handler(req, res) {
  const { method } = req;

  const { id } = req.query;

  const { name, sex, phone, address } = req.body;

  switch (method) {
    case "PATCH":
      try {
        const user = await prisma.users.update({
          where: {
            id: Number(id),
          },
          data: {
            name,
            sex,
            phone,
            address,
          },
        });
        res.status(200);
        res.json({
          data: user,
          message: `User ${id} has been updated successfully!`,
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
