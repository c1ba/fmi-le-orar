<script lang="ts">
    import {days} from '../../../constants/dateAndTime';
    import RenderRow from './RenderRow.svelte';
    import { courseIsInTheFuture } from '../../../utils/CourseUtils';
    import {nowDate} from '../../../lib/stores/utilsStore';
    
  
    export let JSONOBjectData: {[key: string]: {[key: string]: any}};

    const blacklistKeys = ["isOdd", "onceEveryTwoWeeks"];
  </script>

{#if JSONOBjectData != undefined && JSONOBjectData != null}
<table>
  <thead>
    <tr>
      <th scope="col">At</th>
      <th scope="col">Subject</th>
      <th scope="col">Teacher</th>
      <th scope="col">Type</th>
      <th scope="col">Location</th>
    </tr>
  </thead>
  <tbody>
    {#each Object.entries(JSONOBjectData) as [day, busyHours]}
      {#if day === days[$nowDate.getDay()]}
        {#each Object.entries(busyHours) as [hour, subjectsArray]}
          {#each subjectsArray as subject, index}
            {#if courseIsInTheFuture(subject, $nowDate, parseInt(hour),  subject.duration ?? 2)}
              <RenderRow value={subject} index={index} hour={parseInt(hour)} blacklistKeys={blacklistKeys} />
            {/if}
          {/each}
        {/each}
      {/if}
    {/each}
  </tbody>
</table>
{/if}