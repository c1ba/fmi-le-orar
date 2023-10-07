<script lang="ts">
    import {optionalsStore} from '../../stores/optionalsStore';
    import {coursesStore} from '../../stores/optionalsStore';
    import { verifyIfCourseIsNow } from '../../../utils/CourseUtils';
    import CurrentCourseData from './CurrentCourseData.svelte';
    import {days} from '../../../constants/dateAndTime';
    import {nowDate} from '../../../lib/stores/utilsStore';

    $:optionalKey = localStorage.getItem("selectedOptional");
    $:optional = $optionalsStore.find((opt) => opt.name === optionalKey);
</script>

<div>
    <h3><b>OPTIONAL:</b></h3>
    {#if optional !== undefined || optional != ""}
      {#each $coursesStore as course}
        {#if verifyIfCourseIsNow(course, $nowDate, parseInt(course.beginningHour), course.duration ?? 2) 
        && course.name.includes(optionalKey)
        && course.day === days[$nowDate.getDay()]}
          <CurrentCourseData subject={course} />
        {/if}
      {/each}
    {/if}
</div>