// src/components/IContactForm/emailSubjectOptions.test.ts
import { SUBJECT_OPTIONS } from "./emailSubjectOptions";

describe("SUBJECT_OPTIONS", () => {
  it("should contain the correct subject options", () => {
    const expectedOptions = [
      { value: "general", label: "General Inquiry" },
      { value: "support", label: "Support" },
      { value: "feedback", label: "Feedback" },
      { value: "other", label: "Other" },
    ];

    expect(SUBJECT_OPTIONS).toEqual(expectedOptions);
  });

  it("should have unique values for each option", () => {
    const values = SUBJECT_OPTIONS.map((option) => option.value);
    const uniqueValues = new Set(values);

    expect(values.length).toBe(uniqueValues.size);
  });
});
