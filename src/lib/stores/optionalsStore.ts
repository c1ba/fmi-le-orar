import { writable } from 'svelte/store';
const getAllCourses = async () => {
    const availableOptions: any[] = [];
    const JSONModules = import.meta.glob("../../static/data/*.json");
    for (const modulePath in JSONModules) {
      let fileName = modulePath.substring(modulePath.lastIndexOf("/")+1);
      await JSONModules[modulePath]().then((res: any) => {
        for (const [key, val] of Object.entries(res)) {
          if (key === "metaData" || key === "default") {
            continue;
          }
          const day: any = val;
          for (const [hour, value] of Object.entries(day)) {
            const subjectData: any = value;
            subjectData.forEach((sub: any) => availableOptions.push({...sub, beginningHour: hour}))
          }
        }
      });
    }
    return availableOptions.filter((sub, index) => {
      return availableOptions.map(mapObj => mapObj["name"]).indexOf(sub["name"]) === index && sub.type.includes("course");
    });
};

const getAllCoursesAndLaboratoriesAndSeminaries = async () => {
  const availableOptions: any[] = [];
  const JSONModules = import.meta.glob("../../static/data/*.json");
  for (const modulePath in JSONModules) {
    let fileName = modulePath.substring(modulePath.lastIndexOf("/")+1);
    await JSONModules[modulePath]().then((res: any) => {
      for (const [key, val] of Object.entries(res)) {
        if (key === "metaData" || key === "default") {
          continue;
        }
        const day: any = val;
        for (const [hour, value] of Object.entries(day)) {
          const subjectData: any = value;
          subjectData.forEach((sub: any) => availableOptions.push({...sub, beginningHour: hour, day: key}))
        }
      }
    });
  }
  return availableOptions;
};

export const optionalsStore = writable(await getAllCourses());
export const coursesStore = writable(await getAllCoursesAndLaboratoriesAndSeminaries());