import Form from "@/components/form";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default async function Page() {
  return (
    <main className="text-center pt-16 pb-5">
      <h1 className="text-4xl md:text-5xl font-bold mb-5">Create post</h1>

      <Form />

      <LogoutLink>Log out</LogoutLink>
    </main>
  );
}
