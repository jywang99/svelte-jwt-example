<script>
  import { navigating } from "$app/state";
  import Loading from "$lib/component/Loading.svelte";
  import { loggedIn } from "$lib/store/user.client";

  let { children } = $props();
</script>

<svelte:head>
  <title>Svelte JWT</title>
</svelte:head>

{#if navigating.type}
  <Loading fullScreen />
{/if}

<div class="container">
  <nav>
    <a href="/">Top</a>
    {#if $loggedIn}
      <a href="/secure">Secure</a>
    {/if}
  </nav>

  <nav>
    {#if $loggedIn}
      <a href="/auth/logout" data-sveltekit-preload-data="off">Logout</a>
    {:else}
      <a href="/auth/login">Login</a>
    {/if}
  </nav>
</div>

{@render children()}

<style>
  .container {
    display: flex;
    justify-content: space-between;
  }
</style>

