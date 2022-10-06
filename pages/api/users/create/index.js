import prisma from "../../../../lib/prisma";
export default async function handler(req, res) {
  const { method } = req;
  const { name, sex, address, phone } = req.body;
  switch (method) {
    case "POST":
      try {
        const users = await prisma.users.create({
          data: {
            name: name,
            sex: sex,
            phone: phone,
            address: address,
          },
        });

        res.status(201);
        res.json({
          data: users,
          message: `User ${name} has been created successfully`,
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
