import styles from "../../../styles/forgot.module.scss";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import { BiLeftArrowAlt } from "react-icons/bi";
import CircledIconBtn from "../../../components/buttons/circledIconBtn";
import LoginInput from "../../../components/inputs/loginInput";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import DotLoaderSpinner from "../../../components/loaders/dotLoader";
import axios from "axios";
import { getSession, signIn } from "next-auth/react";
import jwt from "jsonwebtoken";
import { Router } from "next/router";

export default function reset({ country, currency, token }) {
  console.log("token", token);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");
  const passwordValidation = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Please enter your new password."),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm your password"),
  });
  const resetHandler = async () => {
    try {
    } catch (error) {}
  };

  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}

      <Header country={country} currency={currency} />
      <div className={styles.forgot}>
        <div className={styles.forgot__header}>
          <div className={styles.back__svg}>
            <BiLeftArrowAlt />
          </div>
          <span>
            Reset your password <Link href="/">Return to login</Link>
          </span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            password,
            confirmPassword,
          }}
          validationSchema={passwordValidation}
          onSubmit={() => {
            resetHandler();
          }}
        >
          {(form) => (
            <Form>
              <LoginInput
                type="password"
                icon="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <LoginInput
                type="password"
                icon="password"
                name="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <CircledIconBtn type="submit" text="Submit" />
              <div style={{ marginTop: "10px" }}>
                {error && <span className={styles.error}>{error}</span>}
                {success && <span className={styles.sucess}>{success}</span>}
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const token = query.token;

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

  return {
    props: {
      country,
      currency,
      token,
    },
  };
}
