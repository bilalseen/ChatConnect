function getFirebaseErrorMessage(error) {
  switch (error) {
    case "auth/claims-too-large":
      return "The changes you made to your account information are too large. Please try again with less information.";
    case "auth/email-already-exists":
      return "This email address is already in use. Try a different email address or log in to your account.";
    case "auth/id-token-expired":
      return "Your session has expired. Please log in again.";
    case "auth/id-token-revoked":
      return "Your session has been closed for security reasons. Please log in again.";
    case "auth/insufficient-permission":
      return "You do not have the necessary permissions for this action. Please contact your administrator.";
    case "auth/internal-error":
      return "An unexpected error occurred. Please try again or come back later.";
    case "auth/invalid-argument":
      return "You entered invalid information. Please check again.";
    case "auth/invalid-claims":
      return "Account information could not be updated correctly. Please try again.";
    case "auth/invalid-continue-uri":
      return "The continue URL is invalid. Please contact the support team.";
    case "auth/invalid-creation-time":
      return "The account creation date appears to be invalid. Please try again.";
    case "auth/invalid-credential":
      return "Credentials could not be verified. Please try again.";
    case "auth/invalid-disabled-field":
      return "You entered invalid information. Please check the fields and try again.";
    case "auth/invalid-display-name":
      return "The username you entered is invalid. Try using a non-empty name.";
    case "auth/invalid-dynamic-link-domain":
      return "You used an invalid link. Please check the correct link.";
    case "auth/invalid-email":
      return "You entered an invalid email address. Please check your email address.";
    case "auth/invalid-email-verified":
      return "The email verification status is invalid. Please try again.";
    case "auth/invalid-hash-algorithm":
      return "A system error occurred. Please contact the support team.";
    case "auth/invalid-id-token":
      return "Invalid authentication credentials. Please log in again.";
    case "auth/invalid-password":
      return "Your password is invalid. Your password must be at least 6 characters.";
    case "auth/invalid-phone-number":
      return "You entered an invalid phone number. Please check your number and try again.";
    case "auth/invalid-photo-url":
      return "The photo URL is invalid. Please enter a valid URL.";
    case "auth/invalid-provider-data":
      return "Provider information is invalid. Please try again.";
    case "auth/maximum-user-count-exceeded":
      return "The maximum user limit has been reached. Please try again later.";
    case "auth/missing-android-pkg-name":
      return "Missing Android package name. Please contact the support team.";
    case "auth/missing-continue-uri":
      return "The continue URL is missing. Please make sure you are using the correct link.";
    case "auth/missing-uid":
      return "User ID is missing. Please try again.";
    case "auth/operation-not-allowed":
      return "This sign-in method is currently disabled. Please try a different method.";
    case "auth/phone-number-already-exists":
      return "This phone number is already associated with another account. Please try a different number.";
    case "auth/project-not-found":
      return "Project not found. Please contact the support team.";
    case "auth/session-cookie-expired":
      return "Your session has expired. Please log in again.";
    case "auth/too-many-requests":
      return "You have sent too many requests. Please try again later.";
    case "auth/uid-already-exists":
      return "This user ID is already in use. Try a different user ID.";
    case "auth/user-not-found":
      return "No user found with this information. Please make sure you are registered.";
    case "auth/email-already-in-use":
      return "This email address is already in use. Try a different email address.";
    default:
      return "An error occurred. Please try again later.";
  }
}

export { getFirebaseErrorMessage };
