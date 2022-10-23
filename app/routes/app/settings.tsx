import { LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export let loader: LoaderFunction = async ({ request }) => {

  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
  });
};

export default function Settings() {
  return (
    <div>
        <h1>Settings Page</h1>
    </div>
  );
}