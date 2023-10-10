<script lang="ts">
    import {days} from '../../../constants/dateAndTime';
    import RenderRow from './RenderRow.svelte';
    import { courseIsInTheFuture } from '../../../utils/CourseUtils';
    import {nowDate} from '../../../lib/stores/utilsStore';
    import { capitalizeString } from '../../../utils/StringUtils';
    import { onMount } from 'svelte';
    
  
    export let JSONOBjectData: {[key: string]: {[key: string]: any}};

    const getCompactCourses = (JSONData: {[key: string]: {[key: string]: any}}) => {
      const resultObject: {[key: string]: {[key: string]: any}[]} = {};
      if (JSONData && JSONData != null) {
        for (const [day, val] of Object.entries(JSONData)) {
        if (!days.includes(day)) {
          continue;
        }
        for (const [hour, subjects] of Object.entries(val)) {
          if (!resultObject[`${hour}`]) {
            resultObject[`${hour}`] = [];
          }
          for (const subject of subjects) {
            resultObject[`${hour}`].push({name: subject.name, day: day, isOdd: subject.isOdd, onceEveryTwoWeeks: subject.onceEveryTwoWeeks, type: subject.type});
          }
        }
      }
      }
      return resultObject;
    };
  </script>

{#if JSONOBjectData != undefined && JSONOBjectData != null}
<table>
  <thead>
    <tr>
      <th scope="col"></th>
      {#each days as day, index}
       {#if index > 0 && index < 6}
        <th scope="col">{capitalizeString(day)}</th>
       {/if}
    {/each}
    </tr>
  </thead>
  <tbody>
    {#each Object.entries(getCompactCourses(JSONOBjectData)) as [hours, subjects]}
    <tr>
      <th scope="row">{hours}:00</th>
      {#each days as day}
        {#if days.indexOf(day) > 0 && days.indexOf(day) < 6}
          {@const daySubjects = subjects.filter((sub) => sub.day === day &&
          (!sub.onceEveryTwoWeeks || (sub.onceEveryTwoWeeks && !Boolean($nowDate.getDate() / 7 % 2) === sub.isOdd))
          ).map((sub) => sub.name).join("\n")}
          {#if daySubjects != ""}
          <td style="background-color: #1e273d80; border: solid 1px #293F5D; white-space: pre-line;">{daySubjects}</td>
          {:else}
          <td style="border: solid 1px #293F5D">{daySubjects}</td>
          {/if}
        {/if}
      {/each}
    </tr>
    {/each}
  </tbody>
</table>
{/if}