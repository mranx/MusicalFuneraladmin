import prisma from "@/lib/database";

export const getDemoVideos = async () => {
  try {
    return await prisma.demoVideo.findMany();
  } catch (error) {
    console.error("Prisma GET error:", error);
    throw new Error("Database fetch failed");
  }
};

export const addDemoVideo = async (title: string, duration: string, src: string) => {
  try {
    return await prisma.demoVideo.create({
      data: { title, duration, src },
    });
  } catch (error) {
    console.error("Prisma CREATE error:", error);
    throw new Error("Database insert failed");
  }
};

export const deleteDemoVideo = async (id: string) => {
  try {
    return await prisma.demoVideo.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Prisma DELETE error:", error);
    throw new Error("Database delete failed");
  }
};
