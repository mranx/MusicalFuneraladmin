import prisma from "@/lib/database";

// ✅ Fetch Navbar Settings
export async function getNavbarSettings() {
  const settings = await prisma.navbarSettings.findFirst();
  return settings || { lightLogo: "", darkLogo: "" };
}

// ✅ Update Navbar Settings
export async function updateNavbarSettings(lightLogo: string, darkLogo: string) {
  let existingSettings = await prisma.navbarSettings.findFirst();

  if (existingSettings) {
    return await prisma.navbarSettings.update({
      where: { id: existingSettings.id },
      data: { lightLogo, darkLogo },
    });
  } else {
    return await prisma.navbarSettings.create({
      data: { lightLogo, darkLogo },
    });
  }
}
