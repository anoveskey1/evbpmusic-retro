type SignGuestbookSuccessResponse = {
  message: string;
};

type SignGuestbookErrorResponse = {
  code: string;
  message: string;
};

export { SignGuestbookSuccessResponse, SignGuestbookErrorResponse };
