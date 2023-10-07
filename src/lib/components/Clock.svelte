<script lang="ts">
    import {days} from '../../constants/dateAndTime';
    import {nowDate} from '../../lib/stores/utilsStore';

    $:hour = Math.trunc($nowDate.getHours() / 10) === 0 ? `0${$nowDate.getHours()}` : `${$nowDate.getHours()}`;
    $:minutes = Math.trunc($nowDate.getMinutes()  / 10) === 0 ? `0${$nowDate.getMinutes()}` : `${$nowDate.getMinutes()}`;
</script>

<div class="centerTheShitOuttaIt">
    <h1 class="shadowText">{$nowDate.getDay() === 5 ? "\u{1F389}" : ""} {days[$nowDate.getDay()].toUpperCase()} {$nowDate.getDay() === 5 ? "\u{1F389}" : ""}</h1>
    <h1 style="font-size: 100px; line-height: 0px;" class="shadowText">{hour}:{minutes}</h1>
</div>

<style>
    .centerTheShitOuttaIt {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        flex-direction: column;
    }

    .shadowText {
        text-shadow: rgb(3, 0, 14) 1px 0 30px;
    } 
</style>