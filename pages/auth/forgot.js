import { BiLeftArrowAlt } from "react-icons/bi";
import Header from "../../components/header";
import styles from "../../styles/forgot.module.scss";
import Link from "next/link";
import Footer from "../../components/footer";
import { Form, Formik } from "formik";
import CircledIconBtn from "../../components/buttons/circledIconBtn";
import LoginInput from "../../components/inputs/loginInput";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import DotLoaderSpinner from "../../components/loaders/dotLoader";

export default function forgot({ country, currency }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");
  const emailValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .email("Please enter a valid email address."),
  });
  const forgotHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/forgot", {
        email,
      });
      setError("");
      setSuccess(data.message);
      setEmail("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
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
            forgot your password!{" "}
            <Link href="/auth/forgot">Return to login</Link>
          </span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            email,
          }}
          validationSchema={emailValidation}
          onSubmit={() => {
            forgotHandler();
          }}
        >
          {(form) => (
            <Form>
              <LoginInput
                type="text"
                icon="email"
                name="email"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />

              <CircledIconBtn type="submit" text="send link" />
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

export async function getServerSideProps() {
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
    },
  };
}
