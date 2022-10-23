import { IoCalendar, IoList, IoLogOut, IoSearch } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { Menu, Transition } from "@headlessui/react";
import { Form, Link } from "@remix-run/react";
import { Fragment } from "react";

const Sidebar = () => {
  return (
    <div className="bg-indigo-600 text-white h-screen flex flex-col justify-between w-full items-center">
        <div className="py-16">
            <IoSearch size={30} className="block" />

            <div className="pt-16 space-y-10">
                <Link to="/app/groups">
                    <IoList size={30}/>
                </Link>
                <div>
                    <IoCalendar size={30}/>
                </div>
            </div>
        </div>

        <div className="py-6">
          <Menu as="div" className="relative">
            <Menu.Button><IoMdSettings size={30} className="block" /></Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute -top-6 transform -translate-y-full my-2 origin-top-righ rounded-md bg-indigo-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-clip w-max">
                <div className="hover:bg-indigo-600">
                  <Menu.Item>
                    <Form method="post" action="/app?index">
                      <button className="px-1 py-3 w-full text-left">
                        <IoLogOut size={25} className="inline mx-4" />
                        <span className="font-semibold pr-4">Sign Out</span>
                      </button>
                    </Form>
                  </Menu.Item>
                </div>
                <div className="px-1 py-3 hover:bg-indigo-600">
                  <Menu.Item>
                    <Link to="/app/settings">
                      <div>
                        <IoMdSettings size={25} className="inline mx-4" />
                        <span className="font-semibold pr-4">Account Settings</span>
                      </div>
                    </Link>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
    </div>
  );
};

export default Sidebar;
