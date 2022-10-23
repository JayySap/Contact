import { ActionFunction, AppData, LoaderFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { IoLogoGoogle } from "react-icons/io5";
import { json, useLoaderData } from "superjson-remix";
import { authenticator } from "~/services/auth.server";
import { getSession } from "~/services/session.server";

export default function Screen() {
  const loaderData:AppData = useLoaderData();
  const error = loaderData.error;
  
  return (
    <div className="min-h-screen bg-indigo-100 flex items-center">
        <div className="mx-auto mb-36 w-1/2">
        <h1 className="text-4xl text-indigo-800 font-bold text-center pb-3">Login</h1>
        <Form action="/auth/google" method="post">
            <button className="text-white rounded-md px-1 py-3 my-3 text-lg bg-red-400 w-full">
                <IoLogoGoogle size={25} className="inline mx-4" />
                Login with Google
            </button>
        </Form>

        <div className="text-indigo-400 w-full text-center my-4">or</div>

        <Form method="post" className="flex flex-col justify-center space-y-3">
        <input 
            type="email" 
            name="email" 
            placeholder="Email"
            autoComplete="email"
            required 
            className="p-4 rounded-md"/>
        <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
            placeholder="Password"
            className="p-4 rounded-md"
            />
        <button className="bg-indigo-800 text-white rounded-md px-1 py-3 text-lg">Sign In</button>
        <div className="font-bold my-2 text-rose-500">{error ? error.message : ''}</div>
        </Form>
        </div>
    </div>
  );
}

export let action: ActionFunction = async ({ request }) => {
  // we call the method with the name of the strategy we want to use and the
  // request object, optionally we pass an object with the URLs we want the user
  // to be redirected to after a success or a failure
  const response =  await authenticator.authenticate("user-pass", request, {
    successRedirect: "/app",
    failureRedirect: "/login",
  });

  return response;
};

// Finally, we can export a loader function where we check if the user is
// authenticated with `authenticator.isAuthenticated` and redirect to the
// dashboard if it is or return null if it's not
export let loader: LoaderFunction = async ({ request }) => {

  await authenticator.isAuthenticated(request, {
    successRedirect: "/app",
  });

  let session = await getSession(request.headers.get("cookie"));
  let error = session.get(authenticator.sessionErrorKey);
  return json({ error });
  
};