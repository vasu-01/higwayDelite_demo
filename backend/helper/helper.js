function generateOtp() {
  const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
  return { otpCode, otpExpiry };
}

export { generateOtp };
