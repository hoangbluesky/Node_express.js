$(".span-fa-eye").on("click", function(e) {
    const $input = $(this).siblings("input"); 
    $(this).find(".fa-eye").toggleClass("fa-eye-slash");
    $input.attr('type', $input.attr('type') === 'password' ? 'text' : 'password');
});



// Validation Full Name
const $name = $("#name");
$name.on("input", function() {
    const $error = $(this).closest(".form-group").find(".error");
    if (this.value.trim().length < 3) {
        $error.text("Name must be at least 3 characters.");
        $error.removeClass("text-success").addClass("text-danger");
    } else {
        $error.text("");
        $error.removeClass("text-danger").addClass("text-success");
    }
});

// Validation Email
const $email = $("#email");
$email.on("input", function() {
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const $error = $(this).closest(".form-group").find(".error");
    if (regex.test(this.value.trim())) {
        $error.text("Email successfully");
        $error.removeClass("text-danger").addClass("text-success");
    } else {
        $error.text("Invalid email format");
        $error.removeClass("text-success").addClass("text-danger");
    }
});

// Validation Password
const $password = $("#password");
$password.on("input", function() {
    const $error = $(this).closest(".form-group").find(".error");
    if (this.value.trim().length < 6) {
        $error.text("Password must be at least 6 characters");
        $error.removeClass("text-success").addClass("text-danger");
    } else {
        $error.text("");
        $error.removeClass("text-danger").addClass("text-success");
    }
});

// Validation Confirm Password
const $confirmPassword = $("#confirm-password");
$confirmPassword.on("input", function() {
    const $error = $(this).closest(".form-group").find(".error");
    if (this.value.trim() !== $password.val().trim()) {
        $error.text("Passwords do not match");
        $error.removeClass("text-success").addClass("text-danger");
    } else {
        $error.text("");
        $error.removeClass("text-danger").addClass("text-success");
    }
});

// Submit Button Validation
$("#submit").on("click", function(e) {
    const name = $name.val().trim();
    const email = $email.val().trim();
    const password = $password.val().trim();
    const confirmPassword = $confirmPassword.val().trim();
    const data = [name, email, password, confirmPassword];
    
    // Check if all fields are valid before submitting
    if (name && email && password && confirmPassword && password === confirmPassword) {
        console.log("Form data: ", data);
        // You can proceed with form submission or further actions here.
    } else {
        alert("Please fill all fields correctly.");
    }
});
