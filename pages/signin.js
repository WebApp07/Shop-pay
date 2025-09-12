import Header from "../components/header";
import Footer from "../components/footer";
import styles from "../styles/signin.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import LoginInput from "../components/inputs/loginInput";
import { useState } from "react";
import CircledIconBtn from "../components/buttons/circledIconBtn";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import axios from "axios";
import DotLoaderSpinner from "../components/loaders/dotLoader";
import Router from "next/router";

const initialValues = {
  login_email: "",
  login_password: "",
  name: "",
  email: "",
  password: "",
  confirm_password: "",
  success: "",
  error: "",
  login_error: "",
};

// Regex for full name: letters and spaces only
const fullNameRegex = /^[a-zA-Z\s]+$/;

export default function signin({
  country,
  currency,
  providers,
  csrfToken,
  callbackUrl,
}) {
  //console.log(providers);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialValues);
  const {
    login_email,
    login_password,
    name,
    email,
    password,
    confirm_password,
    success,
    error,
    login_error,
  } = user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  console.log(user);
  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Email address is required.")
      .email("Please enter a valid email address."),
    login_password: Yup.string().required("Please enter a password."),
  });

  const registerValidation = Yup.object({
    name: Yup.string()
      .matches(fullNameRegex, "Full name can only contain letters and spaces")
      .required("Full name is required"),
    email: Yup.string()
      .required("Email address is required.")
      .email("Please enter a valid email address."),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Please enter a password."),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm your password"),
  });

  const signUpHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      setUser({ ...user, error: "", success: data.message });
      setLoading(false);
      setTimeout(async () => {
        let options = {
          redirect: false,
          email: email,
          password: login_password,
        };
        const res = await signIn("credentials", options);
        Router.push("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setUser({ ...user, success: "", error: error.response.data.message });
    }
  };

  const signInHandler = async () => {
    setLoading(true);
    let options = {
      redirect: false,
      email: login_email,
      password: login_password,
    };
    const res = await signIn("credentials", options);
    setUser({ ...user, success: "", error: "" });
    setLoading(false);
    if (res?.error) {
      setLoading(false);
      setUser({ ...user, login_error: res?.error });
    } else {
      return Router.push(callbackUrl || "/");
    }
  };

  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}

      <Header country={country} currency={currency} />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              We'd be happy to join us ! <Link href="/">Go Store</Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Sign in</h1>
            <p>
              Welcome back! Access your account and enjoy a seamless shopping
              experience.
            </p>
            <Formik
              enableReinitialize
              initialValues={{
                login_email,
                login_password,
              }}
              validationSchema={loginValidation}
              onSubmit={() => {
                signInHandler();
              }}
            >
              {(form) => (
                <Form method="post" action="/api/auth/signin/email">
                  <input
                    type="hidden"
                    name="csrfToken"
                    defaultValue={csrfToken}
                  />
                  <LoginInput
                    type="email"
                    icon="email"
                    name="login_email"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />

                  <LoginInput
                    type="password"
                    icon="password"
                    name="login_password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="Sign in" />
                  {login_error && (
                    <span className={styles.error}>{login_error}</span>
                  )}
                  <div className={styles.forget}>
                    <Link href="/auth/forget">Forget Password ?</Link>
                  </div>
                </Form>
              )}
            </Formik>
            <div className={styles.login__socials}>
              <span className={styles.or}>Or continue with</span>
              <div className={styles.login__socials_wrap}>
                {providers.map((provider) => {
                  if (provider.name == "Credentials") {
                    return;
                  }

                  return (
                    <div key={provider.name}>
                      <button
                        className={styles.socials__btn}
                        onClick={() => signIn(provider.id)}
                      >
                        <img src={`../../icons/${provider.name}.png`} alt="" />
                        Sign in with {provider.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.login__container}>
          <div className={styles.login__form}>
            <h1>Sign up</h1>
            <p>
              Join us today and enjoy a seamless shopping experience with
              exclusive products.
            </p>

            <Formik
              enableReinitialize
              initialValues={{
                name,
                email,
                password,
                confirm_password,
              }}
              validationSchema={registerValidation}
              onSubmit={() => {
                signUpHandler();
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="text"
                    icon="user"
                    name="name"
                    placeholder="Full Name"
                    onChange={handleChange}
                  />

                  <LoginInput
                    type="email"
                    icon="email"
                    name="email"
                    placeholder="email address"
                    onChange={handleChange}
                  />

                  <LoginInput
                    type="password"
                    icon="password"
                    name="password"
                    placeholder="enter password"
                    onChange={handleChange}
                  />

                  <LoginInput
                    type="password"
                    icon="password"
                    name="confirm_password"
                    placeholder="Confirm password"
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="Sign up" />
                </Form>
              )}
            </Formik>
            <div className={styles.sucess}>
              {success && <span>{success}</span>}
            </div>
            <div className={styles.error}>{error && <span>{error}</span>}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, query } = context;

  const session = await getSession({ req }); // checks whether the incoming request already has a valid session (user logged in).
  const { callbackUrl } = query; //Grabs the callbackUrl param from the URL so you know where to redirect after sign in.

  if (session) {
    // If the user is already logged in, there’s no point showing the sign-in page. This returns a redirect response so the server redirects the visitor immediately.
    return {
      redirect: {
        destination: callbackUrl,
      },
    };
  }

  const csrfToken = await getCsrfToken(context);

  // Fetch country & currency
  const res = await fetch(
    "https://api.ipregistry.co/66.165.2.7?key=ira_Q2qx7fq6i5zv9a0kAE4JoEfHkJd4No0Klibp"
  );
  const data = await res.json();

  const country = {
    name: data.location.country?.name || "Unknown",
    flag: data.location.country?.flag?.emojitwo || "🏳️",
  };

  const currency = {
    code: data.currency?.code || "USD",
    symbol: data.currency?.symbol || "$",
  };

  // Fetch providers for sign in
  const providers = Object.values(await getProviders());

  return {
    props: {
      country,
      currency,
      providers,
      csrfToken,
      callbackUrl,
    },
  };
}
