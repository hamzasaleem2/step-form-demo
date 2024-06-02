"use client";
import React, { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const TwoStepForm: React.FC = () => {
  const [step, setStep, removeStep] = useLocalStorage<number>("formStep", 1);
  const [formData, setFormData, removeFormData] = useLocalStorage<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }>("formData", {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [isClient, setIsClient] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    removeStep();
    removeFormData();
  };

  const handleReset = () => {
    setStep(1);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    removeStep();
    removeFormData();
  };

  if (!isClient) {
    return null;
  }

  return (
    <div>
      {isSubmitted && <div role="alert">Form submitted successfully!</div>}

      {step === 1 && (
        <form onSubmit={nextStep}>
          <h2>Step 1: Personal Details</h2>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <button type="submit">Next</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit}>
          <h2>Step 2: Account Details</h2>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <div>
            <button
              type="button"
              className="px-4 py-2 rounded mr-2"
              onClick={prevStep}
            >
              Back
            </button>
            <div>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded mr-2"
              >
                Reset
              </button>
              <button type="submit" className="px-4 py-2 rounded">
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default TwoStepForm;
