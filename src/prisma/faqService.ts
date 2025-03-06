import prisma from "@/lib/database";

// Get all FAQs
export const getFAQs = async () => {
  return await prisma.fAQ.findMany();
};

// Add a new FAQ
export const addFAQ = async (question: string, answer: string) => {
  return await prisma.fAQ.create({
    data: { question, answer },
  });
};

// Delete FAQ by ID
export const deleteFAQ = async (id: string) => {
  return await prisma.fAQ.delete({
    where: { id },
  });
};
