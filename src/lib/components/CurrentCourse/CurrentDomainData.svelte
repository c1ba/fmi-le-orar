<script lang="ts">
    import {days} from '../../../constants/dateAndTime';
    import {nowDate} from '../../../lib/stores/utilsStore';
    import { verifyIfCourseIsNow } from '../../../utils/CourseUtils';
    import CurrentCourseData from './CurrentCourseData.svelte';

    export let JSONOBjectData: {[key: string]: {[key: string]: any}};
</script>

{#if JSONOBjectData != undefined && JSONOBjectData != null}
<div>
    <h1><b>NOW:</b></h1>
    {#each Object.entries(JSONOBjectData) as [day, busyHours]}
    {#if day === days[$nowDate.getDay()]}
      {#each Object.entries(busyHours) as [hour, subjectsArray]}
        {#each subjectsArray as subject}
          {#if verifyIfCourseIsNow(subject, $nowDate, parseInt(hour), subject.duration ?? 2)}
            <CurrentCourseData subject={subject} />
          {/if}
        {/each}
      {/each}
    {/if}
    {/each}
</div>
{/if}