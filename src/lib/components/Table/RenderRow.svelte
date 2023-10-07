<script lang="ts">

    export let index: number;
    export let value: {[key: string]: any};
    export let hour: number;
    export let blacklistKeys: string[];

</script>

{#if Boolean(index % 2)}
<tr>
    <td>{hour} - {hour + 2}</td>
    {#each Object.entries(value) as [key, val]}
        {#if !blacklistKeys.includes(key)}
          <td>{val}</td>
        {/if}
    {/each}
</tr>
{:else}
<tr style="background-color: #1e273d80">
    <td>{hour} - {hour + 2}</td>
    {#each Object.entries(value) as [key, val]}
      {#if !blacklistKeys.includes(key)}
        <td>{val}</td>
      {/if}
    {/each}
</tr>
{/if}