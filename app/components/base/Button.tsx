const Button = (action:() => void, content:string) => {
  return (
        <button onClick={action} 
        className="my-12 py-2 px-4 rounded-md bg-indigo-600 flex flex-row justify-between items-center w-full"><span>{content}</span></button>
  )
}

export default Button