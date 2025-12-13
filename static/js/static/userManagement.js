
export async function isLoggedIn() {
    try {
        const res = await fetch("/me");
        const data = await res.json();

        if (data.logged_in) {
            return {
                loggedIn: true,
                username: data.username
            };
        }

        return { loggedIn: false };

    } catch (err) {
        console.error("Error checking login:", err);
        return { loggedIn: false };
    }
}

export async function register(username, password) {
    try {
        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await res.json();

        if (data.success) {
            return { success: true };
        } else {
            return { success: false, error: data.error };
        }

    } catch (err) {
        console.error("Error during registration:", err);
        return { success: false, error: "Network error" };
    }
}

export async function login(username, password) {
    try {
        const res = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                'username': username,
                'password': password
            })
        });

        const data = await res.json();

        if (data.success) {
            // User is logged in and session cookie is stored automatically
            return { success: true, username: data.username };
        } else {
            return { success: false, error: data.error };
        }

    } catch (err) {
        console.error("Error during login:", err);
        return { success: false, error: "Network error" };
    }
}
