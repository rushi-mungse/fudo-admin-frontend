export const LOGIN_TITLE = "Login Your Account";

export const LOGIN_DESCRIPTION =
    "Hey there! We are glad to see you again, Your journey continues here. Please take a moment to log in and dive into the healthy food and offers awaiting you.";

export const SIGN_UP_TITLE = "Sign Up Your Account";

export const SIGN_UP_DESCRIPTION =
    "To keep connected with us please signup with your personal information by email address and password.";

export const OTP_VERIFY_TITLE = "Otp Verification";

export const PER_PAGE = 6;

export const getOtpDescription = (email: string) => {
    return (
        <div>
            <p className="text-dark/70 mt-4 text-sm text-center">
                4 Digit code has been sent to your email address
            </p>
            <span className="text-active inline-block italic text-sm">
                {email}
            </span>
        </div>
    );
};
