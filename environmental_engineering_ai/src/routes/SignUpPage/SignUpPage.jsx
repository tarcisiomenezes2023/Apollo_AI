import { SignUp } from "@clerk/clerk-react"
import "./SignUpPage.css"

const SignUpPage = () => {
  return (
    <div className="signUpPage">
      <SignUp path="/sign-up" forceRedirectUrl="/sign-in" />
    </div>
  )
}

export default SignUpPage