import prisma from "@/prisma/client";

// function to return headers to set a userId cookie (spoof a logged in user)
export default async function setCookies(req) {
  const user = await prisma.user.findFirst({
    where: {
      name: "Demo User",
    },
  });
  const userId = user?.id;

  if (req.cookies.get("userId")?.value !== userId) {
    req.cookies.set("userId", userId);
    return {
      headers: { "Set-Cookie": `userId=${userId};SameSite=Strict;Path=/` },
    };
  }
  return {};
}
