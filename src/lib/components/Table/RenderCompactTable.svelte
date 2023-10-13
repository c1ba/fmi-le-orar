<script lang="ts">
    import {days} from '../../../constants/dateAndTime';
    import {nowDate} from '../../../lib/stores/utilsStore';
    import { checkIfDuplicates } from '../../../utils/CourseUtils';
    import { capitalizeString } from '../../../utils/StringUtils';
    import {coursesStore} from '../../stores/optionalsStore';
    import RenderCompactCell from './RenderCompactCell.svelte';
    
  
    export let JSONOBjectData: {[key: string]: {[key: string]: any}};
    $:optionalKey = localStorage.getItem("selectedOptional");

    const getCompactCourses = (JSONData: {[key: string]: {[key: string]: any}}) => {
      const pushIfNotDuplicate = (coursesArray: {[key: string]: string | number | boolean}[], 
      course: {[key: string]: string | number | boolean},
      dayVal: string) => checkIfDuplicates(coursesArray, course) &&
      coursesArray.push({name: course.name, day: dayVal, isOdd: course.isOdd, onceEveryTwoWeeks: course.onceEveryTwoWeeks, type: course.type});

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
            checkIfDuplicates(resultObject[`${hour}`], subject) &&
            pushIfNotDuplicate(resultObject[`${hour}`], subject, day);
          }
        }
      }
      $coursesStore.forEach((sub: {[key: string]: any}) => {
        if (sub.name.includes(optionalKey)) {
          if (!resultObject[`${sub.beginningHour}`]) {
            resultObject[`${sub.beginningHour}`] = [];
          }
          pushIfNotDuplicate(resultObject[`${sub.beginningHour}`], sub, sub.day);
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