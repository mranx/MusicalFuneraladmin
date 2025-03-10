import prisma from "@/lib/database";

export const getServices = async () => {
  return await prisma.service.findMany();
};

export const addService = async (
  iconType: string,
  title: string,
  description: string
) => {
  return await prisma.service.create({
    data: { iconType, title, description },
  });
};

export const deleteService = async (id: string) => {
  return await prisma.service.delete({
    where: { id },
  });
};
