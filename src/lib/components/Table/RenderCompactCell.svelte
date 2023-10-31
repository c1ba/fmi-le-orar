<script lang="ts">
    export let subjectsData: {[key: string]: any}[];
    $:colors = subjectsData.map((sub) => {
        switch(sub.type) {
            case "course":
                return "#5B72AB";
            case "laboratory":
                return "#B73030";
            case "seminary": 
            return "#5BABA3";
            default:
                return "transparent";
        }
    });

    const returnGradient = (colors: string[]) => {
        const increaseValue = 100 / colors.length;
        let gradientVal = "";
        colors.forEach((color, index) => {
            gradientVal += `${color} ${index * increaseValue}% ${(index + 1) * increaseValue}%${index < (colors.length - 1) ? ', ' : ''}`;
        });
        
        return `linear-gradient(${gradientVal})`;
    }
</script>


<td style="background-image: {returnGradient(colors)}; white-space: pre-line; border: solid 1px #484C6C; box-shadow: inset 0 0 50px #484B5F99;">
{subjectsData.map((sub) => `${sub.name} \n [Room ${sub.location}]`).join("\n\n")}
</td>