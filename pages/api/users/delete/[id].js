import prisma from "../../../../lib/prisma";
export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  switch (method) {
    case "DELETE":
      try {
        const user = await prisma.users.delete({
          where: {
            id: Number(id),
          },
        });
        res.status(200);
        res.json({
          message: "User has been deleted successfully!",
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
