"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GoogleReCaptcha from "./GoogleReCaptcha";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaError, setRecaptchaError] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateName = () => {
    if (name.trim().length < 2) {
      setNameError("Name must be at least 2 characters");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validateMessage = () => {
    if (message.trim().length < 5) {
      setMessageError("Message must be at least 5 characters");
      return false;
    }
    setMessageError("");
    return true;
  };

  const sendEmail = async () => {
    setIsSubmitting(true);

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string;

      const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        "g-recaptcha-response": recaptchaToken,
      };

      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      if (result.text === "OK") {
        toast.success(
          "Thank you for your message. We will get back to you soon."
        );
        setName("");
        setEmail("");
        setMessage("");
        setRecaptchaToken(null);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (!recaptchaToken) {
      setRecaptchaError(true);
      return;
    } else {
      setRecaptchaError(false);
    }

    if (isNameValid && isEmailValid && isMessageValid) {
      await sendEmail();
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto md:mb-24 mb-20">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Contact Us</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={validateName}
              placeholder="Your name"
              className="bg-secondary"
            />
            {nameError && (
              <p className="text-sm text-destructive">{nameError}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
              placeholder="Your email"
              className="bg-secondary"
            />
            {emailError && (
              <p className="text-sm text-destructive">{emailError}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onBlur={validateMessage}
              placeholder="Your message"
              className="min-h-32 bg-secondary"
            />
            {messageError && (
              <p className="text-sm text-destructive">{messageError}</p>
            )}
          </div>

          <div className="space-y-4">
            <GoogleReCaptcha onVerify={(token) => setRecaptchaToken(token)} />

            {recaptchaError && (
              <p className="text-destructive text-sm">
                Please verify that you're not a robot
              </p>
            )}

            <Button
              type="submit"
              className="w-full md:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
