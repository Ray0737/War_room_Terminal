const SB_URL = "https://pimmlgtqkkmghiamuvel.supabase.co";
const SB_KEY = "sb_publishable_4qoe8BeFfXctJs2qmCREyQ_sZDxkZZ0"; // Note: Use your actual anon key here
const supabaseClient = supabase.createClient(SB_URL, SB_KEY);
// ... (Your existing Supabase setup code)

document.getElementById('primaryBtn').addEventListener('click', async () => {
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPass').value;
    const btn = document.getElementById('primaryBtn');
    const errorMsg = document.getElementById('errorMsg');

    // Initialize Modal
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));

    errorMsg.classList.add('d-none');
    btn.disabled = true;

    if (isRegisterMode) {
        btn.innerText = 'ENCRYPTING...';

        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: { display_name: document.getElementById('regUser').value }
            }
        });

        if (error) {
            errorMsg.innerText = "REG_FAILURE: " + error.message;
            errorMsg.classList.remove('d-none');
            btn.innerText = "RETRY REGISTRATION";
            btn.disabled = false;
        } else {
            // SUCCESS FLOW
            successModal.show();

            // Wait 3 seconds, then hide modal and flip back to login
            setTimeout(() => {
                successModal.hide();
                toggleMode(); // Flips UI back to Login mode
                btn.disabled = false;
                btn.innerText = "Access Terminal";
                // Clear the fields
                document.getElementById('authEmail').value = "";
                document.getElementById('authPass').value = "";
            }, 3000);
        }
    } else {
        // ... (Keep your existing Login logic here)
        btn.innerText = 'AUTHENTICATING...';
        const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

        if (error) {
            errorMsg.innerText = "ACCESS_DENIED: " + error.message;
            errorMsg.classList.remove('d-none');
            btn.innerText = "RETRY ACCESS";
            btn.disabled = false;
        } else {
            window.location.replace('menu.html');
        }
    }
});