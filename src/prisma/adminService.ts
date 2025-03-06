import prisma from "@/lib/database";
import bcrypt from "bcryptjs";

export const findAdminByEmail = async (email: string) => {
  return await prisma.admin.findUnique({
    where: { email },
  });
};

export const createAdmin = async (email: string, password: string, role: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.admin.create({
    data: { email, password: hashedPassword, role },
  });
};

export const getAllAdmins = async () => {
  return await prisma.admin.findMany({
    select: { id: true, email: true, role: true, createdAt: true },
  });
};

export const deleteAdminById = async (id: string) => {
  return await prisma.admin.delete({
    where: { id },
  });
};
