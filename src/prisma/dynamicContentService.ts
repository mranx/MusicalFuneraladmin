import prisma from "@/lib/database";

// Fetch all dynamic content
export const getAllDynamicContent = async () => {
  return await prisma.dynamicContent.findMany();
};

// Create new dynamic content
export const createDynamicContent = async (heading:string, paragraph:string) => {
  return await prisma.dynamicContent.create({
    data: { heading, paragraph },
  });
};

// Delete dynamic content by ID
export const deleteDynamicContent = async (id: string) => {
  return await prisma.dynamicContent.delete({
    where: { id },
  });
};
