"use client";

import * as React from "react";
import { motion } from "framer-motion";
import * as Label from "@radix-ui/react-label";
import clsx from "clsx";

type FormFieldProps = {
  label?: string;
  name: string;
  type?: "text" | "email" | "password" | "textarea";
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  pattern?: string;
  className?: string;
};

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  value = "",
  onChange,
  placeholder,
  pattern,
  error,
  required,
  className,
}) => {
  const isTextarea = type === "textarea";
  const Component = isTextarea ? "textarea" : "input";
  const [isFocused, setIsFocused] = React.useState(false);

  const showFloatingLabel = isFocused || value.length > 0;

  return (
    <div className="form-field-wrapper relative">
      <div className="relative w-full">
        {label && (
          <Label.Root
            htmlFor={name}
            className={clsx(
              "form-label absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-[4px] px-1 transition-all duration-200 pointer-events-none",
              {
                "text-xs -translate-y-7 left-3 scale-90 bg-white":
                  showFloatingLabel,
                "text-red-600": !!error,
              }
            )}
          >
            {label}
          </Label.Root>
        )}

        <motion.div
          initial={false}
          animate={error ? "error" : "normal"}
          variants={{
            normal: { scale: 1 },
            error: { scale: 1.01 },
          }}
          transition={{ duration: 0.2 }}
        >
          <Component
            id={name}
            name={name}
            pattern={pattern}
            value={value}
            onChange={onChange}
            placeholder={label && showFloatingLabel ? placeholder : ""}
            required={required}
            className={clsx(
              "input-base",
              isTextarea && "textarea",
              error && "input-error",
              className
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...(type !== "textarea" && { type })}
          />
        </motion.div>
      </div>

      {error && (
        <motion.p
          className="error-message"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};
