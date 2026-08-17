import { useEffect, useMemo, useState } from "react";

import {
  getConfiguration,
} from "../services/config.service";

import {
  submitLead,
} from "../services/lead.service";

import ProgressBar from "../components/estimator/ProgressBar";

import QuestionRenderer from "../components/estimator/QuestionRenderer";

import ContactForm from "../components/estimator/ContactForm";

import EstimateResult from "../components/estimator/EstimateResult";

const Estimator = () => {
  const [configuration, setConfiguration] =
    useState(null);

  const [answers, setAnswers] = useState({});

  const [currentStep, setCurrentStep] =
    useState(0);

  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [estimate, setEstimate] = useState(null);

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] = useState("");

  const activeQuestions = useMemo(() => {
    if (!configuration) {
      return [];
    }

    return configuration.questions
      .filter((question) => question.active)
      .sort(
        (a, b) =>
          a.display_order -
          b.display_order
      );
  }, [configuration]);

  useEffect(() => {
    const loadConfiguration = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getConfiguration();

        setConfiguration(data);
      } catch (err) {
        console.error(err);

        setError(
          "Unable to load the estimator. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadConfiguration();
  }, []);

  const totalSteps =
    activeQuestions.length + 1;

  const isContactStep =
    currentStep === activeQuestions.length;

  const currentQuestion =
    activeQuestions[currentStep];

  const updateAnswer = (value) => {
    if (!currentQuestion) {
      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.key]: value,
    }));
  };

  const updateContact = (
    field,
    value
  ) => {
    setContact((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const validateCurrentStep = () => {
    if (isContactStep) {
      if (!contact.name.trim()) {
        setError("Please enter your name.");
        return false;
      }

      if (!contact.phone.trim()) {
        setError("Please enter your phone number.");
        return false;
      }

      if (!contact.email.trim()) {
        setError("Please enter your email.");
        return false;
      }

      return true;
    }

    if (!currentQuestion) {
      return false;
    }

    const value =
      answers[currentQuestion.key];

    if (
      currentQuestion.required &&
      (value === undefined ||
        value === null ||
        value === "")
    ) {
      setError(
        "Please answer this question before continuing."
      );

      return false;
    }

    if (
      currentQuestion.type === "number" &&
      value !== undefined &&
      value !== ""
    ) {
      const numericValue = Number(value);

      if (
        numericValue < currentQuestion.min ||
        numericValue > currentQuestion.max
      ) {
        setError(
          `Please enter a value between ${currentQuestion.min} and ${currentQuestion.max}.`
        );

        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    setError("");

    if (!validateCurrentStep()) {
      return;
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(
        (previous) => previous + 1
      );
    }
  };

  const handleBack = () => {
    setError("");

    if (currentStep > 0) {
      setCurrentStep(
        (previous) => previous - 1
      );
    }
  };

  const handleSubmit = async () => {
    setError("");

    if (!validateCurrentStep()) {
      return;
    }

    try {
      setSubmitting(true);

      const result = await submitLead({
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        answers,
      });

      setEstimate(result.estimate);
    } catch (err) {
      console.error(err);

      const message =
        err?.response?.data?.message;

      setError(
        message ||
          "Unable to calculate your estimate. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

          <p className="text-gray-600">
            Loading estimator...
          </p>
        </div>
      </div>
    );
  }

  if (error && !configuration) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-bold text-gray-900">
            Something went wrong
          </h1>

          <p className="mt-2 text-gray-600">
            {error}
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
            className="mt-6 rounded-xl bg-black px-5 py-3 font-medium text-white"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (estimate) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
              {configuration.business.name}
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Your estimate is ready
            </h1>
          </div>

          <EstimateResult
            estimate={estimate}
            currency={
              configuration.business.currency
            }
          />

          <div className="mt-6 text-center text-sm text-gray-500">
            Thank you, {contact.name}.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            {configuration.business.name}
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Roofing Cost Estimator
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Answer a few questions about your roof
            to get an estimated project cost.
          </p>
        </header>

        <main className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <ProgressBar
            current={currentStep}
            total={totalSteps}
          />

          {isContactStep ? (
            <ContactForm
              contact={contact}
              onChange={updateContact}
            />
          ) : (
            <QuestionRenderer
              question={currentQuestion}
              value={
                answers[currentQuestion.key]
              }
              onChange={updateAnswer}
            />
          )}

          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="rounded-xl border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Back
            </button>

            {!isContactStep ? (
              <button
                type="button"
                onClick={handleNext}
                className="rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting
                  ? "Calculating..."
                  : "Get my estimate"}
              </button>
            )}
          </div>
        </main>

        <p className="mt-6 text-center text-xs text-gray-400">
          Estimates are based on the information
          provided and are subject to on-site review.
        </p>
      </div>
    </div>
  );
};

export default Estimator;