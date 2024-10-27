// rejex for email validation can find on internet  ---->  /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/

export const checkValidData = (email,password)=>{
      const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
      const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
      
      if(!isEmailValid && !isPasswordValid){
        const messsage = {
            email : "email is not valid",
            password : "password is not valid"
        }
        return messsage
      }
      
      if(!isEmailValid){
        return {
            email : "email is not valid"
        }
      }

      if(!isPasswordValid){
        return {
            password : "password is not valid"
        }
      }

      return null
}
