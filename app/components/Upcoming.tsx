const Upcoming = () => {
  return (
    <div className="py-12 w-96 text-indigo-800">
        <h2 className="text-2xl font-semibold pb-3">Upcoming Soon</h2>
        <div>
            <div>
                <div className="flex flex-row justify-between pb-2 mx-4">
                    <span className="font-bold text-md">Jane Cooper</span>
                    <span>2 days ago</span>
                </div>
                    <hr className="pb-4"/>
            </div>

            <div>
                <div className="flex flex-row justify-between pb-2 mx-4">
                    <span className="font-bold text-md">Jane Cooper</span>
                    <span>4 days</span>
                </div>
                    <hr className="pb-4"/>
            </div>

        </div>
    </div>
    
  )
}

export default Upcoming