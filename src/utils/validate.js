export function validate(email,password, signInMode){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
    if (!email || !emailRegex.test(email)) {
        return "Invalid email format";
    }
    
    if (!password || !passwordRegex.test(password)) {
        return (signInMode) ? "Password is incorrect!" : "Password must be at least 8 characters long and contain both letters and numbers.";
    }
    
    return null;
}