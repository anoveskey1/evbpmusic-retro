import perfectExpressSanitizer from "perfect-express-sanitizer";

const sanitizeInput = (input: string, options: Record<string, any>) => {
  // Use the perfect-express-sanitizer to sanitize the input
  return perfectExpressSanitizer.sanitize(input, options);
};

export default sanitizeInput;
