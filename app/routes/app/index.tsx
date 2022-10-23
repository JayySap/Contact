import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { json, useLoaderData } from 'superjson-remix';
import GroupSidebar from "~/components/GroupSidebar";
import { getFavorites } from "~/models/contact.server";
import { getGroups } from "~/models/group.server";
import { authenticator } from "~/services/auth.server";

export const action: ActionFunction = async ({ request }) => {
  console.log("attemping logout");
  await authenticator.logout(request, { redirectTo: "/login" });
};


type LoaderData = {
     favorites: Awaited<ReturnType<typeof getFavorites>>;
     groups: Awaited<ReturnType<typeof getGroups>>
  };
  
  export const loader:LoaderFunction = async ({ request }) => {

    const user = await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
    });

    return json<LoaderData>({
      favorites: await getFavorites(user.id),
      groups: await getGroups(user.id),
    });
  };

export default function Groups() {

  const { favorites, groups } = useLoaderData();

  return (
    <div>
      <Outlet />
    </div>
  );
}