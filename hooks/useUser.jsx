import { useCookies } from "next-client-cookies";

export function useUser() {
  const cookies = useCookies();
  return { id: cookies.get("userId") };
}
