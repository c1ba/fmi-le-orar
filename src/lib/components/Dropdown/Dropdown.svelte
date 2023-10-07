<script lang="ts">
    import Option from './Option.svelte';

    export let dropdownLabel: string;
    export let array: any;
    export let optionRenderProperties: {value: string; label: string};
    export let value: string;
    export let onChange: () => void;
</script>

<div class="dropdownAndLabel">
    <label for="dropdown">{dropdownLabel}</label>
    <select class="dropdown" bind:value={value} id="dropdown" on:change={onChange}>
      {#each array as elem}
        <Option value={elem[optionRenderProperties.value]} label={elem[optionRenderProperties.label]} />
      {/each}
    </select>
  </div>

<style>
    .dropdown {
    width: 40vw;
  }

  .dropdownAndLabel {
    margin-left: 25px;
    margin-top: 45px;
  }
</style>