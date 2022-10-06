import prisma from "../../../../lib/prisma";
export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  switch (method) {
    case "GET":
      try {
        const user = await prisma.users.findUnique({
          where: {
            id: Number(id),
          },
        });
        res.status(200);
        res.json({
          data: user,
          message: `User ${user.id} ${user.name} found successfully!`,
        });
      } catch (error) {
        res.status(404).end();
      }

      break;
    default:
      res.status(405).end();
      break;
  }
}
