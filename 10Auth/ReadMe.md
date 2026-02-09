// 4 steps of Authentication system

1.  step 1 :- Authentication
    it identify who or which user sends the request
2.  step 2 :- Authorization
    it gave permission to user which action he can perform like - read, read & write, read & write & update
3.  step 3 :- validation
    it check the data format like - email format, phone number format
4.  step 4 :- Verification
    it check/compare the data - is the data right or wrong 


// Step,Question it Asks,Common Example

    Validation :- Is this data formatted correctly?,Checking if a password is at least 8 characters.
    Authentication :- Is this person real?,Logging in with a username and password.
    Authorization :- Can they access this page?,"Ensuring a ""Basic"" user can't see the ""Admin"" panel."
    Verification :- Is this ownership proven?,Entering a 6-digit code sent to your phone.


// 4 steps of Authentication system
1. Validation (The "Gatekeeper")
Before the server even tries to figure out who you are, it checks if the data you sent is "legal."

What it does: Checks formats (is the email missing an @?), character limits, and data types.

Why first? It saves processing power. If the data is junk, there’s no point in checking the database.

2. Authentication (The "ID Check")
This is where the system confirms your identity.

What it does: Compares your credentials (password, token, or biometric) against the stored record.

The Goal: To answer the question: "Are you who you say you are?"

3. Authorization (The "Keycard")
Once we know who you are, we check what you're allowed to touch.

What it does: Checks your "Permissions" or "Roles" (e.g., Admin vs. Guest).

The Goal: To answer: "Do you have permission to do this specific action?"

4. Verification (The "Double Check")
This often refers to External Verification or Data Integrity.

What it does: This is usually the step where you verify an email address (OTP), a phone number, or check if the specific record you want to "Update" actually exists and hasn't been tampered with.