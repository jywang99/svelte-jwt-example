<script lang="ts">
  import { goto } from "$app/navigation";

  async function handleSubmit(event: SubmitEvent) {
    // prevent default behavior of form submission (page reload with query string params)
    event.preventDefault();

    const form = event.target;
    if (form == null || !(form instanceof HTMLFormElement)) {
      return;
    }
    const formData = new FormData(form);

    // ensure passwords match
    const pass = formData.get('password') as string;
    const confPass = formData.get('confirmPassword') as string;
    if (pass !== confPass) {
      alert('Passwords do not match');
      return;
    }

    // send a POST request to the current route
    const resp = await fetch(window.location.pathname, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.get('email'),
        name: formData.get('name'),
        password: formData.get('password'),
      }),
    });

    if (!resp.ok) {
      alert('Failed to sign up');
      return;
    }

    goto('/auth/login');
  }
</script>

<h1>Sign up</h1>
<form on:submit={handleSubmit}>
  <label for="email">Email</label>
  <input type="email" id="email" name="email" required />
  <br />

  <label for="name">Name</label>
  <input type="text" id="name" name="name" required />
  <br />

  <label for="password">Password</label>
  <input type="password" id="password" name="password" required />
  <br />

  <label for="confirmPassword">Confirm Password</label>
  <input type="password" id="confirmPassword" name="confirmPassword" required />
  <br />

  <button type="submit">Sign up</button>
</form>

