import { Contact, ContactGroup } from "@prisma/client";
import { useState } from "react";
import { ContactStore } from "~/stores/stateStore";
import Modal from "./base/Modal";
import { NewContactModal } from "./ModalContent";

const InfoCard = ({contact, groups}: {contact:Contact, groups:ContactGroup[]}) => {
  // const toggleContactModal = ContactStore((state) => state.toggle)
  let [isContactOpen, setContactIsOpen] = useState(false)

  function toggleContactModal() {
    setContactIsOpen(!isContactOpen)
  }
  
  if(!contact) {
    return (
      <div>Oops, no contact found!</div>
    )
  }

  return (
    <div className="bg-indigo-100 h-3/5 py-24 px-12 ml-24 my-auto rounded-lg text-indigo-800">

    <h2 className="font-bold text-4xl">{contact.firstName} {contact.lastName}</h2>
    <h4>{contact.company}</h4>

    <div className="h-12"></div>

    <span className="bg-indigo-200 px-4 py-2 rounded-md">Last contacted 14 days ago</span>

    <div className="h-12"></div>


    <h3 className="font-semibold text-3xl">Quick Info</h3>
    <p>{contact.email}</p>

    <div className="h-6"></div>

    <h3 className="font-semibold text-3xl">Notes</h3>
    <p className="w-2/3 leading-tight">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
    
    <button className="px-4 py-2 border-2 border-indigo-800 rounded-lg text-indigo-800 font-bold my-4" onClick={toggleContactModal}>Edit</button>
    <Modal modalTitle={"Create Contact"} modalBody={<NewContactModal groups={groups} toggleContactModal={toggleContactModal} contact={contact}/>} isOpen={isContactOpen} action={toggleContactModal}/>
    </div>
  )
}

export default InfoCard