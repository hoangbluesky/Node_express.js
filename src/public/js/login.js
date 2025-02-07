$(".span-fa-eye").on("click", function(e) {
    const $input = $(this).siblings("input"); 
    $(this).find(".fa-eye").toggleClass("fa-eye-slash");
    $input.attr('type', $input.attr('type') === 'password' ? 'text' : 'password');
});

// validation Email
const $email = $("#email");
const $password = $("#password");
$email.on("input", function() {
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const $error = $(this).closest(".form-group").find(".error");
    if (regex.test(this.value.trim())) {
        $error.text("Email successfully");  
        $error.removeClass("text-danger").addClass("text-success");  
    } else {
        $error.text("Email error");  
        $error.removeClass("text-success").addClass("text-danger");  
    }
});
$password.on("input", function(e) {
    const $error = $(this).closest(".form-group").find(".error");
    if(this.value.trim().length < 6) {
        $error.text("Password at least 6 characters");
        $error.removeClass("text-success").addClass("text-danger");
    }else {
        $error.text("");
        $error.removeClass("text-danger").addClass("text-success");
    }
})
$("#submit").on("click", function(e) {
    const email = $email.val().trim();
    const password = $password.val().trim();
    const data = [email, password]
    console.log(data);
 
});
