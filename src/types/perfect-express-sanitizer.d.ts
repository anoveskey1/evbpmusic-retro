declare module "perfect-express-sanitizer" {
  const perfectExpressSanitizer: {
    sanitize: (input: string, options: Record<string, any>) => string;
  };
  export default perfectExpressSanitizer;
}
