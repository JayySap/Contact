import { Disclosure, Transition } from "@headlessui/react";
import { ColorInput, ColorSwatch, Input, NumberInput, useMantineTheme } from "@mantine/core";
import { Contact, ContactGroup } from "@prisma/client";
import { ActionFunction } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { useState } from "react";
import { BsClock, BsPlusLg } from "react-icons/bs";
import { IoPeopleOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { authenticator } from "~/services/auth.server";
import { ContactGroupStore, ContactStore } from "~/stores/stateStore";
import Modal from "./base/Modal";

export const action: ActionFunction = async ({ request }) => {
  console.log("attemping logout");
  await authenticator.logout(request, { redirectTo: "/login" });
};

export default function GroupSidebar({ favorites, groups } : { favorites:Contact[], groups:ContactGroup[] }) {
  const toggleContactModal = ContactStore((state) => state.toggle)

  let [isGroupOpen, setGroupIsOpen] = useState(false)

  function toggleGroupModal() {
    setGroupIsOpen(!isGroupOpen)
  }

  const NewGroupModal = ({ toggleGroupModal } : { toggleGroupModal:VoidFunction }) => (
    <>
      <Form method="post">
        <input readOnly hidden name="action" value="addGroup"></input>
        <div className="grid w-3/4 gap-2 grid-cols-[1fr_3fr]"> 
          <label htmlFor='frequency' className='text-right text-gray-400 my-auto'>Group Name</label>
          <Input
              icon={<IoPeopleOutline />}
              name="groupName"
              radius="md"
          />

          <label htmlFor='frequency' className='text-right text-gray-400 my-auto'>Frequency</label>
          <NumberInput
              icon={<BsClock />}
              name="contactFrequency"
              radius="md"
              rightSection={<p className="text-gray-400 mr-12 font-light">Days</p>}
          />

          {/* <div className="flex outline-gray-400 border my-2 rounded-lg">
            <input className="block rounded-lg placeholder-gray-400 p-2 "type="text" name='contactFrequency' placeholder="Contact Frequency"/>
            <select className="block rounded-lg placeholder-gray-400 p-2 ml-auto" placeholder="Group" name="groupId">
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
          </div> */}
          
          <label className='text-right text-gray-400 my-auto'>Group Color</label>
          <ColorInput
            name="color"
            disallowInput
            withPicker={false}
            radius="md"
            swatches={['#25262b', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
            />
        </div>

        <div className="flex space-x-4">
        </div>
        <div className="mt-6">
            <button type="submit" className="py-2 px-4 mr-2 rounded-lg bg-indigo-900 border-2 border-indigo-900 text-white">Save</button>
            <button type="button" className="py-2 px-4 rounded-lg border-2 border-indigo-400 text-indigo-400" onClick={toggleGroupModal}>Cancel</button> 
        </div>
      </Form>
    </>
  );

  return (
    <div className="bg-indigo-800 text-white h-screen flex flex-col justify-between px-6 w-72">
      <div className="">
        <button
          onClick={toggleContactModal}
          className="my-12 py-2 px-4 rounded-md bg-indigo-600 flex flex-row justify-between items-center w-full"
          >
          <span>New Contact</span>
          <BsPlusLg />
        </button>

        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button>
                <h3 className="text-2xl font-bold mb-4">
                  <MdKeyboardArrowDown
                    className={`inline mr-3 transform rotate-180 transition-transform ${
                      open ? "transform rotate-0" : ""
                    }`}
                  />
                  Favourites
                </h3>
              </Disclosure.Button>
              <Transition
                enter="transition-all duration-150"
                enterFrom="opacity-0 max-h-0"
                enterTo="opacity-100 max-h-full"
                leaveFrom="opacity-100 max-h-full"
                leaveTo="opacity-0 max-h-0"
                leave="transition-all duration-150"
              >
                <Disclosure.Panel className="space-y-4 pl-7">
                  {favorites.map((favorite) => (
                    <Link
                      to={`/app/groups/${favorite.contactGroupId}/${favorite.id}`}
                      key={favorite.id}
                    >
                      <div className="flex flex-row items-center cursor-pointer mb-3">
                        <div className="h-6 w-6 rounded-full bg-white inline-block mr-4" />{" "}
                        {favorite.firstName} {favorite.lastName}
                      </div>
                    </Link>
                  ))}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
        <div className="h-12"></div>

        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button>
                <h3 className="text-2xl font-bold mb-4">
                  <MdKeyboardArrowDown
                    className={`inline mr-3 transform rotate-180 transition-transform ${
                      open ? "transform rotate-0" : ""
                    }`}
                  />
                  Categories
                </h3>
              </Disclosure.Button>
              <Transition
                enter="transition-all duration-150"
                enterFrom="opacity-0 max-h-0"
                enterTo="opacity-100 max-h-full"
                leaveFrom="opacity-100 max-h-full"
                leaveTo="opacity-0 max-h-0"
                leave="transition-all duration-150"
              >
                <Disclosure.Panel className="space-y-2 pl-7">
                  <Link to="./">
                    <div className="flex flex-row items-center cursor-pointer">
                      <div className="h-3 w-3 rounded-full bg-yellow-500 inline-block mr-4" />{" "}
                      All
                    </div>
                  </Link>
                  {groups.map((group) => (
                    <Link key={group.id} to={`/app/groups/${group.id}`}>
                      <div className="flex flex-row items-center cursor-pointer">
                        <div
                          className={"h-3 w-3 rounded-full inline-block mr-4"}
                          style={{ backgroundColor: `#${group.color}` }}
                        />{" "}
                        {group.groupName}
                      </div>
                    </Link>
                  ))}
                  <button className="font-semibold text-indigo-200 pt-6" onClick={toggleGroupModal}>
                    <BsPlusLg className="inline mr-3 mb-0.5" /> New Category
                  </button>
                  <Modal modalTitle={"Create Contact Group"} modalBody={<NewGroupModal toggleGroupModal={toggleGroupModal}/>} isOpen={isGroupOpen} action={toggleGroupModal}/>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}