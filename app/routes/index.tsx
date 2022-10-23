import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "superjson-remix";
import { authenticator } from "~/services/auth.server";

export let loader: LoaderFunction = async ({ request }) => {
    return await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });
};

export const action: ActionFunction = async ({ request }) => {
    await authenticator.logout(request, { redirectTo: "/login" });
  };

export default function HomePage() {
    const data = useLoaderData();
    return (
      <div>
          <h1 className="text-3xl text-indigo-600 font-bold text-center p-12">Welcome to Contactly</h1>
      </div>
    );
  }