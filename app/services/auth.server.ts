import { Account } from "@prisma/client";
import { redirect, TypedResponse } from "@remix-run/node";
import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { OAuth2Strategy } from "remix-auth-oauth2";
import invariant from "tiny-invariant";
import { findOrCreate, getAccountByEmail } from "~/models/account.server";
import { sessionStorage } from "~/services/session.server";
import { GoogleStrategy } from "remix-auth-google";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<Account>(
  sessionStorage,
);

authenticator.use(
  new FormStrategy(async ({ form, context }) => {
    // Here you can use `form` to access and input values from the form.
    // and also use `context` to access more things from the server
    let email = form.get("email");
    let password = form.get("password");

    // You can validate the inputs however you want
    invariant(typeof email === "string", "username must be a string");
    invariant(email.length > 0, "username must not be empty");

    invariant(typeof password === "string", "password must be a string");
    invariant(password.length > 0, "password must not be empty");

    // And if you have a password you should hash it
    //   let hashedPassword = await hash(password);
    let hashedPassword = password;

    // And finally, you can find, or create, the user
    //   let user = await findOrCreateUser(username, hashedPassword);
    console.log("user", email, hashedPassword);

    // let user = await getAccountByEmail(email);

    if (email === "test@gmail.com" && password === "123456") {
        console.log("correct credentials");
        return {} as Account;
    }
    else {
        console.log("incorrect credentials");
        throw new AuthorizationError("Bad Credentials")
    }
  }),
  "user-pass"
);

authenticator.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      callbackURL: `${process.env.HOME_URL}/auth/google/callback`,
    },
    async ({ accessToken, refreshToken, extraParams, profile }) => {
      return findOrCreate(profile);
    }
  ),
  "google-oauth"
);
