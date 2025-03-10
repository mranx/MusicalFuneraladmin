import prisma from "@/lib/database";

export const getPricingPlans = async () => {
  const plans = await prisma.pricingPlan.findMany();
  return plans.map((plan) => ({
    ...plan,
    features: JSON.parse(plan.features), // Convert JSON string back to an array
  }));
};

export const addPricingPlan = async (title: string, price: number, features: string[]) => {
  return await prisma.pricingPlan.create({
    data: { title, price, features: JSON.stringify(features) }, // Store as JSON string
  });
};

export const deletePricingPlan = async (id: string) => {
  return await prisma.pricingPlan.delete({
    where: { id },
  });
};
