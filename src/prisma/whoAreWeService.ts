import prisma from "@/lib/database";

// Fetch "Who Are We" content
export const getWhoAreWeContent = async () => {
  return await prisma.whoAreWe.findFirst();
};

// Update "Who Are We" content
export const updateWhoAreWeContent = async (heading: string, paragraph1: string, paragraph2: string, imageUrl: string) => {
  const existingContent = await prisma.whoAreWe.findFirst();

  if (existingContent) {
    return await prisma.whoAreWe.update({
      where: { id: existingContent.id },
      data: { heading, paragraph1, paragraph2, imageUrl },
    });
  } else {
    return await prisma.whoAreWe.create({
      data: { heading, paragraph1, paragraph2, imageUrl },
    });
  }
};
