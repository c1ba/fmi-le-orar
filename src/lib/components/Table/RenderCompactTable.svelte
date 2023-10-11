<script lang="ts">
    import {days} from '../../../constants/dateAndTime';
    import {nowDate} from '../../../lib/stores/utilsStore';
    import { capitalizeString } from '../../../utils/StringUtils';
    import {coursesStore} from '../../stores/optionalsStore';
    import RenderCompactCell from './RenderCompactCell.svelte';
    
  
    export let JSONOBjectData: {[key: string]: {[key: string]: any}};
    $:optionalKey = localStorage.getItem("selectedOptional");

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
      $coursesStore.forEach((sub: {[key: string]: any}) => {
        if (sub.name.includes(optionalKey)) {
          console.log(sub);
          if (!resultObject[`${sub.beginningHour}`]) {
            resultObject[`${sub.beginningHour}`] = [];
          }
          resultObject[`${sub.beginningHour}`].push({name: sub.name, day: sub.day, isOdd: sub.isOdd, onceEveryTwoWeeks: sub.onceEveryTwoWeeks, type: sub.type});
        }

      })
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
          )}
          {@const daySubjectsNames = daySubjects.map((sub) => sub.name).join("\n")}
          {#if daySubjectsNames != ""}
          <RenderCompactCell subjectsData={daySubjects} />
          {:else}
          <td>{daySubjectsNames}</td>
          {/if}
        {/if}
      {/each}
    </tr>
    {/each}
  </tbody>
</table>
{/if}