import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { json, useLoaderData } from "superjson-remix";
import Modal from "~/components/base/Modal";
import Sidebar from "~/components/base/Sidebar";
import { NewContactModal } from "~/components/ModalContent";
import { insertContact } from "~/models/contact.server";
import { getGroups } from "~/models/group.server";
import { authenticator } from "~/services/auth.server";
import { getSession } from "~/services/session.server";
import { ContactStore } from "~/stores/stateStore";
import { text2bool } from "~/utils/serde";

type LoaderData = {
  groups: Awaited<ReturnType<typeof getGroups>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return json<LoaderData>({
    groups: await getGroups(user.id),
  });
};

export const action: ActionFunction = async ({ request }) => {

  const formData = await request.formData();
  const session = await getSession(request.headers.get("Cookie"));

  const user = session.data.user;

  const action = formData.get("action");

  if (action === "addContact") {
    const contactGroupId = formData.get("groupId") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const company = formData.get("company") as string;
    const phone = formData.get("phone") as string;
    const isFavorite = text2bool(formData.get("isFavorite") as string);
    const instagramUsername = formData.get("instagramUsername") as string;

    console.log("isFavorite", isFavorite);

    const contact = {
      accountId: user.id,
      contactGroupId,
      firstName,
      lastName,
      email,
      company,
      phone,
      active: true,
      isFavorite,
    };

    await insertContact(contact);
  }

  return formData;
};

export default function Groups() {
  const { groups } = useLoaderData();
  const isContactOpen = ContactStore((state) => state.isVisible);
  const toggleContactModal = ContactStore((state) => state.toggle);

  const contact = {};

  return (
    <div className="text-indigo-900 grid grid-cols-[65px_1fr]">
      <Sidebar />
      <Outlet />
      <Modal
        modalTitle={"Create Contact"}
        modalBody={
          <NewContactModal
            groups={groups}
            toggleContactModal={toggleContactModal}
            contact={contact}
          />
        }
        isOpen={isContactOpen}
        action={toggleContactModal}
      />
    </div>
  );
}
