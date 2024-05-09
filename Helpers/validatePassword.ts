function validatePassword(password:string, confirmPassword: string) {
    if (confirmPassword != password) {
        return false;
      }
      return true;
}

export default validatePassword;