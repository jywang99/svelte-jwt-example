<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { user } from "$lib/store/user.client";
  import { REGIST_DONE_PARAM } from "./util";

  const justRegistered = page.url.searchParams.has(REGIST_DONE_PARAM);

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

    const data = await resp.json();
    user.set({
      name: data.name,
      email: data.email,
    });

    goto("/secure");
  }
</script>

<h1>Login</h1>

{#if justRegistered}
  <p class="regist">Registration complete. Please login.</p>
{/if}

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

<style>
  .regist {
    color: green;
  }
</style>

