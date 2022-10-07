import prisma from "../../../lib/prisma";
export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const user = await prisma.users.findMany();
        res.status(200);
        res.json({
          data: user,
          message: `Users has been loaded successfully`,
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
