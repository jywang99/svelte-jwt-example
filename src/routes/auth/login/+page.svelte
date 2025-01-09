<script lang="ts">
  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const email = formData.get("email");
    const password = formData.get("password");

    const resp = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!resp.ok) {
      alert("Failed to login");
      return;
    }
    alert("Login successful");
  }
</script>

<h1>Login</h1>

<form on:submit={handleSubmit}>
  <label for="email">Email</label>
  <input type="email" id="email" name="email" required />
  <br />

  <label for="password">Password</label>
  <input type="password" id="password" name="password" required />
  <br />

  <button type="submit">Login</button>
  <a href="/auth/regist">Sign up</a>
</form>

