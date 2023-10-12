<script lang="ts">
  import { onMount } from 'svelte';
  import '@picocss/pico/css/pico.css';

  import {LocalStorageKeys, findInLocalStorage, setInLocalStorage} from './utils/LocalStorageUtils';

  import {optionsStore} from './lib/stores/optionsStore';
  import {optionalsStore} from './lib/stores/optionalsStore';

  import Dropdown from './lib/components/Dropdown/Dropdown.svelte';
  import Clock from './lib/components/Clock.svelte';
  import RenderTable from './lib/components/Table/RenderTable.svelte';
  import CurrentDomainData from './lib/components/CurrentCourse/CurrentDomainData.svelte';
  import CurrentOptionalData from './lib/components/CurrentCourse/CurrentOptionalData.svelte';
    import RenderCompactTable from './lib/components/Table/RenderCompactTable.svelte';

  let domain: string = "IS";
  let optional: string = "";
  let JSONData: any = {};
  
  onMount(async () => {
    domain = findInLocalStorage(LocalStorageKeys.DOMAIN_KEY, "IS");
    optional = findInLocalStorage(LocalStorageKeys.OPTIONAL_KEY, "");

    const JSONModules = import.meta.glob("./static/data/*.json");
    for (const modulePath in JSONModules) {
      const fileName = modulePath.substring(modulePath.lastIndexOf("/")+1);
      const domain = fileName.replace(".json", "");
      JSONData[`${domain}`] = {};
      await JSONModules[modulePath]().then((res: any) => {
        for (const [key, val] of Object.entries(res)) {
          if (key === "metaData" || key === "default") {
            continue;
          }
          JSONData[`${domain}`][`${key}`] = val;
        }
      });
    }

	});

</script>

<main class="menu">
  <Clock />
  <div style="width: 100%; display: flex; justify-content: space-around; height: auto;">
    <Dropdown
    bind:value={domain}
    dropdownLabel="Your domain:"
    array={$optionsStore}
    optionRenderProperties={{value: "val", label: "label"}}
    onChange={() => {setInLocalStorage(LocalStorageKeys.DOMAIN_KEY, domain);}} 
    />
    <Dropdown
    dropdownLabel="Your optionals:"
    array={$optionalsStore}
    optionRenderProperties={{value: "name", label: "name"}}
    bind:value={optional}
    onChange={() => {setInLocalStorage(LocalStorageKeys.OPTIONAL_KEY, optional);}} 
    />
  </div>

  <div style="margin-left: 25px; display: flex; flex-direction: column; line-height: 10px; margin-top: 25px; width: auto;">
    <CurrentDomainData JSONOBjectData={JSONData[domain.toLowerCase()]} />

    <CurrentOptionalData />
  </div>
  
  <div style="width: 100vw; overflow: auto;">
    <RenderTable JSONOBjectData={JSONData[domain.toLowerCase()]} />
  </div>

  <h2 style="margin-left: 25px;">This week:</h2>
  <div style="width: 100vw; overflow: auto;">
    <RenderCompactTable JSONOBjectData={JSONData[domain.toLowerCase()]} />
  </div>
  
</main>

<style>
  .menu {
    display: flex;
    flex-direction: column;
  }
</style>
