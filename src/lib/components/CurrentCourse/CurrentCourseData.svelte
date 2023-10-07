<script lang="ts">
    import {capitalizeString} from '../../../utils/StringUtils';
    export let subject: any;
</script>

<div>
  <p><b>{capitalizeString(subject.type)}: {subject.name}</b></p>
  <p class="under_subject_now">By: {subject.teacher}</p>
   <p class="under_subject_now">Location: {subject.location}</p>
</div>

<style>
    .under_subject_now {
      margin-left: 10px;
    }
</style>